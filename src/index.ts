import express, { Request, Response } from 'express';
import db, { UserBody } from './db-class';

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// Create User
app.post('/users', async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const newUser = { id: Date.now(), name, email };

  try {

    const checkReq = validateRequest(req);

    if (!checkReq.status) {
      throw new Error(checkReq.message);
    }

    const users = await db.getData('/users') as UserBody[];
    const userExists = users.find(row => row.email == email);

    if (userExists) {
      throw new Error('Email already exists');
    }

    users.push(newUser);
    await db.push('/users', users, false);
    res.status(201).json(newUser);

  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Fetch All Users
app.get('/users', async (req: Request, res: Response) => {
  const users = await db.getData('/users');
  res.json(users);
});

// Fetch Individual
app.get('/users/:id', async (req: Request, res: Response) => {
  const users = await db.getData('/users') as UserBody[];
  const user = users.find(row => row.id == parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
});

// Update User
app.put('/users/:id', async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const users = await db.getData('/users') as UserBody[];
  const userIndex = users.findIndex(row => row.id === parseInt(req.params.id));

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users[userIndex].name = name || users[userIndex].name;
  users[userIndex].email = email || users[userIndex].email;
  db.push('/users', users);

  res.json(users[userIndex]);
});

// Delete (DELETE)
app.delete('/users/:id', async (req: Request, res: Response) => {
  let users = await db.getData('/users') as UserBody[];
  users = users.filter((user: { id: number }) => user.id !== parseInt(req.params.id));
  db.push('/users', users);

  res.status(204).send();
});

const validateRequest = (req: Request) => {
  const { name, email } = req.body;
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


  if (!name || !email) {
    return { status: false, message: 'Name or Email required' }
  }

  if (!isEmail) {
    return { status: false, message: 'Valid Email required' }
  }

  return { status: true, message: 'Success' }

}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
