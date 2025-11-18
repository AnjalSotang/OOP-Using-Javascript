import { Socket } from "socket.io";
import { getSocketIo } from "../../server";
import todoModal from "./todoModal";
import { ITodo, Status } from "./todoTypes";

class Todo {
  private io = getSocketIo();
  constructor() {
    this.io.on("connection", (socket: Socket) => {
      console.log("new client connected!!");
      socket.on("getTodo", ()=>this.fetchTodos(socket))
      socket.on("addTodo", (data) => this.handleAddTodo(socket, data));
      socket.on("deleteTodo", (data) => this.handleDeleteTodo(socket, data));
      socket.on("updateTodoStatus", (data) =>
        this.handleUpdateTodoStatus(socket, data)
      );
      socket.on("fetchTodos", () =>
        this.fetchTodos(socket)
      );
    });
  }

  private async fetchTodos(socket: Socket){
    try{
      const todos = await todoModal.find({status: Status.Pending})
      socket.emit("todo_updated",{
        status: "success",
        data: todos
      })
    }catch(error){
      socket.emit("todo_response", {
        status: "error",
        error,
      });
    }
  }

  private async handleAddTodo(socket: Socket, data: ITodo) {
    try {
      const { task, deadline, status } = data;
      await todoModal.create({
        task,
        deadline,
        status,
      });

      const todos = await todoModal.find({status: Status.Pending});

      socket.emit("todo_updated", {
        status: "success",
        data: todos,
      });
    } catch (error) {
      socket.emit("todo_response", {
        status: "error",
        error,
      });
    }
  }

  private async handleDeleteTodo(socket: Socket, data: { id: string }) {
    try {
      const { id } = data;
      const deleteTodo = await todoModal.findByIdAndDelete(id);
      if (!deleteTodo) {
        socket.emit("tedo_response", {
          status: "error",
          message: "To not Found",
        });
        return;
      }
      const todos = await todoModal.find({status: Status.Pending});
      socket.emit("todo_updated", {
        status: "Success",
        data: todos,
      });
    } catch (error) {
      socket.emit("tedo_response", {
        status: "Success",
        error,
      });
    }
  }

  private async handleUpdateTodoStatus(
    socket: Socket,
    data: { id: string; status: Status }
  ) {
    try {
      const { id, status } = data;
      const toDo = await todoModal.findByIdAndUpdate(id, {
        status
      },{new: true})
      if(!toDo){
        socket.emit("todoResponse", {
            status: "error",
            message: "Status Update Unsuccessful"
        })
        return;
      }
      const updatedTodos = await todoModal.find({status: Status.Pending})
      socket.emit("todo_Updated",{
        status: "success",
        data: updatedTodos
      })
    } catch (error) {
      socket.emit("todoRespone", {
        status: "error",
        error,
      });
    }
  }
}

export default new Todo();
