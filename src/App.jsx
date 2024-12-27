
import Sidebar from './components/Sidebar';
import Register from './components/Register'
import Devices from './components/Devices'
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Chats from "./components/Chats"
import SecureLoginRoute from './components/SecureLoginRoute';
import './App.css';



const App = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  



  return (
    <div className="app">
     
      <Router>

        {user && <Sidebar />}
       
        <main className="main-content">  
    <Routes>

    <Route element={<SecureLoginRoute />}> 
      <Route path='/' element={<Login />}/>
    </Route>

        <Route element={<ProtectedRoute />}>
          <Route path='/devices'  element={<Devices />}/>
          <Route path='/dashboard'  element={<Dashboard />}/>
          <Route path='/chats'  element={<Chats />}/>
          <Route path='/register'  element={<Register />}/>
        </Route>
    </Routes>
    </main>
  </Router>

      
      
    </div>
  );
};

export default App;

