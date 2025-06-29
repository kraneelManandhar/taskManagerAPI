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

  }else{
    res.end('Route not found');
  }
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
