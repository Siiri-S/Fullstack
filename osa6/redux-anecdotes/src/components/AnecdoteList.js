import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification, clearNotification } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </>
    )
}

        
const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        let list = state.anecdotes.slice().sort( (a,b) => b.votes - a.votes)
        if (state.filter !== "") {
            list = list.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
        }
        return list
    })
    
    return(
        <>
            {anecdotes.map(anecdote =>
                <Anecdote 
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => {
                        const newObject = {...anecdote, votes: anecdote.votes + 1}
                        dispatch(voteAnecdote(newObject, anecdote.id))
                        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
                        setTimeout(() => {
                            dispatch(clearNotification())
                        }, "5000")
                    } }
                />
            )}
        </>
    )
}

export default AnecdoteList