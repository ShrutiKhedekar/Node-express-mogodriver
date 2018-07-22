class User {

    signin(data, callback) {
        console.log("in signin", data);
        callback(null, { "hey": "hey" });
    }

}

module.exports = new User()
