const db = require("../config/dbs").get();
const collection = db.collection('user');

class User {
    constructor() {}

    // signin(data, callback) {
    //    collection.find({
    //        username: data.username
    //    }).toArray((err, userdData))
    // }

    signup(data) {
        return new Promise((resolve, reject) => {
            collection.find({
                username: data.username
            }).toArray((err, userData) => {
                if (err) {
                    reject(new Error("error occured"));
                } else {
                    if (!!userData && userData.length == 0) {
                        collection.insert(data, (err, info) => {
                            if (data) {
                                resolve(info)
                            } else {
                                reject(new Error("Error again"))
                            }
                        });
                    }else{
                        reject(new Error("already exists"));
                    }
                }

            })
        })

    }

}

module.exports = new User()