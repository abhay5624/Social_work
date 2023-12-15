import './App.css';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import Homepage from './Pages/Homepage.js';
import Signup from './Pages/Signup.js';
import LoginForm from './Pages/Loginform.js';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

function App() {
  return (
  <>
  <BrowserRouter>
  <Navbar />
    <Routes>
    <Route path='/' element={<Homepage />}/>
    <Route path='/register' element={<Signup />}/>
    <Route path='/login' element={<LoginForm />}/>
    </Routes>
    <Footer />
  </BrowserRouter>
  </>
  );
}

export default App;