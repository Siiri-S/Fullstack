import { useState } from "react"

const Blog = ({blog, user, likeBlog, removeBlog}) => {
  const [viewMore, setView] = useState(false)
  const hideWhenVisible = { display: viewMore ? 'none' : '' }
  const showWhenVisible = { display: viewMore ? '' : 'none' }

  return(
    <div className="blog">
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={() => setView(true)}>view</button>
      </div>  
      <div style={showWhenVisible}>
        <p>
          {blog.title} {blog.author}
          <button onClick={() => setView(false)}>hide</button><br/>
          {blog.url}<br/>
          likes {blog.likes}
          <button onClick={likeBlog}>like</button><br/>
          {blog.author}
          {blog.user.username === user.username && <button onClick={removeBlog}>remove</button>
          }
        </p>
      </div>  
    </div>
  )
  
  }



export default Blog