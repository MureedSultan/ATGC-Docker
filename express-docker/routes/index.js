const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Home'
	});
});

router.get('/telemedicine', function(req, res, next) {
	res.render('telemedicine', {
		title: 'Telemedicine'
	});
});

router.get('/specialties', function(req, res, next) {
	res.render('specialties', {
		title: 'Specialties'
	});
});

router.get('/patients', function(req, res, next) {
	res.render('patients', {
		title: 'Patients'
	});
});

router.get('/partners', function(req, res, next) {
	let partnersFilter = [];
	let clientsFilter = [];
	const partners = fs.readdirSync('./public/dist/img/partners/');
	const clients = fs.readdirSync('./public/dist/img/clients/');

	for (var i = 0; i < partners.length; i++) {
		if (path.extname(partners[i]) == ".png" || path.extname(partners[i]) == ".jpg") {
			console.log(partners[i]);
			partnersFilter.push(partners[i]);
		}
	}
	for (var i = 0; i < clients.length; i++) {
		if (path.extname(clients[i]) == ".png" || path.extname(clients[i]) == ".jpg") {
			console.log(clients[i]);
			clientsFilter.push(clients[i]);
		}
	}
	res.render('partners', {
		title: 'Partners',
		partners: partnersFilter,
		clients: clientsFilter
	});

});

router.get('/faq', function(req, res, next) {
	res.render('faq', {
		title: 'FAQ'
	});
});

router.get('/contact-us', function(req, res, next) {
	res.render('contact-us', {
		title: 'Contact Us'
	});
});

router.post('/contact-us', function(req, res) {
	res.send('1');
});

module.exports = router;