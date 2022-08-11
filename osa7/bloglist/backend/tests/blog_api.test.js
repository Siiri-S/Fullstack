const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const getToken = async () => {
    const user = {
        username: helper.userList[0].username,
        password: helper.userList[0].password
    }
    const res = await api
        .post('/api/login')
        .send(user)
    const token = res.body.token
    return token
}

const getIncorrectToken = async () => {
    await api
    .post('/api/users')
    .send(helper.userList[1])

    const user = {
        username: helper.userList[1].username,
        password: helper.userList[1].password
    }
    const res = await api
        .post('/api/login')
        .send(user)
    const token = res.body.token
    return token
}



beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    await api
        .post('/api/users')
        .send(helper.userList[0])

    const token = await getToken()
  
    
    for (let blog of helper.blogList) {
        await api
        .post('/api/blogs')
        .send(blog)
        .set('Authorization', `bearer ${token}`)
        .expect(201)
        }
    

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
        expect(response.body).toHaveLength(helper.blogList.length)
      })

    test('blog has identifying field "id"', async () => {
        const blogs = await helper.blogsInDb()
        expect(blogs[0].id).toBeDefined()
    })
    
})

describe('HTTP POST /api/blogs tests', () => {

    test('addition of a blog succeeds with status code 201 when valid token is provided', async() => {
        const newBlog = {
            title: "Best mug recipes",
            author: "Rachel",
            url: "www.rachhBlogs.com",
            likes: 5
        }

        const token = await getToken()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(201)
        

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.blogList.length + 1)
    })


    test('addition of a blog fails with status code 401 when no token is provided', async() => {
        const newBlog = {
            title: "Best mug recipes",
            author: "Rachel",
            url: "www.rachhBlogs.com",
            likes: 5
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
        

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.blogList.length)
    })

    test('addition of a blog fails with status code 401 when incorrect token is provided', async() => {
        const newBlog = {
            title: "Best mug recipes",
            author: "Rachel",
            url: "www.rachhBlogs.com",
            likes: 5
        }

        const token = await getToken()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${token.slice(0, -1)}`)
            .expect(401)
        

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.blogList.length)
    })

    test('default amount of likes is 0', async () => {
        const newBlog = {
            title: "Summer drink recipes",
            author: "Jennifer",
            url: "www.jenBlogs.com",
        }

        const token = await getToken()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(201)
        
        const blogsAtEnd = await helper.blogsInDb()
        const addedBlog = blogsAtEnd[blogsAtEnd.length - 1]
        expect(addedBlog.likes).toBe(0)
    })

    test('blog is not added if title and url are undefined', async () => {
        const newBlog = {
            author: "Rachel",
            likes: 8
        }
        const token = await getToken()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(400)
    })

    test('blog is not added if title is undefined', async () => {
        const newBlog = {
            author: "Rachel",
            url: "rachhBlogs.com",
            likes: 1
        }
        const token = await getToken()


        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(400)
    })

    test('blog is not added if url is undefined', async () => {
        const newBlog = {
            title: "Best cookie recipe",
            author: "Rachel",
            likes: 9
        }

        const token = await getToken()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(400)
    })
})

describe('HTTP DELETE /api/blogs/:id tests', () => {
    test('blog is deletion succeeds with status code 201 when valid id', async () => {
        const blogsAtBeginning = await helper.blogsInDb()
        const blogToDelete = blogsAtBeginning[0]

        const token = await getToken()
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `bearer ${token}`)
            .expect(204)
        
        
        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(blogsAtBeginning.length -1)
        
        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).not.toContain(blogToDelete.title)
    })

    test('blog is deletion fails with status code 401 when no token is provided', async () => {
        const blogsAtBeginning = await helper.blogsInDb()
        const blogToDelete = blogsAtBeginning[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(401)
        
        
        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(blogsAtBeginning.length)
        
        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).toContain(blogToDelete.title)
    })

    test('blog is deletion fails with status code 401 when incorrect token is given', async () => {
        const blogsAtBeginning = await helper.blogsInDb()
        const blogToDelete = blogsAtBeginning[0]

        const token = await getIncorrectToken()
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `bearer ${token}`)
            .expect(401)
        
        
        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(blogsAtBeginning.length)
        
        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).toContain(blogToDelete.title)
    })
})

describe('HTTP PUT /api/blogs/:id tests', () => {
    test('updating likes of a blog suceeds with valid id', async () => {
        const blogsAtBeginning = await helper.blogsInDb()
        const blogToUpdate = blogsAtBeginning[0]

        const updatedBlog = {...blogToUpdate, likes: 83}

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlog)
            .expect(200)
        
        const newBlogs = await helper.blogsInDb()
        expect(newBlogs[0].likes).toBe(83)
    })
})

afterAll(() => {
    mongoose.connection.close()
})




  


