const express = require('express');
const router = express.Router();
const axios = require('axios');
const chalk = require('chalk');
const log = console.log;

const white = chalk.whiteBright.bold;
const red = chalk.redBright.bold;
const green = chalk.greenBright.bold;
const cyan = chalk.cyanBright.bold;

const client_id = 'ghost-frontend';
const client_secret = 'fff48a18b688';

if (process.env.NODE_ENV == "production") {
    api = 'http://ghost:2368/ghost/api/v0.1/posts/';
    log(white('\nEnvironment: Production\n'));
} else if (process.env.NODE_ENV == "development") {
    api = 'http://localhost:2368/ghost/api/v0.1/posts/';
    log(white('\nEnvironment: Development\n'));
} else {
    log(red('\nPlease set NODE_ENV\n'));
}

router.get('/', function(req, res, next) {
    log(cyan('\n========== NEWS ==========\n'));
    axios.get(api, {
            params: {
                client_id,
                client_secret
            }
        })
        .then(function(response) {
            res.render('news/news', {
                title: 'News',
                posts: response.data.posts
            });
            log(green(`\nSuccess: ${api}\n`));
        })
        .catch(function(error) {
            let err;
            if (typeof error.response == "undefined") {
                err = {
                    status: '500',
                    statusText: "API can't be reached",
                    stack: error
                }
            } else {
                err = {
                    status: error.response.status,
                    message: error.response.statusText,
                    stack: 'Axios ' + error
                }
            }
            res.render('error', {
                title: 'Error',
                error: {
                    status: err.status,
                    message: err.statusText,
                    stack: err.stack
                }
            });
            //log(error);
            log(red(`\nError: ${api}\n`));
        });
});

router.get('/:article', function(req, res, next) {
    log(cyan('\n========== ARTICLE =========='));
    const article = req.params.article;
    let url = api + 'slug/' + article;
    //*
    axios.get(url, {
            params: {
                client_id,
                client_secret
            }
        })
        .then(function(response) {
            res.render('news/news-single', {
                title: 'News',
                posts: response.data.posts
            });
            log(green(`\nSuccess: ${article}\n`));
        })
        .catch(function(error) {
            res.render('error', {
                title: 'Error',
                error: {
                    status: error.response.status,
                    message: error.response.statusText,
                    stack: 'Axios ' + error
                }
            });
            //log(error);
            log(red(`\nError: ${article}\n`));
        });
    //*/
});

module.exports = router;