const User = require('../models/users');

exports.editAppointmentbyId = (req, res, next) => {
    const appointmentId = req.params.id;
    console.log(appointmentId, "lllllll");
    User.fetchAppointmentById(appointmentId)
      .then(appointment => {
        res.render('users/appointment-detail-edit', {
          appointment: appointment,
          pageTitle: 'Edit Appointment',
          path: '/appointments',
        });
      })
      .catch(error => {
        res.status(500).send('Internal Server Error');
      });
};

exports.updateAppointment = (req, res, next) => {
    const appointmentId = req.params.id;
    const updatedFullName = req.body.fullName;
    const updatedEmail = req.body.email;
    const updatedPhoneNumber = req.body.phoneNumber;

    User.updateAppointmentById(appointmentId, updatedFullName, updatedEmail, updatedPhoneNumber)
        .then(() => {
            res.redirect('/users');
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
};
  

exports.deleteAppointmentbyId = (req, res, next) => {
    const appointmentId = req.params.id;
    console.log(appointmentId, "lllllll");
    User.deleteAppointmentById(appointmentId)
      .then(() => {
        res.redirect('/users');
      })
      .catch(error => {
        res.status(500).send('Internal Server Error');
      });
  };


exports.getAppointmentbyId = (req, res, next) => {
    const appointmentId = req.params.id;
    console.log(appointmentId, "lllllll");
    User.fetchAppointmentById(appointmentId)
      .then(appointment => {
        res.render('users/appointment-detail', {
          appointment: appointment,
          pageTitle: 'Appointment Details',
          path: '/appointments',
        });
      })
      .catch(error => {
        res.status(500).send('Internal Server Error');
      });
  };
  


exports.getUserlist = (req, res, next) => {
    User.fetchAll()
      .then(users => {
        // console.log(users);
        res.render('users/index', {
          prods: users,
          pageTitle: 'All Appointment',
          path: '/appointments',
        });
      })
      .catch(error => {
        res.status(500).send('Internal Server Error');
      });
  };
  
  
exports.getAddUserForm = (req, res, next) => {
    res.render('users/add-user-form', {
      pageTitle: 'Add Appointment',
      path: '/add-appointment',
    });
  };


  exports.postAddUser = (req, res, next) => {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;

    User.create({
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
    })
      .then(user => {
        console.log('User created successfully:', user);
        res.redirect('/users'); 
      })
      .catch(err => {
        console.log('Error creating user:', err);
        res.redirect('/add-user'); 
      });
  };

  