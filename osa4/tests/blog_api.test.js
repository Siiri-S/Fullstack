const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('HTTP GET /api/blogs tests', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are correct amount of blogs', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
      })

    test('blog has identifying field "id"', async () => {
        const blogs = await helper.blogsInDb()
        expect(blogs[0].id).toBeDefined()
    })
    
})

describe('HTTP POST /api/blogs tests', () => {
    test('a valid blog can be added', async() => {
        const newBlog = {
            title: "Best mug recipes",
            author: "Rachel",
            url: "www.rachhBlogs.com",
            likes: 5
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        
        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).toContain('Best mug recipes')
    })

    test('default amount of likes is 0', async () => {
        const newBlog = {
            title: "DYI macrame projects",
            author: "Jennifer",
            url: "www.jenBlogs.com",
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
        
        const blogsAtEnd = await helper.blogsInDb()
        const addedBlog = blogsAtEnd[blogsAtEnd.length - 1]
        expect(addedBlog.likes).toBe(0)
    })

    test('blog is not added if title and url are undefined', async () => {
        const newBlog = {
            author: "Rachel",
            likes: 8
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('blog is not added if title is undefined', async () => {
        const newBlog = {
            author: "Rachel",
            url: "rachhBlogs.com",
            likes: 1
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('blog is not added if url is undefined', async () => {
        const newBlog = {
            title: "Best cookie recipe",
            author: "Rachel",
            likes: 9
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})



afterAll(() => {
    mongoose.connection.close()
})




  


