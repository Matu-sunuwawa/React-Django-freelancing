import {useContext} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoute = () => {
    const {auth} = useContext(AuthContext)
    return !auth ? <Navigate to="/login" />: <Outlet />;
}

export default PrivateRoute
