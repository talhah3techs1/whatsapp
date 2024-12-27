import { Navigate,Outlet } from 'react-router-dom';


const SecureLoginRoute = () => {
   const user = JSON.parse(localStorage.getItem('user'));
   
   
  
if(user){
    return<>{ <Navigate to="/dashboard" /> }</>
}else{
    return <>{<Outlet />}</>
}

 

  
};

export default SecureLoginRoute;
