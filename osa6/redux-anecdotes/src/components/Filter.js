import { setFilter } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"


const Filter = () => {
  const dispatch = useDispatch()
  
    const handleChange = (event) => {
      const text = event.target.value
      dispatch(setFilter(text))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter