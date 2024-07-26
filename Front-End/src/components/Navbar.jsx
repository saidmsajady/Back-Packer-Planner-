import './Components.css';

import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav>
        <Link to={'/'}>Home</Link>
        <Link to={'/Create'}>Create Trip</Link>
        <Link to={'/Countries'}>All Countries</Link>
        <Link to={'/About'}>About</Link>   
    </nav>
  )
}

export default Navbar