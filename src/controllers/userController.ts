import { Request, Response } from "express"
import { Like } from "typeorm"
import { User } from "../entities/User"

export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, age, email } = req.body
  try {
    const user = User.create({ firstName, lastName, age, email })
    await user.save()
    return res.status(201).json({
      message: "User created successfully",
      user
    })
  }catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Internal server error',
      error
    })
  }
}

export const getUsers = async (req: Request, res: Response) => {
  const { search } = req.query
  let where = {}
  try {
    if (search) {
      where = {
        firstName: Like('%' + search + '%')
      }
    }

    const users = await User.find({
      where,
    })

    return res.status(200).json({
      message: 'Users list',
      users
    })
  }catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Internal server error',
      error
    })
  }
}

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const user = await User.findOne({
      where: {
        id: Number(id)
      }
    })
    if (user) {
      return res.status(200).json({
        message: 'User found',
        user
      })
    }
    return res.status(404).json({
      message: 'User not found'
    })
  }catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Internal server error',
      error
    })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const { firstName, lastName, age, email } = req.body
  try {
    const user = await User.findOne({
      where: {
        id: Number(id)
      }
    })

    if (user) {
      User.merge(user, { firstName, lastName, age, email })
      const result = await user.save()
      return res.status(200).json({
        message: 'User updated',
        result
      })
    }

    return res.status(404).json({
      message: 'User not found'
    })
  }catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Internal server error',
      error
    })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const user = await User.findOne({
      where: {
        id: Number(id)
      }
    })

    if (user) {
      await user.remove()
      return res.status(200).json({
        message: 'User deleted'
      })
    }

    return res.status(404).json({
      message: 'User not found'
    })
  }catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Internal server error',
      error
    })
  }
}

