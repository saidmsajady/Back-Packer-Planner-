import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav>
        <Link to={'/'}>Home Page</Link>
        <Link to={'/Create'}>Create Trip Page</Link>
        <Link to={'/Countries'}>All Countries Page</Link>
        <Link to={'/About'}>About Page</Link>
    </nav>
  )
}

export default Navbar