import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { useLocal } from '../store/auth_context';
const Logout = () => {
    const {LogoutUser} = useLocal();
    useEffect(() => {
        LogoutUser();
    },[LogoutUser]);
    return <Navigate to="/"/>
}

export default Logout