import { Sequelize } from 'sequelize-typescript';
import { User, Customer, Role } from '../models';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'root',
  database: 'lb4_db',
  models: [User, Customer, Role],
});



export default sequelize;
