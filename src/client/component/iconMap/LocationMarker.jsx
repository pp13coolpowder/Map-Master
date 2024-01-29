import { useState, useEffect, useRef } from "react"
import { Marker, Popup, useMap } from "react-leaflet"
import Fi from "../style/Fi"
import { useSelector, useDispatch } from 'react-redux';
import { setAdss } from "../Redux/locationSlice";
import { inputCeas, getCeas } from "../axios/api";
export default function LocationMarker() {
    const point = [16.555742710509302, 101.8784096484496];
    const zoom = 12
    const dispatch = useDispatch();
    const additionalInput = useSelector((state) => state.location.additionalInput);
    const po = useSelector((state) => state.location.adss)
    const [notInput, setNotInput] = useState('')
    const adss = additionalInput
    const A = adss.split(",").map((coord) => parseFloat(coord))
    const [position, setPosition] = useState(null)
    const map = useMap()
    const [isYaaKinChecked, setIsYaaKinChecked] = useState(false);
    const [isYaaCheedCheckboxChecked, setIsYaaCheedCheckboxChecked] = useState(false);
    const handleYaaKinCheckboxChange = () => {
        setIsYaaKinChecked(!isYaaKinChecked);
    };
    const handleYaaCheedCheckboxChange = () => {
        setIsYaaCheedCheckboxChecked(!isYaaCheedCheckboxChecked);
    };
    const instyle = "mb-2 text-xl  tracking-tight  text-gray-900 rounded-lg border border-gray-900";
    const [selectedValue, setSelectedValue] = useState()
    const ceas = {
        "name": "",
        "detail": "",
        "address": additionalInput,
        "color": '1' || '',
        "hn": "",
        "ar": "",
        "yakin": "",
        "yacheed": ""
    };
    const [update, setupdate] = useState(ceas)
    const can =()=>{
        setPosition(null);
        map.flyTo(point,zoom);
    }
    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value)
        setupdate((prevUpdate) => ({
            ...prevUpdate,
            color: event.target.value
        }));
    }
    const handlechang = (e) => {
        const { name, value } = e.target;
        setupdate((prevUpdate) => ({
            ...prevUpdate,
            [name]: value,
            address: name === 'address' ? '' : prevUpdate.address
        }));
    };
    const handlesubmit = async (e) => {
        e.preventDefault();
        if (!update.name || !update.hn || !update.ar || !update.detail) {
            setNotInput('1')
            return;
        }
        try {
            dispatch(setAdss('5'));
            await inputCeas(update);
            can();
            const latestCeasData = await getCeas();
            setupdate(latestCeasData);
            setNotInput('')
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };
    useEffect(() => {
        if (po) {
            if (po === '32') {
                dispatch(setAdss('5'));
            }
            else {
                if (additionalInput) {
                    setPosition(A)
                    map.flyTo(A, 18)
                    setupdate(ceas)
                    dispatch(setAdss(''));
                }
            }
        }
    }, [po, additionalInput])
    const borderInput = `${(notInput === '1') ? 'border-red-500' : ''} ${instyle}`
    
    return position === null ? null : (
        <Marker position={position}>
            <Popup>
                <form onSubmit={handlesubmit} className=" bg-white flex flex-col p-2">
                    <input
                        className={borderInput}
                        name="name"
                        value={update.name}
                        onChange={handlechang}
                        placeholder="ชื่อ"
                    />
                    <input
                        className={borderInput}
                        name="hn"
                        value={update.hn}
                        onChange={handlechang}
                        placeholder="เลข HN"
                    />
                    <div className="flex gap-2">
                        <div className={`rounded-lg mb-2 px-3 text-xl ${Fi(selectedValue)}`}>
                            ระดับ:
                        </div>
                        <select
                            className={`${instyle} ${Fi(selectedValue)}`}
                            value={selectedValue}
                            defaultValue={5}
                            onChange={handleSelectChange}
                        >
                            <option className={`${Fi(1)}`} value="1">
                                แดง
                            </option>
                            <option className={`${Fi(2)}`} value="2">
                                ส้ม
                            </option>
                            <option className={`${Fi(3)}`} value="3">
                                เหลือง
                            </option>
                            <option className={`${Fi(4)}`} value="4">
                                เขียว
                            </option>
                        </select>
                    </div>
                    <input
                        className={borderInput}
                        name="ar"
                        value={update.ar}
                        onChange={handlechang}
                        placeholder="อาการ"
                    />
                    <input
                        className={borderInput}
                        name="detail"
                        value={update.detail}
                        onChange={handlechang}
                        placeholder="เฝ้าระวัง"
                    />
                    <div>
                        <h1 className="text-xl">ยา</h1>
                        <ul className="text-sm">
                            <div className="flex items-center">
                                <input
                                    id="vue-checkbox"
                                    type="checkbox"
                                    value=""
                                    className="w-4 h-4 text-blue-600"
                                    checked={isYaaKinChecked}
                                    onChange={handleYaaKinCheckboxChange}
                                />
                                <label
                                    htmlFor="vue-checkbox"
                                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
                                >
                                    ยากิน
                                </label>
                            </div>
                            {isYaaKinChecked && (
                                <input
                                    className={instyle}
                                    placeholder="ชื่อยาใช้กิน"
                                    name="yakin"
                                    value={update.yakin}
                                    onChange={handlechang}
                                />
                            )}
                            <div className="flex items-center">
                                <input
                                    id="react-checkbox"
                                    type="checkbox"
                                    value=""
                                    className="w-4 h-4 text-blue-600"
                                    checked={isYaaCheedCheckboxChecked}
                                    onChange={handleYaaCheedCheckboxChange}
                                />
                                <label
                                    htmlFor="react-checkbox"
                                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
                                >
                                    ยาฉีด
                                </label>
                            </div>
                            {isYaaCheedCheckboxChecked && (
                                <input
                                    className={instyle}
                                    placeholder="ชื่อยาใช้ฉีด"
                                    name="yacheed"
                                    value={update.yacheed}
                                    onChange={handlechang}
                                />
                            )}
                        </ul>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button onClick={()=> can()}>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>
                        <button type="submit">
                            <svg
                                className="w-6 h-6 text-gray-800 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.994 19a8.999 8.999 0 1 1 3.53-17.281M5.995 9l4 4 7-8m-1 8v5m-2.5-2.5h5" />
                            </svg>
                        </button>
                    </div>
                </form>
            </Popup>
        </Marker>
    )
}
