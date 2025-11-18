import { Socket } from "socket.io";
import { getSocketIo } from "../../server";
import todoModal from "./todoModal";
import { ITodo } from "./todoTypes";

class Todo {
  private io = getSocketIo();
  constructor() {
    this.io.on("connection", (socket: Socket) => {
      console.log("new client connected!!");
      socket.on("addTodo", (data) => this.handleAddTodo(socket, data));
      socket.on("deleteTodo", (data) => this.handleDeleteTodo(socket, data));
    });
  }

  private async handleAddTodo(socket: Socket, data: ITodo) {
    try {
      const { task, deadline, status } = data;
      await todoModal.create({
        task,
        deadline,
        status,
      });

      const todos = await todoModal.find();

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
          message: "To not Found"
        });
        return;
      }
      const todos = await todoModal.find();
      socket.emit("todo_updated", {
        message: "Deleted Successfully",
        data: todos,
      });
    } catch (error) {
      socket.emit("tedo_response", {
        status: "error",
        error,
      });
    }
  }
}

export default new Todo();
