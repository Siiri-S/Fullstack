const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')



blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog
		.find({})
		.populate('user', {username:1, name:1})
	response.json(blogs)
})
  
// eslint-disable-next-line no-unused-vars
blogsRouter.post('/', userExtractor, async (request, response, next) => {
	const body = request.body
	const user = request.user
	const token = request.token
	if (!token) {
		return response.status(401).json({ error: 'token invalid or missing' })
	}
	
	if (!user) {
		return response.status(401).json({ error: 'authentication failed' })
	}

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0,
		user: user._id
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {

  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if ( blog.user.toString() !== user._id.toString()) {
		return response.status(401).json({ error: 'authentication failed' })
	}

	await Blog.findByIdAndRemove(request.params.id) 
	response.status(204).end()
})

blogsRouter.put('/:id', (request, response, next) => {
	const body = request.body
	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	}

	Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
		.then(b => {
			response.json(b)
		})
		.catch(error => next(error))
})

module.exports = blogsRouter