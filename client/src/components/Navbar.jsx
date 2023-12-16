import React, { useEffect ,useState} from 'react'
import { Link } from 'react-router-dom'
import '../css/navbar.css'
import { useLocal } from '../store/auth_context'
export default function Navbar() {
  const {isLoggedIn} = useLocal();
  const [search, setSearch] = useState('');
  
  const handleSearch = () => {
    // Add your login logic here
    console.log('You Searched:', search);
  };
  return (
    <>
    <div id='navbar'>
    <input type='checkbox' id='toggler' />
    <label htmlFor='toggler' id='tog'>
    <div id='menu'>toggler</div>
    <div id='close'>close</div>
    </label>

    <div id='navmenu'>
    <div className='search-form'>
        <form>
        
            <input
              type="text" placeholder='SEARCH'
        
              onChange={(e) => setSearch(e.target.value)}
              className="input-field"
              />
       
          </form>
          <button type="button" onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>
        <div>
          <Link to="/home">Home</Link>
        </div>

          {!isLoggedIn? <>
          <div>
          <Link to="/">Login</Link>
        </div>
          <div>
          <Link to="/signup">Sign up</Link>
          </div></>
        : <div>
        <Link to="/Logout">Logout</Link>
        </div>}

        
        <div>
        <Link to="/profile">Kuch bhi</Link>
        </div>
       
    </div>

    </div>
    </>
  )
}
