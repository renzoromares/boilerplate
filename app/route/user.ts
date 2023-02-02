import express from 'express'
import UserController from '../controller/user'

const user_controller = new UserController()
const route = express.Router()



route.get('/user', user_controller.getAllUser)

route.delete('/user/:id', user_controller.deleteById)


route.put('/user/:id', user_controller.updateUserById)

export default route