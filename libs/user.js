const db = require("../config/dbs").get();
const collection = db.collection('user');

class User {
   constructor(){}

    // signin(data, callback) {
    //    collection.find({
    //        username: data.username
    //    }).toArray((err, userdData))
    // }

    signup(data, callback) {
        collection.find({
            username: data.username
        }).toArray((err, userData) => {
            if (err) {
                callback(err, null);
            } else {
                if (!!userData && userData.length == 0) {
                    collection.insert(data, (err, info) => {
                        console.log("data", info);
                        if (data) {
                            callback(null, data)
                        } else {
                            callback(err, null)
                        }
                    });
                }
            }

        })
    }

}

module.exports = new User()