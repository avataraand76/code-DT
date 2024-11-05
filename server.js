const express = require('express');
const http = require('http');
const routes = require('./routes/appRoutes');
const socketIo = require('./common/socket-io');

const app = express();
const server = http.createServer(app);
socketIo.mySocketIo(server);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static('public'));


// Start the server
const PORT = process.env.PORT || 3000;
app.use('/', routes);
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
