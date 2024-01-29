import { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAdditionalInput, setAdss } from '../Redux/locationSlice';
import { useNavigate } from 'react-router-dom'
import checkCoordinates from "../function/checkCoordinates";
function Nav() {
    const arreaPolygon = useSelector((state) => state.location.arreaPolygon);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [box, setBox] = useState('')
    const coordinatesRegex = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/;
    const Address = box;
    const initialPosition = Address.split(',').map((coord) => parseFloat(coord));
    const targetLatitude = initialPosition[0];
    const targetLongitude = initialPosition[1];
    const handleAdditionalInputChange = (e) => {
        const inputValue = e.target.value;
        setBox(inputValue)
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (coordinatesRegex.test(box)) {
            const tambon = checkCoordinates(arreaPolygon, targetLatitude, targetLongitude);
            if (tambon !== 'ไม่พบข้อมูล') {
                dispatch(setAdditionalInput(box));
                dispatch(setAdss('5'));
                setBox('');
            } else {
                alert('ข้อมูลไม่ในเขตอำเภอคอนสาร');
                setBox('');
            }
        } else {
            alert('ข้อมูลไม่ถูกต้อง');
            setBox('');
        }
    };
    
    const location = useLocation();
    const logout = (e) => {
        e.preventDefault();
        localStorage.clear()
        navigate("/")
    }
    return (
        <div className="grid grid-cols-4 gap-4 items-center px-4 h-[7vh] bg-indigo-200">
            <div className="flex gap-5">
                <Link to="/home" className={`text-blue-700 ${location.pathname === '/home' ? 'underline' : ''}`}>
                    Home
                </Link>
                <Link to="/report" className={`text-blue-700 ${location.pathname === '/report' ? 'underline' : ''}`}>
                    Report
                </Link>
            </div>
            <div className="col-span-2">
                <div className={` ${location.pathname !== '/home' ? 'hidden' : ''}`}>
                    <form onSubmit={handleSubmit}>
                        <div className="relative flex items-center">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={box}
                                onChange={handleAdditionalInputChange}
                                placeholder="ตำแหน่ง GPS"
                                className="block w-5/6 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                            />
                            <button
                                type="submit"
                                className="text-white bg-blue-700 font-medium rounded-lg text-sm p-2 ml-2"
                            >
                                เพิ่มตำแหน่ง
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="text-right">
                <button onClick={logout} className=" w-14 text-blue-700">Logout</button>
            </div>
        </div>
    );
}
export default Nav;