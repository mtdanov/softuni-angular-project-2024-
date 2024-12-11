const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { auth } = require('../middlewares/authMiddleware');

function expressConfig(app) {
    app.use(cors());

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json())
    app.use(cookieParser());
    app.use(auth);
    app.use(express.static(path.join(__dirname, '../public')));
}

module.exports = expressConfig;