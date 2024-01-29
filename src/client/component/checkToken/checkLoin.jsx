import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
function checkLoin() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    useEffect(() => {
        if (token) {
          navigate("/home");
        }
      }, [token])
}

export default checkLoin