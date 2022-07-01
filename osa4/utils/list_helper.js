
var keyBy = require('lodash.keyby');
var zipObject = require('lodash.zipobject');
var map = require('lodash.map');

const dummy = (blogs) => {
  return 1
}

const totalLikes = blogs => {
  const reducer = (sum, item) => sum + item
  return blogs.length === 0
  ? 0
  : (blogs.map(blog => blog.likes).reduce(reducer, 0))
}

const favoriteBlog = blogs => {
  let currMostLikes = 0
  let mostLikedblog = {}
  blogs.forEach(blog => {
    if (blog.likes > currMostLikes){
      currMostLikes = blog.likes
      mostLikedblog = blog
    } 
  })

  return mostLikedblog
}


const mostBlogs = blogs => {
  if (blogs.length === 0 ) return {author: "", blogs: 0}
  const authors = map(keyBy(blogs,'author'), (e => e.author))
  const authorMap = zipObject(authors, new Array(authors.length).fill(0))
  
  blogs.forEach(blog => {
    const author = blog.author
    authorMap[author] = authorMap[author] + 1
  })

  const authorWithMostBlogs = Object.keys(authorMap).reduce((a, b) => authorMap[a] > authorMap[b] ? a : b);

  return ({
    author: authorWithMostBlogs,
    blogs: authorMap[authorWithMostBlogs]
  })
}

const mostLikes = blogs => {
  if (blogs.length === 0 ) return {author: "", likes: 0}
  const authors = map(keyBy(blogs,'author'), (e => e.author))
  const authorMap = zipObject(authors, new Array(authors.length).fill(0))
  
  blogs.forEach(blog => {
    const author = blog.author
    const likes = blog.likes
    authorMap[author] = authorMap[author] + likes
  })

  const authorWithMostBlogs = Object.keys(authorMap).reduce((a, b) => authorMap[a] > authorMap[b] ? a : b);

  return ({
    author: authorWithMostBlogs,
    likes: authorMap[authorWithMostBlogs]
  })
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}