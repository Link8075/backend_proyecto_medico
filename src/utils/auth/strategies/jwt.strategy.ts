import { Strategy, ExtractJwt } from 'passport-jwt'

import { config } from '../../../config/config'

console.log(config.jwtSecret)
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}


const JwtStrategy = new Strategy(options, (payload, next) => {
  return next(null, payload)
})

export default JwtStrategy