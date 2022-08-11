import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          variant="outline-primary"
          onClick={toggleVisibility}
          className="ms-2"
        >
          {props.buttonLabel}
        </Button>{' '}
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          variant="outline-secondary"
          onClick={toggleVisibility}
          className="mt-2"
        >
          Cancel
        </Button>{' '}
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
