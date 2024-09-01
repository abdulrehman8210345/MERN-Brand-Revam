import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedUserType }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("authToken");
    const userType = localStorage.getItem("userType");

    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else if (userType !== allowedUserType) {
            navigate("/login");
        } else {
            setLoading(false);
        }
    }, [navigate, token, userType, allowedUserType]);

    if (loading) {
        return <div>Loading...</div>; 
    }

    return children;
};

export default ProtectedRoute;
