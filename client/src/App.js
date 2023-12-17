import './App.css';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Homepage from './Pages/Homepage.jsx';
import Signup from './Pages/Signup.jsx';
import LoginForm from './Pages/Loginform.jsx';
import Logout from './Pages/Logout.jsx';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Profile from './Pages/Profile.jsx';
import UpdateProfile from './Pages/UpdateProfile.jsx';

function App() {
  return (
  <>
  <BrowserRouter>
  <Navbar />
    <Routes>
    <Route path='/Home' element={<Homepage />}/>
    <Route path='/signup' element={<Signup />}/>
    <Route path='/' element={<LoginForm />}/>
    <Route path="/logout" element={<Logout/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path = "updateProfile" element={<UpdateProfile/>} />
    </Routes>
    <Footer />
  </BrowserRouter>
  </>
  );
}

export default App;