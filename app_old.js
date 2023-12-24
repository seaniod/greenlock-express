const app = require('express')();

app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    console.log(`Headers: ${JSON.stringify(req.headers)}`);
    // If you also want to log the body, you need to parse it as JSON first
    // You can uncomment the following lines if needed
    // app.use(express.json());
    // console.log(`Body: ${JSON.stringify(req.body)}`);
    next(); // Continue to the next middleware or route handler
});


app.use('/', (req, res) => {
    res.send('Hello, World!');
});