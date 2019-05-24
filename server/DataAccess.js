"use strict";
//Data Access object
const mongodb = require("mongodb");
let mongoClient = mongodb.MongoClient;
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
};
class OrderDataAccess {
    constructor(_URL) {
        this._url = 'mongodb://localhost:27017/data';
        this.orderCollectionName = 'orders';
        this.URL = _URL || this._url; //JS syntact, if URL is undefined use default
    }
    get URL() {
        return this._url;
    }
    set URL(newURL) {
        this._url = newURL;
    }
    ;
    connectDb() {
        if (this.dbConnection) {
            //if connection attempt already made,
            return this.dbConnection;
        }
        else {
            //only run this is dbConnection is undefined.
            this.dbConnection = new Promise((resolve, reject) => {
                mongoClient.connect(this.URL, (err, db) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(db);
                    }
                });
            });
            return this.dbConnection;
        }
    }
    insertOrder(order) {
        return new Promise((resolve, reject) => {
            this.connectDb().then((db) => {
                db.collection(this.orderCollectionName).insertOne(order, (err, r) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(r);
                    }
                });
            }).catch((err) => {
                reject(err);
                console.log("Cannot insert order");
            });
        });
    }
    getOrders() {
        return new Promise((resolve, reject) => {
            this.connectDb().then((db) => {
                db.collection(this.orderCollectionName).find({}).toArray((err, orders) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(orders);
                    }
                });
            }).catch((err) => {
                reject(err);
            });
        });
    }
}
exports.OrderDataAccess = OrderDataAccess;
class MenuDataAccess {
    constructor(_URL) {
        this._url = 'mongodb://localhost:27017/data';
        this.menuCollectionName = 'menu';
        this.URL = _URL || this._url; //JS syntact, if URL is undefined use default
        this.insertMenu();
    }
    get URL() {
        return this._url;
    }
    ;
    set URL(newURL) {
        this._url = newURL;
    }
    ;
    connectDb() {
        if (this.dbConnection) {
            //if connection attempt already made,
            return this.dbConnection;
        }
        else {
            //only run this is dbConnection is undefined.
            this.dbConnection = new Promise((resolve, reject) => {
                mongoClient.connect(this.URL, (err, db) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    else {
                        resolve(db);
                    }
                });
            });
            return this.dbConnection;
        }
    }
    ;
    insertMenu() {
        // this function should be executed everytime server starts up
        // by this object only.
        // checks to see if menu collection exists
        // if doesnt exist, insert menu1, menu2 into menu collection
        this.connectDb().then((db) => {
            console.log("begin looking for collection ;Menu;");
            let listedCollections = db.listCollections();
            let exists = false;
            console.log("collections: " + listedCollections);
            console.log("collections length: " + listedCollections.length);
            for (let i = 0; i < listedCollections.length; i++) {
                if (listedCollections[i] == this.menuCollectionName) {
                    console.log("found collection 'menu'");
                    exists = true;
                }
            }
            if (!exists) {
                try {
                    db.collection(this.menuCollectionName).insertOne(menu1, (err, r) => {
                        if (err) {
                            console.log("error inserting menu1: " + err);
                        }
                        else {
                            console.log("insert menu1 success!" + r);
                        }
                    });
                    db.collection(this.menuCollectionName).insertOne(menu2, (err, r) => {
                        if (err) {
                            console.log("error inserting menu2: " + err);
                        }
                        else {
                            console.log("insert menu2 success!" + r);
                        }
                    });
                    console.log("inserted both menus into db!");
                }
                catch (e) {
                    console.log(e);
                }
            }
            else {
                console.log("collection menu exists, not going to insert.");
            }
        });
    }
    getMenus() {
        // gets menu1 and menu2, returns as an array.
        return new Promise((resolve, reject) => {
            this.connectDb().then((db) => {
                db.collection(this.menuCollectionName).find({}).toArray((err, menus) => {
                    if (err) {
                        console.log("Data Access Error: " + err);
                        reject(err);
                    }
                    else {
                        console.log("Data Access: resolved: " + menus);
                        resolve(menus);
                    }
                });
            }).catch((err) => {
                console.log("Data Access: " + err);
                reject(err);
            });
        });
    }
}
exports.MenuDataAccess = MenuDataAccess;
//# sourceMappingURL=DataAccess.js.map