import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { LoginContext } from '../App';

const ProtectedRoute = ({ children }) => {
    const { isLogin } = useContext(LoginContext);
    
    if (!isLogin) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
};

export default ProtectedRoute;