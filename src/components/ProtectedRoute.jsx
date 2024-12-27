import { Navigate,Outlet } from 'react-router-dom';


const ProtectedRoute = () => {
   const user = localStorage.getItem('user')
   
   
  

 return<>{ !user ? <Navigate to="/" /> : <Outlet />}</>
 

  
};

export default ProtectedRoute;
