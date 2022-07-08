const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
	const users = await User
		.find({})
		.populate('blogs', {url: 1, title: 1, author: 1})
	response.json(users)
})

usersRouter.post('/', async (request, response) => {
	const {username, name, password} = request.body

	if ((username === undefined) || (password === undefined)) {
		return response.status(400).json(
			{error: 'username and password are required'}
		)
	}

	const existingUser = await User.findOne({username})
	if (existingUser) {
		return response.status(400).json(
			{error: 'username is already taken'}
		)
	}

	if (password.length <= 3 || username.length <= 3){
		return response.status(400).json(
			{error: 'password and username must contain 3 or more characters'}
		)
	}


	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

	const user = new User({
		username,
		name,
		passwordHash
	})

	const savedUser = await user.save()
	response.status(201).json(savedUser)
})

module.exports = usersRouter