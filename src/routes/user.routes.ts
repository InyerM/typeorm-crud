import { Router } from 'express'
import { createUser, getUsers, getUser, updateUser, deleteUser } from '../controllers/userController'

const router = Router()

router.post('/createUser', createUser)
router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

export default router