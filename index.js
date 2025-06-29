const http = require('http');
const fs = require('fs');

const port = 2000;
const storedData = 'tasks.json';

let initialTasks = [
  {
    "id": 1,
    "title": "Do your homework",
    "completed": false
  }
];

const server = http.createServer((req, res) => {
  if (req.url === '/tasks') {

    fs.readFile(storedData, 'utf8', (err, data) => {
      if (err) {
        res.end('Error reading.');
        return;
      }
      res.end(data);
    });

  }else if ( req.url === '/tasks/add') {
    fs.writeFile(storedData, JSON.stringify(initialTasks, null, 2), err => {
      if (err) {
        res.end('Error saving task');
        return;
      }
      res.end("Data is stored.");
    });
  }else if (req.url === '/tasks/clear') {
    fs.writeFile(storedData,'[]',(err,data) => {
      if (err){
        res.end('An unexpected error occured.')
      }
      res.end("The tasks has been cleared.")
    })
  }else{
    res.end('Route not found');
  }
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
