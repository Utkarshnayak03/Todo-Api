const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'yourSecretKey';

// InMemory Database
const todos = [];
const users = [
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password', isActive: true, roles: ['User'] },
  { id: 2, firstName: 'Admin', lastName: 'User', email: 'admin@example.com', password: 'admin', isActive: true, roles: ['Admin'] },
];

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// Middleware for authentication
const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// AuthController
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    isActive: user.isActive,
    roles: user.roles,
  }, SECRET_KEY);

  res.json({ token });
});

// TodoController (Protected with authentication middleware)
app.use('/todo', authenticateUser);

app.get('/todo/get/:id', (req, res) => {
  const { id } = req.params;
  const todo = todos.find(t => t.id === parseInt(id));

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  res.json(todo);
});

app.get('/todo/getall', (req, res) => {
  res.json(todos);
});

app.put('/todo/put/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const index = todos.findIndex(t => t.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  todos[index] = { ...todos[index], title, description };

  res.json({ message: 'Todo updated successfully' });
});

app.post('/todo/create', (req, res) => {
  const { title, description } = req.body;
  const id = todos.length + 1;

  const newTodo = { id, title, description };
  todos.push(newTodo);

  res.json({ message: 'Todo created successfully', todo: newTodo });
});

app.delete('/todo/delete/:id', (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex(t => t.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  todos.splice(index, 1);

  res.json({ message: 'Todo deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
