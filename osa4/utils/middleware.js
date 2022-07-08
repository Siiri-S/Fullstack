const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


const tokenExtractor = (request, response, next) => {
 let token = null
  const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		token = authorization.substring(7)
	} 
  request.token = token
  next()
}

const userExtractor = async (request, response, next) => {
  const token = request.token 
  const decodedToken = jwt.verify(token, process.env.SECRET) 
  const user = await User.findById(decodedToken.id)
  request.user = user
  next()
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({
        error: 'invalid token'
      })
    }
  
    next(error)
  }

  module.exports = {errorHandler, tokenExtractor, userExtractor}