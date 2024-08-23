import { Request, Response } from 'express';
import { User } from './user.model';
import { ValidationError, ValidationErrorItem } from 'sequelize';

export class UserController {

  async create(req: Request, res: Response): Promise<void> {
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
  }

  async fetchAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error: 'An unexpected error occurred' });
    }
  }

  async fetchById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }

  async updateById(req: Request, res: Response): Promise<void> {
    try {
      const { name, email } = req.body;
      const user = await User.findByPk(req.params.id)

      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        await user.update({ name: name || user.name, email: email || user.email, })

        res.json(user);
      }

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
  }

  async deleteById(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findByPk(req.params.id)

      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        await user.destroy();

        res.status(200).json({ message: 'User Deleted Successfully' });
      }

    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
