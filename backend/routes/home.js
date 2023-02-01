const router  = require('express').Router()
const {home} = require('../controllers/home')

router.route('/').get(home)

module.exports = router