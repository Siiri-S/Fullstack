const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')


describe('adding new users', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('secretPassword', 10)
        const user = new User({username: 'user1', name: 'jane doe', passwordHash})
        await user.save()
    })

    test('creation of a new user succeeds with new valid user info', async () => {
        const initialUsers = await helper.usersInDb()

        const newUser = {
            username: 'nipsutin',
            name: 'Nipsu',
            password: 'tonnikalaonparasta'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(initialUsers.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation of a new user fails if username already exists', async () => {
        const initialUsers = await helper.usersInDb()
        const newUser = {
            username: 'user1',
            name: 'Hipsu',
            password: 'superSecret'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        expect(result.body.error).toContain('username is already taken')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(initialUsers.length)   
    })

    test('creation of a new user fails if username is not provided', async () => {
        const initialUsers = await helper.usersInDb()
        const newUser = {
            name: 'Hipsu',
            password: 'superSecret'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        expect(result.body.error).toContain('username and password are required')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(initialUsers.length)   
    })

    test('creation of a new user fails if password is not provided', async () => {
        const initialUsers = await helper.usersInDb()
        const newUser = {
            username: 'user2',
            name: 'Hipsu',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        expect(result.body.error).toContain('username and password are required')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(initialUsers.length)   
    })

    test('creation of a new user fails if username is under 3 characters', async () => {
        const initialUsers = await helper.usersInDb()
        const newUser = {
            username: 's',
            name: 'Hipsu',
            password: 'superSecret'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        expect(result.body.error).toContain('password and username must contain 3 or more characters')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(initialUsers.length)   
    })

    test('creation of a new user fails if password is under 3 characters', async () => {
        const initialUsers = await helper.usersInDb()
        const newUser = {
            username: 'user3',
            name: 'Hipsu',
            password: 's'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        expect(result.body.error).toContain('password and username must contain 3 or more characters')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(initialUsers.length)   
    })
    
})

afterAll(() => {
    mongoose.connection.close()
})