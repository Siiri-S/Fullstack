const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "Day with Nipsu",
        author: "Sri",
        url: "www.sriBlogs.fi",
        likes: 19
    },
    {
        title: "What to do on a rainy day",
        author: "Daisy",
        url: "www.daisyBlogs.fi",
        likes: 2
    },
  ]

  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

  module.exports = {
    initialBlogs, blogsInDb
  }