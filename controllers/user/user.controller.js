"use strict";
const user = require('../../libs/user');

class userController {
    constructor(router) {
        router.get('/hey', this.startFun.bind(this));
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
    startFun(req, res){
        console.log("hey")
    }
    async signUp(req, res) {
        try {
            const data = await user.signup(req.body);

            res.status(500)
                .json({
                    'responseCode': 500,
                    'responseDesc': "Error while processing the request",
                    'data': {}
                });
        } catch (e) {
            res.status(200)
                .json({
                    'responseCode': 200,
                    'responseDesc': e,
                    'data': {}
                });
        }


    }
}

module.exports = userController;