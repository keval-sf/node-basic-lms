import { Router } from "express";
import { UserController } from "./app/users/users.controller";
import { CustomersController } from "./app/customers/customers.controller";


// User Routes
const userController = new UserController()
export const userRoutes = Router()
.post('/',userController.create)
.get('/',userController.fetchAll)
.get('/:id',userController.fetchById)
.put('/:id',userController.updateById)
.delete('/:id',userController.deleteById)


// Customer Routes
const customerController = new CustomersController()
export const customerRoutes = Router()
.post('/',customerController.create)
.get('/',customerController.fetchAll)
.get('/:id',customerController.fetchById)
.put('/:id',customerController.updateById)
.delete('/:id',customerController.deleteById)
