import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Componets/login';
import './App.css';
import Register from './Componets/Register';
import Dashboard from './Componets/dashboard';
import Product from './Componets/products';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Componets/figma';
import HomeData from './Componets/figmaWithoutApi';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path ="/register" element={<Register/>} />
        {/* Uncomment and add other routes as needed */}
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Product/>}/>
        <Route path="home" element={<Home />} />
        <Route path="homeDesign" element={< HomeData/>} />
      </Routes>
    </Router>
  );
}

export default App;
