import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function checkTokenAndNavigate() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);
}

export default checkTokenAndNavigate;
