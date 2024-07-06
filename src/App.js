import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Componets/login';
import './App.css';
import Register from './Componets/Register';
import Dashboard from './Componets/dashboard';

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
      </Routes>
    </Router>
  );
}

export default App;
