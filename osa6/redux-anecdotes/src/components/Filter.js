import { setFilter } from "../reducers/filterReducer"
import { connect } from "react-redux"


const Filter = (props) => {
  
    const handleChange = (event) => {
      const text = event.target.value
      props.setFilter(text)

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


  
  export default connect(
    null,
    { setFilter }
  )(Filter)