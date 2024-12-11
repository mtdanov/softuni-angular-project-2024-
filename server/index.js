const express = require('express');
const routes = require('./routes')
const expressConfig = require('./config/expressConfig')
const initDatabase = require('./config/mongooseConfig')

const app = express();
expressConfig(app)

initDatabase()
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(routes)
app.listen(3010, () => { console.log('Server is running') })
