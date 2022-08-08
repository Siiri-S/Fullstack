import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useField } from "../hooks"

const CreateNew = (props) => {
    const navigate = useNavigate()
    
    const contentInit = useField('text')
    const authorInit = useField('text')
    const infoInit = useField('text')

    const {reset: contentReset, ...content} = contentInit
    const {reset: authorReset, ...author} = authorInit
    const {reset: infoReset, ...info} = infoInit


  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      navigate('/')
    }

    const resetFields = () => {
        contentReset()
        authorReset()
        infoReset()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit} >
            content
            <input {...content }/>
            <br/> 
            author
            <input {...author} />
            <br/> 
            url for more info
            <input {...info} />
            <br/> 
          <button>create</button>
          <button type='button' onClick={resetFields} >reset</button>
        </form>
        
      </div>
    )
  
  }


  export default CreateNew