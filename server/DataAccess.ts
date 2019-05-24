//Data Access object
import mongodb = require('mongodb');
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

export class OrderDataAccess    {
    private dbConnection: Promise<any>;
    private orderCollection: Promise<any>;
    private _url = 'mongodb://localhost:27017/data';
    private orderCollectionName = 'orders';

    constructor(_URL?: string) {
        this.URL = _URL || this._url;  //JS syntact, if URL is undefined use default
    }
    get URL()   {
        return this._url;
    }
    set URL(newURL) {
        this._url = newURL;
    };
    connectDb(): Promise<any> {  //Okay,
        if (this.dbConnection) { //Only try to connect once, if it fails use a new connetion object.
            //if connection attempt already made,
            return this.dbConnection;
        } else {
            //only run this is dbConnection is undefined.
            this.dbConnection = new Promise<any>((resolve, reject) => {
                mongoClient.connect(this.URL, (err: any, db: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(db);
                    }
                })
            })
            return this.dbConnection;
        }
    }
    insertOrder(order : any) : Promise<any>  {
        return new Promise<any>((resolve, reject) => {
            this.connectDb().then((db: any) => {
                db.collection(this.orderCollectionName).insertOne(order, (err: any, r: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(r);
                    }
                })
            }).catch((err) => {
                reject(err);
                console.log("Cannot insert order");
            });
        });
    }
    getOrders(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.connectDb().then((db: any) => {
                db.collection(this.orderCollectionName).find({}).toArray((err: any, orders: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(orders);
                    }
                });
            }).catch((err) => {
                reject(err);
            });
        });
    }
}

export class MenuDataAccess {
    private dbConnection: Promise<any>; //remember these are undfined until we create them
    private menuCollection: Promise<any>; //remember these are undefined until we create them
    private _url = 'mongodb://localhost:27017/data';
    private menuCollectionName = 'menu';

    constructor(_URL?: string) {
        this.URL = _URL || this._url;  //JS syntact, if URL is undefined use default
        this.insertMenu();
    }
    get URL() {
        return this._url;
    };
    set URL(newURL) {
        this._url = newURL;
    };

    connectDb(): Promise<any> {  //Okay,
        if (this.dbConnection) { //Only try to connect once, if it fails use a new connetion object.
            //if connection attempt already made,
            return this.dbConnection;
        } else {
            //only run this is dbConnection is undefined.
            this.dbConnection = new Promise<any>((resolve, reject) => {
                mongoClient.connect(this.URL, (err: any, db: any) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(db);
                    }
                })
            })
            return this.dbConnection;
        }
    };
    insertMenu()    {
        // this function should be executed everytime server starts up
        // by this object only.
        // checks to see if menu collection exists
        // if doesnt exist, insert menu1, menu2 into menu collection
        this.connectDb().then((db:any)  =>  {
            console.log("begin looking for collection ;Menu;");
            let listedCollections : Array<any> = db.listCollections();
            let exists : boolean = false;
            console.log("collections: " + listedCollections);
            console.log("collections length: "+ listedCollections.length);
            for(let i = 0; i < listedCollections.length; i++)   {
                if(listedCollections[i] == this.menuCollectionName) {
                    console.log("found collection 'menu'");
                    exists = true;
                }
            }
            if(!exists) {
                try {
                    db.collection(this.menuCollectionName).insertOne(menu1, (err: any, r: any) => {
                        if (err) {
                            console.log("error inserting menu1: " + err);
                        } else {
                            console.log("insert menu1 success!" + r);
                        }
                    });
                    db.collection(this.menuCollectionName).insertOne(menu2, (err: any, r: any) => {
                        if (err) {
                            console.log("error inserting menu2: " + err);
                        } else {
                            console.log("insert menu2 success!" + r);
                        }
                    });
                    console.log("inserted both menus into db!");
                }   catch(e)    {
                    console.log(e);
                }
            }
            else    {
                console.log("collection menu exists, not going to insert.");
            }
        });
    }
    getMenus() : Promise<any> {
        // gets menu1 and menu2, returns as an array.
        return new Promise<any>((resolve, reject)   =>  {
            this.connectDb().then((db: any) =>  {
                db.collection(this.menuCollectionName).find({}).toArray((err: any, menus: any)  =>  {
                    if (err)    {
                        console.log("Data Access Error: " + err);
                        reject(err);
                    }   else    {
                        console.log("Data Access: resolved: "+menus);
                        resolve(menus);
                    }
                });
            }).catch((err)  =>  {
                console.log("Data Access: "+err);
                reject(err);
            });
        });
    }
}