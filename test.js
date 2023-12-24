// Importing 'http' module  
const http = require('http'); 
  
// Setting Port Number as 80  
const port = 8066;  // minardo server remaps 80 to 8066
  
// Setting hostname as the localhost 
// NOTE: You can set hostname to something  
// else as well, for example, say 127.0.0.1 
const hostname = '0.0.0.0'; 
  
// Creating Server  
const server = http.createServer((req,res)=>{ 
    // Handling Request and Response  
    res.statusCode=200; 
    res.setHeader('Content-Type', 'text/plain');
    res.end("Welcome to Geeks For Geeks");
    // Construct the full URL
    const protocol = req.connection.encrypted ? 'https' : 'http';
    const host = req.headers['host'];
    const fullUrl = `${protocol}://${host}${req.url}`;

    console.log(`Received request: ${req.method} ${fullUrl}`);
}); 
  
// Making the server to listen to required 
// hostname and port number 
server.listen(port,hostname,()=>{ 
    // Callback  
    console.log(`Server running at http://${hostname}:${port}/`); 
});