import React from 'react';
const ReportTable = ({ tambonCases }) => {
  const getColorClass = (color) => {
    switch (color) {
      case '1':
        return 'bg-red-400';
      case '2':
        return 'bg-orange-400';
      case '3':
        return 'bg-yellow-400';
      case '4':
        return 'bg-green-400';
      default:
        return 'bg-gray-400';
    }
  };

  const bgth = 'bg-stone-400 text-gray-700 border p-2 sm:w-1/5 md:w-1/6 lg:w-1/7 xl:w-1/8';
  const gbtd = 'border align-text-top';
  const pointStart = '16.615685664722033, 101.91512649190351';

  const openGoogleMap = (destination) => {
    const mapUrl = `https://www.google.com/maps/dir/${pointStart}/${destination}`;
    window.open(mapUrl, '_blank');
  };
  
  return (
    <div className="overflow-x-auto">
       
  {Object.entries(tambonCases).map(([tambon, cases]) => (
    <div key={tambon} className="mb-6">
      <table className="min-w-full">
        <thead>
          <tr>
            <th colSpan="8">
              <div className='flex flex-col sm:flex-row  gap-3 my-3'>
                <h3 className="text-xl font-semibold mb-2 ">{tambon}</h3>
              </div>
            </th>
          </tr>
          <tr>
            <th className={`${bgth}`}>ชื่อ - นามสกุล</th>
            <th className={`${bgth}`}>HN</th>
            <th className={`${bgth}`}>CC</th>
            <th className={`${bgth}`}>เฝ้าระวัง</th>
            <th className={`${bgth}`}>ยา</th>
            <th className={`${bgth}`}>Address</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((item) => (
            <tr key={item.id} className={`${getColorClass(item.color)} `}>
              <td className={`${gbtd}`}>{item.name_ceas}</td>
              <td className={`${gbtd}`}>{item.hn}</td>
              <td className={`${gbtd}`}>{item.ar}</td>
              <td className={`${gbtd}`}>{item.detail}</td>
              <td className={`${gbtd}`}>ยากิน:{item.yakin}<br/>ยาฉีด:{item.yacheed}</td>
              <td
                className={`${gbtd} cursor-pointer`}
                onClick={() => openGoogleMap(item.address)}
              >
                {item.address}
              </td>
            </tr>
          ))}
          {cases.length === 0 && (
            <tr>
              <td colSpan="5" className="px-4 py-2 text-gray-500">
                ไม่มีผู้ป่วย
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  ))}
 
</div>

  );
};

export default ReportTable;
