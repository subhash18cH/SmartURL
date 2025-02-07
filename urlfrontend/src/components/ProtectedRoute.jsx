import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("JWT")
  if (!token) {
    return <Navigate to={"/signin"} />
  }
  return children
}
export default ProtectedRoute