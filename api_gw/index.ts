import express from 'express';
import type { NextFunction, Response, Request } from 'express';
// import dotenv from 'dotenv';
const logger = console.log;
const app = express();
const port = process.env.SERVER_PORT || 4000;

const allowCrossDomain = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

//@ts-ignore
app.use(allowCrossDomain);
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

let initiatedTasks = getTasksData();
app.get(`/api/v1/board`, (req: Request, res: Response) => {
  res.send(JSON.stringify(initiatedTasks)).status(200);
});

app.post(`/api/v1/board`, (req: Request, res: Response) => {
  initiatedTasks = { ...req.body };
  res.send(JSON.stringify(initiatedTasks)).status(200);
});

app.listen(port, () => {
  logger(`api-gw listening at http://localhost:${port}`);
});

// data.js
function getTasksData() {
  const items = [
    {
      id: cuuid(),
      title: 'Learn Go',
      description: 'bla bla',
      index: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: cuuid(),
      title: 'Go surf',
      description: 'bla bla',
      index: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: cuuid(),
      title: 'Practice React',
      description: 'bla bla',
      index: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: cuuid(),
      title: 'Learn Solid',
      description: 'bla bla',
      index: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return {
    [cuuid()]: {
      name: 'To do',
      items: items,
    },
    [cuuid()]: {
      name: 'In Progress',
      items: [],
    },
    [cuuid()]: {
      name: 'Done',
      items: [],
    },
  };
}

// utils.js
function cuuid() {
  const str = (
    Date.now().toString(16) +
    Math.random().toString(16).slice(2) +
    Math.random().toString(16).slice(2) +
    Math.random().toString(16).slice(2)
  ).slice(0, 32);
  return (
    str.slice(0, 8) +
    '-' +
    str.slice(8, 12) +
    '-' +
    str.slice(12, 16) +
    '-' +
    str.slice(16, 20) +
    '-' +
    str.slice(20)
  );
}
