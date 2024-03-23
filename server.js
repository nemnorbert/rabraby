let app;
const http = require('http');
const port = process.env.PORT || 1982;

const maintenanceMode = false;
app = maintenanceMode ? require('./maintenance') : require('./app');

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});