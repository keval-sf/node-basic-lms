import { Request, Response } from 'express';
import { Customer } from './customer.model';
import { ValidationError, ValidationErrorItem } from 'sequelize';
import { Role, User } from '../../models';

export class CustomersController {

  async create(req: Request, res: Response): Promise<void> {
    const { name, website, userId, roleId } = req.body;

    try {
      const customerInfo = await Customer.create({ 
        name: name, 
        website: website,
        userId: userId,
        roleId: roleId
      })

      res.status(201).json(customerInfo);

    } catch (error: any) {

      if (error.index == 'customer_user_fk') {
        res.status(400).json({ errors: { customerId: 'Invalid User Id' } });
      }else if (error.index == 'customers_roles_fk') {
        res.status(400).json({ errors: { roleId: 'Invalid Role Id' } });
      }else if (error instanceof ValidationError) {
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
      const customers = await Customer.findAll({
        include:[
          {
            attributes:['name'],
            model: User
          },
          {
            attributes:['roleName'],
            model: Role
          }
        ]
      });
      res.status(200).json(customers);
    } catch (error) {
      console.log('error', error);
      res.status(400).json({ error: 'An unexpected error occurred' });
    }
  }

  async fetchById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const customer = await Customer.findByPk(id);
      if (customer) {
        res.status(200).json(customer);
      } else {
        res.status(404).json({ error: 'Customer not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }

  async updateById(req: Request, res: Response): Promise<void> {
    try {
      const { name, website, userId, roleId } = req.body;
      const customer = await Customer.findByPk(req.params.id)

      if (!customer) {
        res.status(404).json({ message: 'Customer not found' });
      } else {
        await customer.update({ 
          name: name || customer.name, 
          website: website || customer.website,
          userId: userId || customer.userId,
          roleId: roleId || customer.roleId,
        })

        res.json(customer);
      }

    } catch (error: any) {
      if (error.index == 'customer_user_fk') {
        res.status(400).json({ errors: { customerId: 'Invalid User Id' } });
      }else if (error.index == 'customers_roles_fk') {
        res.status(400).json({ errors: { roleId: 'Invalid Role Id' } });
      }else if (error instanceof ValidationError) {
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
      const customer = await Customer.findByPk(req.params.id)

      if (!customer) {
        res.status(404).json({ message: 'Customer not found' });
      } else {
        await customer.destroy();

        res.status(200).json({ message: 'Customer Deleted Successfully' });
      }

    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
