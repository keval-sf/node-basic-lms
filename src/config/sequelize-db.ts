import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/User.model'; // Import your models

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost', // Change if needed
  port: 5433,        // Default PostgreSQL port
  username: 'postgres',
  password: 'root',
  database: 'lb4_db',
  models: [User],    // Add your models here
});



export default sequelize;
