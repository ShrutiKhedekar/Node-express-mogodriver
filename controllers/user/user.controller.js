"use strict";
const user = require('../../libs/user');

class userController {
    constructor(router) {
        router.get('/hey', this.signIn.bind(this));
        router.post('/signup', this.signUp.bind(this));
    }
    signIn(req, res) {
        const data = {
            'name': 'shruti'
        };
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

    signUp(req, res) {

        console.log(req.body);
        user.signup(req.body, (err, info) => {
            if (err) {
                res
                    .status(500)
                    .json({
                        'responseCode': 500,
                        'responseDesc': "Error while processing the request",
                        'data': {}
                    });
            } else {
                res
                    .status(200)
                    .json({
                        'responseCode': 200,
                        'responseDesc': "Successfully created user!",
                        'data': info
                    });
            }
        })

    }
}

module.exports = userController;