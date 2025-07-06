import {Routes, Route, Link} from 'react-router-dom';

import Register from './pages/register.jsx';
import Login from './pages/login.jsx';
import Home from './pages/home.jsx';

function App () {
  
  const styleNav = {
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '24px',
    backgroundColor: '#f8f9fa', // light gray background
    borderBottom: '1px solid #e0e0e0',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  };

  return (
    <>
    <nav className="nav" style={ styleNav }>
      <Link to="/" className="nav-item">Home</Link>
      <Link to="/register" className="nav-item">Register</Link>
      <Link to="/customer/login" className="nav-item">Login</Link>
		</nav>  

    <div className="container">
      <Routes>
        <Route path='/' element={ <Home />} />
        <Route path='/register' element={ <Register />} />
        <Route path='/customer/login' element={ <Login />} />
      </Routes>
    </div>
    </>
  )
}

export default App;