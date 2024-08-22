import express, { Request, Response } from 'express';
import db, { UserBody } from './config/json-db';
import sequelize from './config/sequelize-db';
import { User } from './models/User.model';
import { ValidationError, ValidationErrorItem } from 'sequelize';


const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

sequelize.authenticate().then(() => {
  console.log('DB Connected successfully...',);
}).catch((error) => {
  console.log('Error while connecting to DB', error);
})

// Create User
app.post('/users', async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const userInfo = await User.create({ name: name, email: email })

    res.status(201).json(userInfo);

  } catch (error: any) {

    if (error instanceof ValidationError) {
      const messages = error.errors.map((errItem: ValidationErrorItem) => ({
        field: errItem.path,
        message: errItem.message
      }));
      res.status(400).json({ errors: messages });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

// Fetch All Users
app.get('/users', async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json(users);
});

// Fetch Individual
app.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);

  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Update User
app.put('/users/:id', async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByPk(req.params.id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update({ name: name || user.name, email: email || user.email, })

    res.json(user);
  } catch (error: any) {
    if (error instanceof ValidationError) {
      const messages = error.errors.map((errItem: ValidationErrorItem) => ({
        field: errItem.path,
        message: errItem.message
      }));
      res.status(400).json({ errors: messages });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

// Delete (DELETE)
app.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();

    res.status(200).json({ message: 'User Deleted Successfully' });

  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
