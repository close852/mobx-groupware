/* EXPRESS SERVER */
import express from 'express'
import bodyParser from 'body-parser'

/* LOGGER */
import logger from 'morgan';
import fs from 'fs';
import path from 'path'

/* SESSION */
import session from 'express-session';


/* ROUTER */
import api from './routes'

/* SERVER */
const app = express();
const PORT = process.env.PORT || 4000;

/* LOG */
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), {
    flags: 'a'
})

/* applyMiddleware */
app.use(logger('combined', {
    stream: accessLogStream
}))
app.use('/', express.static(path.join(__dirname, './../public')))
app.use(session({
    secret: 'mw',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));


/*addRouter */
app.use('/api', api);

app.listen(PORT, (req, res) => {
    console.log(`http://127.0.0.1:${PORT} start!`)
})
