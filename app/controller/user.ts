import { Request, Response } from 'express'
import UserModel from '../model/user'

const user_model = new UserModel()

class UserController {
   
    getAllUser(req: Request, res: Response) {
        const result = user_model.getAllUser()
        return res.send( {
            result
        })
    } 

    deleteById(req: Request, res: Response) {
        const result = user_model.deleteById()

        return res.send({
            result
        })
    }

    updateUserById(req: Request, res: Response) {
        const result = user_model.updateUserById()

        return res.send({
            result
        })
    }
}


export default UserController