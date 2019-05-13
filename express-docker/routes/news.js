const express = require('express')
const router = express.Router()
const chalk = require('chalk')
const log = console.log

const red = chalk.redBright.bold
const green = chalk.greenBright.bold

router.get('/', function (req, res, next) {
  if (process.env.NEWS_URL) {
    log(green('\nNODE_ENV is set\n'))
    res.redirect(process.env.NEWS_URL)
  } else {
    log(red('\nPlease set NODE_ENV\n'))
    res.render('error', {
      title: 'Error',
      error: {
        status: '500',
        message: 'NEWS_URL not set',
        stack: 'Please set NEWS_URL in env vars'
      }
    })
  }
})

module.exports = router
