import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Notification = () => {
  const state = useSelector((state) => state.notification)
  const message = state[0]
  const type = state[1]

  if (type === 'status') {
    return (
      <Alert key="success" variant="success" className="mt-3">
        {message}
      </Alert>
    )
  }
  if (type === 'error') {
    return (
      <Alert key="danger" variant="danger" className="mt-3">
        {message}
      </Alert>
    )
  }
}

export default Notification
