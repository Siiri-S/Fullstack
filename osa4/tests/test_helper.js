const Blog = require('../models/blog')
const User = require('../models/user')

const blogList = [
    {
        title: "Day with Nipsu",
        author: "Sri",
        url: "www.sriBlogs.fi",
        likes: 19
    },
    {
      title: "DYI macrame projects",
      author: "Sri",
      url: "www.sriBlogs.fi",
      likes: 3
    }
  ]

  const userList = [
    {
      username: 'srii',
      name: 'Siiri',
      password: '1q2w3e'
    },
    {
      username: 'nipsutin',
      name: 'Nipsu',
      password: 'tonnikalaonparasta'
    },
  ]

  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

  module.exports = {
    userList, blogList, blogsInDb, usersInDb
  }