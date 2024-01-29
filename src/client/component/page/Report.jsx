import React, { useState, useEffect, useRef } from 'react';
import Nav from '../element/Nav';
import checkCoordinates from '../function/checkCoordinates';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import ReportTable from '../element/ReportTable';
import { useReactToPrint } from 'react-to-print';
import { getPolygon, getCeas } from '../axios/api';
import checkTokenAndNavigate from "../checkToken/checkTokenAndNavigate"
function Report() {
  checkTokenAndNavigate()
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);
  const [ceas, setceas] = useState([]);
  const [polygon, setPolygon] = useState([]);
  useEffect(() => {
    getDataFromServerceas();
    getDataFromServer2();
  }, []);

  const getDataFromServerceas = () => {
    getCeas()
      .then((res) => setceas(res.data))
      .catch((err) => console.error(err));
  };

  const getDataFromServer2 = () => {
    getPolygon()
      .then((res) => setPolygon(res.data))
      .catch((err) => console.error(err));
  };

  ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const coordinatesData = polygon;
  const ceasData = ceas;

  const processed = ceasData.map((item) => {
    const Address = item.address;
    const initialPosition = Address.split(',').map((coord) => parseFloat(coord));
    const targetLatitude = initialPosition[0];
    const targetLongitude = initialPosition[1];
    const tambon = checkCoordinates(coordinatesData, targetLatitude, targetLongitude);
    return {
      id: item.id,
      name_ceas: item.name_ceas,
      detail: item.detail,
      address: item.address,
      color: item.color,
      hn: item.hn,
      ar: item.ar,
      yakin: item.yakin,
      yacheed: item.yacheed,
      tambon,
    };
  });

  const tambonsToSearch = ['คอนสาร', 'ทุ่งพระ', 'โนนคูณ', 'ห้วยยาง', 'ทุ่งลุยลาย', 'ดงบัง', 'ทุ่งนาเลา', 'ดงกลาง'];
  const incidentsByTambon02 = {};
  tambonsToSearch.forEach((tambon) => {
    incidentsByTambon02[tambon] = 0;
  });
  processed.forEach((item) => {
    const tambon = item.tambon;
    incidentsByTambon02[tambon] = (incidentsByTambon02[tambon] || 0) + 1;
  });

  const tambon02values = Object.values(incidentsByTambon02);

  const incidentsByColor = {
    color1: {},
    color2: {},
    color3: {},
    color4: {},
    color5: {},
  };

  tambonsToSearch.forEach((tambon) => {
    for (const color in incidentsByColor) {
      incidentsByColor[color][tambon] = 0;
    }
  });

  processed.forEach((item) => {
    const tambon = item.tambon;
    const color = item.color;
    if (color >= 1 && color <= 5) {
      incidentsByColor[`color${color}`][tambon]++;
    }
  });

  const result = [];
  for (const color in incidentsByColor) {
    result[color] = tambonsToSearch.map((tambon) => incidentsByColor[color][tambon]);
  }

  const tb = Object.values(result);

  const data01 = {
    labels: tambonsToSearch,
    datasets: [
      {
        label: 'จำนวนผู้ป่วย',
        data: tambon02values,
        backgroundColor: [
          'rgba(255, 0, 0,0.8)',
          ' rgba(0, 0, 255,0.8)',
          'rgba(60, 179, 113,0.8)',
          'rgba(238, 130, 238,0.8)',
          ' rgba(255, 165, 0,0.8)',
          'rgba(106, 90, 205,0.8)',
          'rgba(60, 60, 60,0.8)',
          'rgba(255, 99, 71, 0.8)',
        ],
        borderColor: ['rgb(240, 240, 240)'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'ระดับผู้ป่วยของแต่ล่ะตำบล',
      },
    },
  };

  const data2 = {
    labels: tambonsToSearch,
    datasets: [
      {
        label: 'ระดับ แดง',
        data: tb[0],
        backgroundColor: 'rgba(255, 0, 0)',
      },
      {
        label: 'ระดับ ส้ม',
        data: tb[1],
        backgroundColor: 'rgba(255, 165, 0)',
      },
      {
        label: 'ระดับ เหลือง',
        data: tb[2],
        backgroundColor: 'rgba( 255, 255, 0,0.8)',
      },
      {
        label: 'ระดับ เขียว',
        data: tb[3],
        backgroundColor: 'rgba(0, 128, 0, 1 )',
      }
    ],
  };

  const tambonCases = {};
  tambonsToSearch.forEach((tambon) => {
    tambonCases[tambon] = [];
  });
  processed.forEach((item) => {
    const tambon = item.tambon;
    if (tambonCases[tambon]) {
      tambonCases[tambon].push({
        id: item.id,
        name_ceas: item.name_ceas,
        detail: item.detail,
        address: item.address,
        color: item.color,
        hn: item.hn,
        ar: item.ar,
        yakin: item.yakin,
        yacheed: item.yacheed,
      });
    } else {
      tambonCases[tambon] = [{
        id: item.id,
        name_ceas: item.name_ceas,
        detail: item.detail,
        address: item.address,
        color: item.color,
        hn: item.hn,
        ar: item.ar,
        yakin: item.yakin,
        yacheed: item.yacheed,
      }];
    }
    
  });

  const componentPFD = useRef();
  const printPDF = useReactToPrint({
    content: () => componentPFD.current,
    documentTitle: 'Report',
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <div className="flex justify-between">
        <div>
        </div>
        <button className='p-5 flex' onClick={printPDF}>
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 20h10a1 1 0 0 0 1-1v-5H4v5a1 1 0 0 0 1 1Z" />
            <path d="M18 7H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-1-2V2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3h14Z" />
          </svg>
        </button>
      </div>
      <div ref={componentPFD} className="max-w-5xl mx-auto p-8 print-content">
        <h2 className="text-3xl font-bold mb-8">Report</h2>

        <p className="text-sm text-gray-500 mb-4">
          {currentDateTime.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })} {currentDateTime.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          โรงพยาบาลคอนสาร กลุ่มงานดิจิทัลสุขภาพ พัฒนาโดย พงศ์ภัทร์ หลวงพิทักษ์
        </p>

        <div className="mb-8">
          <ul className="flex flex-wrap gap-2">
            {tambonsToSearch.map((tambon) => (
              <li key={tambon} className="text-lg whitespace-nowrap overflow-hidden break-words">
                {tambon}: {incidentsByTambon02[tambon] === 0 ? 'ไม่มี' : `${incidentsByTambon02[tambon]} คน`}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-1 gap-8 items-center">
          <div className="h-80">
            <Pie data={data01} />
          </div>
          <div className="h-80">
            <Bar options={options} data={data2} />
          </div>
        </div>
        <ReportTable tambonCases={tambonCases} />
      </div>
    </div>
  );
}

export default Report;
