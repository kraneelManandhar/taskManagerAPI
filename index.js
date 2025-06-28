const http = require('http');
const fs = require('fs');

const port = 2000;
const storedData = 'tasks.json';

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/tasks') {
    fs.readFile(storedData, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error reading.');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });
  }
  else if (req.method === 'POST' && req.url === '/tasks') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const task = JSON.parse(body);

      fs.readFile(storedData, 'utf8', (err, data) => {
        let tasks = [];
        if (!err && data) {
          tasks = JSON.parse(data);
        }

        task.id = tasks.length + 1;
        tasks.push(task);

        fs.writeFile(storedData, JSON.stringify(tasks, null, 2), err => {
          if (err) {
            res.writeHead(500);
            res.end('Error saving task');
            return;
          }
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(task));
        });
      });
    });
  }
  else {
    res.writeHead(404);
    res.end('Route not found');
  }
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
