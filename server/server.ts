import express = require("express");
import cors = require('cors');
import bodyParser = require('body-parser');
import dataaccess = require("./DataAccess");

// begin server
let menuAccessObject = new dataaccess.MenuDataAccess();
let orderAccessObject = new dataaccess.OrderDataAccess();
let app=express();

var corsOptions = {
	origin: 'http://localhost:3000',
	optionSuccessStatus: 200
};

//Middleware setup
app.use(cors())
app.use(bodyParser.json()); // for parsing application/json
//app.use(bodyParser.urlencoded({ extended: true }));

//app.listen(4000, function(){
//  console.log('Listening to port 4000');
//});

// for storing orders
let allOrders : Array<Order> = [];

app.get('/menu',cors(corsOptions ),  (req:any, res: any)=>{
	menuAccessObject.getMenus().then((response: any) => {
    	res.json({ menu: response }); //Response is array of objects
    	console.log("menus sent");
  	}).catch((err: any) => {
		console.log(err);
    	res.status(404);
	});
	//res.send("done!");
})

app.post('/postOrder', cors(corsOptions ), (req:any, res: any)=>{
	let obj = req.body; //Body comes back as a Json object
	let tempOrder : Order = new Order(currentOrderID, obj);
	orderAccessObject.insertOrder(tempOrder).then((response: any) => {
    	res.send("done!")
		console.log(response);  //Response is JSON on status of insert
		currentOrderID++;
  	}).catch((err: any) => {
    	res.status(404);
  	});
    //console.log("got post request. Body: " + obj);  // For debugging
	//allOrders.push(new Order(currentOrderID, obj));
    //res.send("Done!"); // Static response, probably should return an UUID
                       // feeling lazy   
})

app.get('/allOrders',cors(corsOptions ),  (req:any, res: any)=>{
	orderAccessObject.getOrders().then((response: any) => {
    	res.json({orders : response}); //Response is array of objects
    	console.log("Entries sent");
  	}).catch((err: any) => {
    	res.status(404);
  	});
	//res.json({orders : allOrders}); //Want to send an object
                                 //so just stick a property in
                                //front of the array.  
    console.log("sending allOrders");  // For debugging
})

menuAccessObject.connectDb().then(() => {
//	console.log("checking for menu collection...");
//	menuAccessObject.insertMenu();

	orderAccessObject.connectDb().then(() => {
  		app.listen(4000, () => {
    		console.log('Listening to port 4000');
  		});
	}).catch(() => { console.log("Failed to connect to orderAccessServer") });
}).catch(() => { console.log("Failed to connect to menuAccessServer") });

var currentOrderID = 1000;
function getOrderID() : any	{
	++this.currentOrderID;
	return this.currentOrderID;
};

class Order	{
	orderID : any;
	orderContent : any;
	constructor(orderID : any, content : any)	{
		this.orderID = orderID;
		this.orderContent = content;
		return;
	}
}