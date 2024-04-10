const path = require('path');

const express = require('express');

const usersController = require('../controllers/users');

const router = express.Router();

router.get('/users', usersController.getUserlist);

router.get('/add-user', usersController.getAddUserForm);
router.post('/add-user', usersController.postAddUser);

router.get('/appointment-details/:id', usersController.getAppointmentbyId);

router.get('/appointment-edit/:id', usersController.editAppointmentbyId);
router.post('/appointment-edit/:id', usersController.updateAppointment);


router.get('/appointment-delete/:id', usersController.deleteAppointmentbyId);

module.exports = router;