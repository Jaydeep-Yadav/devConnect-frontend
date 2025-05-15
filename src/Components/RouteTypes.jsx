import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


export const RedirectAuthenticatedUser = ({ children }) => {
  const user = useSelector((state) => state.user);

  if(user?.isVerified == false){
    return <Navigate to='/verify'/>;
  }

  if (user) {
    return <Navigate to='/feed' />;
  }

  return children;
};

export const PublicRoutes= ({ children }) => {

  return children;
};
