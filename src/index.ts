import express from 'express';
import sequelize from './config/sequelize-db';
import { userRoutes, customerRoutes } from './routes';

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

sequelize.authenticate().then(() => {
  console.log('DB Connected successfully...',);
}).catch((error) => {
  console.log('Error while connecting to DB', error);
})

// Controllers
app.use('/users', userRoutes);
app.use('/customers', customerRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
