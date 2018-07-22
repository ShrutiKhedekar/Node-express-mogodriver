"use strict";
const user = require('../../libs/user');

class userController {
    constructor(router) {
        router.get('/hey', this.signIn.bind(this));
    }
    signIn(req, res) {
        const data = { 'name': 'shruti' };
        user.signin(data, (err, info) => {

            if (err) {
                res
                    .status(404)
                    .json({
                        'responseCode': 404,
                        'responseDesc': "Not found",
                        'data': {}
                    });

            } else {
                res
                    .status(200)
                    .json({
                        'responseCode': 200,
                        'responseDesc': "Hellow",
                        'data': {
                            'name': "shruti"
                        }
                    });
            }
        });
    }
}

module.exports = userController;