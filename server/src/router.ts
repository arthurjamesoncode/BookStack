import { Router } from "express";
import * as User from './controllers/user'

const router = Router()

router.get('/users', User.getAllUsers)
router.post('/users', User.createUser)

export default router