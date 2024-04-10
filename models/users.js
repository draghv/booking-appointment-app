const Sequelize  = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  fullName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isNumeric: true,
    },
  },
});

User.fetchAll = () => {
  return User.findAll()
    .then(users => users)
    .catch(error => {
      console.error(error);
      throw error;
    });
};

User.fetchAppointmentById = (id) => {
  return User.findByPk(id)
    .then(users => users)
    .catch(error => {
      console.error(error);
      throw error;
    });
};

User.updateAppointmentById = (id, fullName, email, phoneNumber) => {
  return User.findByPk(id)
    .then(appointment => {
      if (!appointment) {
        throw new Error('Appointment not found');
      }

      appointment.fullName = fullName;
      appointment.email = email;
      appointment.phoneNumber = phoneNumber;

      return appointment.save();
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
};


User.deleteAppointmentById = (id) => {
  return User.findByPk(id)
    .then(appointment => {
      return appointment.destroy();
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
};



module.exports = User;


