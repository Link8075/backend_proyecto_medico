import express from 'express'
import passport from 'passport'
import UserService from '../services/user.service'
import { UserRequestType as RequestType } from '../types/user.type'
import jwt from 'jsonwebtoken'
import { config } from '../config/config'

import pool from "../db"



const router = express.Router()
const service = new UserService(pool)

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
    async (req: RequestType, res, next) => {
    
        console.log('login')
        try {
            
            const { user } = req
            // //sub is the id of the subscribed user
            const payload = { sub: user.id ,rol: user.rol}
            // const dbUser = await service.findByEmail(user.email)
            const token = jwt.sign(payload, config.jwtSecret)
            // res.status(200).json({ user: dbUser.toClient(), token })
            res.status(200).json({user,token})
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
)

export default router