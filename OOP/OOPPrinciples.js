// Polymorpism

// class Payment{
//     pay(){
//         console.log("Payment")
//     }
// }

// Principle is polymorphism but using the same inheritated but overiding the the functionality of that method is called method overriding
// class Esewa extends Payment{
//     constructor(amount){
//             super()
//             this.amount = amount
//     }

//     pay() //Method overriding
//     {
//       console.log("Payment Done " + this.amount)
//     }
// }

//Inheritance
// class Khalti extends Payment{
//     constructor(amount){
//             super()
//             this.amount = amount
//     }

//     pay() //Method overriding
//     {
//       console.log("Khalti Payment Done " + this.amount)
//     }
// }

// const esewa = new Esewa(2)
// const khalti = new Khalti(2)
// esewa.pay()
// khalti.pay()

//Properties Attributes
    // Encaptulation data hide garXA or accessibilty 
    // this._name
    // aBSTRACTION logic detail hide

class TaskArray{
    constructor(){
        this.elements = {}
        this.length = 0
    }
    addElement(element){
        this.elements[this.length] = element
        this.length++
    }
}

const array = new TaskArray();
array.addElement(1)
console.log(array.elements)
console.log(array.length)

//1
