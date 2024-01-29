import React, { useState } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import iconCeas from '../iconMap/iconCeas';
import { setadssCeas } from '../Redux/locationSlice';
function TabSearch() {
  const Ceas = useSelector((state) => state.location.hosCeas);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const handleItemClick = (address) => {
    dispatch(setadssCeas(address))
  };
  return (
    <div>
      <div className="w-full bg-white shadow-md">
        <div className="flex items-center p-2">
          <input
            type="text"
            placeholder="ค้นหา..."
            className="flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="ml-4 bg-blue-500 p-2 text-white rounded">ค้นหา</button>
        </div>
      </div>
      <div className="p-2 bg-white mt-2 h-[83vh] overflow-auto shadow-md">
          {Ceas.filter((item) =>
            item.name_ceas.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((filteredItem, i) => (
            <div
              className="flex gap-2 py-1 cursor-pointer"
              key={i}
              onClick={() => handleItemClick(filteredItem.address)}
            >
              {iconCeas(filteredItem.color)}
              {filteredItem.name_ceas}
            </div>
          ))}
        </div>
    </div>
  );
}

export default TabSearch;
