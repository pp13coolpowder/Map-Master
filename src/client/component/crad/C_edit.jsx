import Fi from "../style/Fi";
import { useState } from "react";
import { setAdss } from '../Redux/locationSlice';
import { useDispatch } from "react-redux";
import { updateCeas } from "../axios/api";

export default function C_edit({ show, iname, idetail, iaddress, icolor, ihn, iar, toggleDraggable,yakin, yacheed,id }) {
  const dispatch = useDispatch();
  const instyle = `mb-2 text-xl tracking-tight text-gray-900 rounded-lg border border-gray-900`;
  const [isYaaKinChecked, setIsYaaKinChecked] = useState(false);
  const [isYaaCheedCheckboxChecked, setIsYaaCheedCheckboxChecked] = useState(false);
  const handleYaaKinCheckboxChange = () => {
      setIsYaaKinChecked(!isYaaKinChecked);
  };
  const handleYaaCheedCheckboxChange = () => {
      setIsYaaCheedCheckboxChecked(!isYaaCheedCheckboxChecked);
  };
  const [selectedValue, setSelectedValue] = useState(icolor);
  const ceas = {
    name: iname ?? "",
    detail: idetail,
    address: iaddress ?? "",
    color: selectedValue ?? icolor,
    hn: ihn ?? "",
    ar: iar ?? "",
    yakin:yakin??"",
    yacheed:yacheed??""
  };

  const [update, setUpdate] = useState(ceas);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    setUpdate({ ...update, color: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdate({ ...update, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCeas(id, update)
    try {
      dispatch(setAdss('32'));
      toggleDraggable();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    toggleDraggable();
  };

  return (
    <div className={`${show ? 'hidden' : ''}`}>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          className={instyle}
          name="name"
          value={update.name}
          onChange={handleChange}
        />
        <div className="flex gap-2 mr-auto">
          <div className={`rounded-lg mb-2 text-xl ${Fi(selectedValue)}`}>
            ระดับ:
          </div>
          <select
            className={`${instyle} ${Fi(selectedValue)}`}
            value={selectedValue}
            onChange={handleSelectChange}
          >
            <option value="1" className={`${Fi(1)}`}>
              แดง
            </option>
            <option value="2" className={`${Fi(2)}`}>
              ส้ม
            </option>
            <option value="3" className={`${Fi(3)}`}>
              เหลือง
            </option>
            <option value="4" className={`${Fi(4)}`}>
              เขียว
            </option>
          </select>

        </div>
        <input
          className={`${instyle} ${Fi(selectedValue)}`}
          name="detail"
          value={update.detail}
          onChange={handleChange}
        />
        <input
          className={instyle}
          name="hn"
          value={update.hn}
          onChange={handleChange}
        />
        <input
          className={instyle}
          name="ar"
          value={update.ar}
          onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
                                />
                            )}
                        </ul>
                    </div>
        <div className="flex gap-2 ml-auto">
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
          <button onClick={handleCancel}>
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
