"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dataaccess = require("./DataAccess");
// begin server
let menuAccessObject = new dataaccess.MenuDataAccess();
let orderAccessObject = new dataaccess.OrderDataAccess();
let app = express();
var corsOptions = {
    origin: 'http://localhost:3000',
    optionSuccessStatus: 200
};
//Middleware setup
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
//app.use(bodyParser.urlencoded({ extended: true }));
//app.listen(4000, function(){
//  console.log('Listening to port 4000');
//});
// for storing orders
let allOrders = [];
app.get('/menu', cors(corsOptions), (req, res) => {
    menuAccessObject.getMenus().then((response) => {
        res.json({ menu: response }); //Response is array of objects
        console.log("menus sent");
    }).catch((err) => {
        console.log(err);
        res.status(404);
    });
    //res.send("done!");
});
app.post('/postOrder', cors(corsOptions), (req, res) => {
    let obj = req.body; //Body comes back as a Json object
    let tempOrder = new Order(currentOrderID, obj);
    orderAccessObject.insertOrder(tempOrder).then((response) => {
        res.send("done!");
        console.log(response); //Response is JSON on status of insert
        currentOrderID++;
    }).catch((err) => {
        res.status(404);
    });
    //console.log("got post request. Body: " + obj);  // For debugging
    //allOrders.push(new Order(currentOrderID, obj));
    //res.send("Done!"); // Static response, probably should return an UUID
    // feeling lazy   
});
app.get('/allOrders', cors(corsOptions), (req, res) => {
    orderAccessObject.getOrders().then((response) => {
        res.json({ orders: response }); //Response is array of objects
        console.log("Entries sent");
    }).catch((err) => {
        res.status(404);
    });
    //res.json({orders : allOrders}); //Want to send an object
    //so just stick a property in
    //front of the array.  
    console.log("sending allOrders"); // For debugging
});
menuAccessObject.connectDb().then(() => {
    //	console.log("checking for menu collection...");
    //	menuAccessObject.insertMenu();
    orderAccessObject.connectDb().then(() => {
        app.listen(4000, () => {
            console.log('Listening to port 4000');
        });
    }).catch(() => { console.log("Failed to connect to orderAccessServer"); });
}).catch(() => { console.log("Failed to connect to menuAccessServer"); });
//orderAccessObject.connectDb().then(() => {
//  app.listen(4000, () => {
//    console.log('Listening to port 4000');
//  });
//}).catch(() => { console.log("Fail") });
/* menus
var menu1 = {
    toppings: [
        "Sausage",
        "Bacon",
        "Ham",
        "Pineapple",
        "Green pepper",
        "Basil"
    ],
    prices: [
        "2.60",
        "1.80",
        "1.50",
        "2.40",
        "2.50",
        "1.30"
    ]
};
var menu2 = {
    toppings: [
        "Pig Ears",
        "Pig Intestines",
        "Pig forhead",
        "Cow Testicles",
        "Lao Gan Ma",
        "Holy Water!"
    ],
    prices: [
        "1.00",
        "1.10",
        "1.20",
        "1.30",
        "1.40",
        "99.99"
    ]
};	*/
var currentOrderID = 1000;
function getOrderID() {
    ++this.currentOrderID;
    return this.currentOrderID;
}
;
class Order {
    constructor(orderID, content) {
        this.orderID = orderID;
        this.orderContent = content;
        return;
    }
}
//# sourceMappingURL=server.js.map