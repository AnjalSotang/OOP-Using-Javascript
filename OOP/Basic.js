// 1.	Functional Based Approach
// 2.	OOP based
// For scalability and big projects we need to do OOP based. 
// 	OOP- principles(polymorphism, encapsulation, inheritance, abstraction)
// 	In Javasccript is not pure OOP
// 	We can use both functional and OOP together
// 	Function is a method but inside a class.

// 3.	Class, methods, properties

// Class: It’s a blueprint where objects and functions are made. 
// Attributes: the properties of class (Student has age, faculty, name) class vhanda vaira its called variable, class ko block bitra ko attribute {}
// Class banauney prakariya lai instantiation. 

class GharKoNaksa{
    room;
    bathRoom;
    settingRoom;
}

var manishGar = new GharKoNaksa() //Class use gareko vanako gar is object
var anjalGhar = new GharKoNaksa() // Techncally its called class instantion

// inheritance
class SidhartKoGar extends GharKoNaksa{
    swimmingPool;
}