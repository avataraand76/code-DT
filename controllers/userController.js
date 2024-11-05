const User = require('../models/userModel');

exports.index = (req, res) => {
    const users = User.getAllUsers();
    res.render('users', { title: 'User Table', users });
};
