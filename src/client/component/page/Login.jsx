import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import checkLoin from '../checkToken/checkLoin';
import axios from 'axios';
const LoginPage = () => {
    checkLoin()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const navigate = useNavigate();
    const login = async (value) => {
        try {
            const res = await axios.post('http://localhost:4000/login', value);
            if (res && res.data) {
                const data = res.data;
                localStorage.setItem('token', data.token);
                alert(data.message);
                navigate('/home');
            } else {
                console.error('Unexpected response from the server:', res);
            }
        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        login(formData);
    };
    return (
        <div className="bg-cover bg-center bg-zinc-300 h-screen flex items-center justify-center">
            <div>
                <form className='bg-white p-8 rounded shadow-md' onSubmit={handleSubmit}>

                    <img className="h-auto w-96" src="\Image\pg2.jpg" alt="image description" />

                    <div className="mb-4">
                        <div className="block text-gray-700 text-sm font-bold mb-2">
                            Username
                        </div>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="email"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Log In
                        </button>
                    </div>
                </form>

            </div>
            <div className='absolute bottom-2 right-5'>
                โรงพยาบาลคอนสาร กลุ่มงานดิจิทัลสุขภาพ<br />
                พัฒนาโดย พงศ์ภัทร์ หลวงพิทักษ์
            </div>
        </div>
    );
};

export default LoginPage;
