const express = require('express');
const bodyParser = require('body-parser');
const validator = require('express-joi-validation').createValidator({});
const Joi = require('joi');

const app = express();
const { getAutoSuggestUsers } = require('./utils');
const { getUserIndex } = require('./utils');

const port = '3000';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = [
  {
    id: '1',
    login: 'john120',
    password: 'John120',
    age: 29,
    isDeleted: false,
  },
  {
    id: '2',
    login: 'john121',
    password: 'John121',
    age: 21,
    isDeleted: false,
  },
  {
    id: '3',
    login: 'john122',
    password: 'John122',
    age: 22,
    isDeleted: true,
  },
  {
    id: '4',
    login: 'Sim',
    password: 'Sim122',
    age: 24,
    isDeleted: false,
  },
  {
    id: '5',
    login: 'Simba',
    password: 'Simba33',
    age: 22,
    isDeleted: false,
  },
];

const bodySchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string()
    .regex(/^([a-zA-Z0-9]{8,15})$/)
    .required(),
  age: Joi.number().integer().min(3).max(130)
    .required(),
});

app.get('/user', (req, res) => {
  res.send(data);
});

app.get('/user/:id', (req, res) => {
  const { params } = req;
  const user = data.filter((x) => x.id === params.id);
  if (user.length) {
    res.send(user);
  } else {
    res.send(JSON.stringify('User Not Found'));
  }
});

app.post('/user/create', validator.body(bodySchema), (request, res) => {
  const id = JSON.stringify(Number(data[data.length - 1].id) + 1);
  const body = {
    ...request.body,
    isDeleted: false,
    id,
  };
  data.push({
    ...body,
    isDeleted: false,
    id: Number(data[data.length - 1].id) + 1,
  });
  res.send(body);
});

app.put('/user/:id', (req, res) => {
  const { id } = req.params;
  const userIndex = getUserIndex(id);

  const updatedUser = {
    ...data[userIndex],
    ...req.body,
  };

  data[userIndex] = updatedUser;
  res.send(data);
});

app.get('/user/:freeText/:limit', (req, res) => {
  const { freeText, limit } = req.params;
  const result = getAutoSuggestUsers(freeText, limit);
  res.send(result);
});

app.delete('/user/:id', (req, res) => {
  const { id } = req.params;
  const userIndex = getUserIndex(id);
  data[userIndex].isDeleted = true;
  res.send(data[userIndex]);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
