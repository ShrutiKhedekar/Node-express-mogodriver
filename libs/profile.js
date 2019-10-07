const db = require("../config/dbs").get();
const collection = db.collection('user');


class Profile {
    constructor() {

    }

    imageUrl(user) {
        return new Promise((resolve, reject) => {

            collection.find({
                username: user
            }).toArray((err, data) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    if (!!data && data.length == 0) {
                        let imageInfo = data.imageUrl;
                        if (imageInfo) {
                            resolve(imageInfo);
                        } else {
                            resolve("dummy path");
                        }
                    } else {
                        reject(new Error("already exists"));
                    }
                }
            })

        });
    }


    uploadImage() {

    }


    coverInfo(id) {

        return new Promise((resolve, reject) => {

            collection.find({
                id: id
            }).toArray((err, data) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    if (!!data && data.length !== 0) {
                        let about = data[0].about;

                        console.log(about)
                        if (about) {
                            resolve(about);
                        } else {
                            resolve("No info present");
                        }
                    } else {
                        reject(new Error("already exists"));
                    }
                }
            })

        });

    }


    addcoverInfo(id, data) {
        return new Promise((resolve, reject) => {
            db.collection.find({
                id: id
            }).toArray((err, user) => {
                if (err) {
                    reject(err)
                } else {
                    if (user && user.length) {

                        db.collection.update({ id: id }, { $set: { about: data } })
                            .toArray((err, data) => {
                                if (err) {
                                    reject(err)
                                } else {
                                    console.log(data)
                                    resolve("Succvessfully udpted")
                                }
                            })
                    }
                }
            })
        })
    }


}

module.exports = new Profile();
