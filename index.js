/**
 * node-api-starter
 * Boilerplate code for a Node.js API Server.
 *
 * @author Jasper Valero <contact@jaspervalero.com>
 * https://github.com/jaspervalero/node-api-starter
 */
const http = require( 'http' );
const bodyParser = require( 'body-parser' );
const express = require( 'express' );
const morgan = require( 'morgan' );
const mongoose = require( 'mongoose' );
const cors = require( 'cors' );

const app = express();
const router = require( './router' );
const server = http.createServer( app );

const port = process.env.PORT || 3000;

/*_____ DB SETUP _____*/

// Connect Mongoose to local instance of MongoDB
mongoose.connect('mongodb://localhost:27017/auth',{ 
    useUnifiedTopology: true,
    useNewUrlParser: true 
})
.then(response =>{
    console.log("mongodb connected")
})
.catch(err =>{
    console.log("error")
})

/*_____ APP SETUP _____*/

// Log reqs to STDOUT
app.use( morgan( 'combined' ) );
// Enable CORS (Origin: *)
app.use( cors() );
// Parse reqs as JSON
app.use( bodyParser.json({ type: '*/*' }) );
// Init router
router( app );

/*_____ SERVER SETUP _____*/

// Listen on port
server.listen( port );
console.log( 'Server listening on:', port );