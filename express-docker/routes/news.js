const express = require('express');
const router = express.Router();
const axios = require('axios');

let api;
if (process.env.NODE_ENV == "production") {
    api = 'http://ghost:2368/ghost/api/v0.1/posts/';
    console.log('Env: production');
} else if (process.env.NODE_ENV == "development") {
    api = 'http://localhost:2368/ghost/api/v0.1/posts/';
    console.log('Env: development');
} else {
    console.log('Please set NODE_ENV');
}

router.get('/', function(req, res, next) {
    console.log('========== NEWS ==========');
    axios.get(api, {
            params: {
                absolute_urls: true,
                client_id: 'ghost-frontend',
                client_secret: 'fff48a18b688'
            }
        })
        .then(function(response) {
            res.render('news/news', {
                title: 'News',
                posts: response.data.posts
            });
        })
        .catch(function(error) {
            res.render('error');
            console.log(error);
        });
    console.log('========== END NEWS ==========');
});

router.get('/:article', function(req, res, next) {
    console.log('========== ARTICLE ==========');
    const article = req.params.article;
    let url = api + 'slug/' + article;
    //res.send('test');
    //*
    axios.get(url, {
            params: {
                absolute_urls: true,
                client_id: 'ghost-frontend',
                client_secret: 'fff48a18b688'
            }
        })
        .then(function(response) {
            res.render('news/news-single', {
                title: 'News',
                posts: response.data.posts
            });
            console.log(response.data.posts[0].html);
        })
        .catch(function(error) {
            res.render('error');
            //console.log(error);
        });
    //*/
    console.log('========== END ARTICLE ==========');
});

module.exports = router;