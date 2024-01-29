import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import iconHos from "../iconMap/iconHos"
import geoStyle from "../style/geoStyle"
import C_ceas from "../crad/C_ceas"
import LocationMarker from "../iconMap/LocationMarker"
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setAdss,sethosCeas,setarreaPolygon} from "../Redux/locationSlice";
import { getPolygon, getCeas, getTambon } from '../axios/api';
import TabSearch from "./TabSearch"
const MapHos = () => {
    const dispatch = useDispatch();
    const po = useSelector((state) => state.location.adss)
    const token = useSelector((state) => state.location.tokenAuth)
    const [dataceas, setDataceas] = useState([]);
    function getDataFromServer() {
        getCeas()
            .then((res) =>{
                setDataceas(res.data),
                dispatch(sethosCeas(res.data))
            }
            )
            .catch((err) => {
                console.error(err);
            });
    }
    const [polygon, setPolygon] = useState([])
    function getDataFromServer2() {
        getPolygon()
            .then((res) =>{
                setPolygon(res.data)
                dispatch(setarreaPolygon(res.data))
            }
            )
            .catch((err) => {
                console.error(err);
            });
    }
    const [dataHos, setdataHos] = useState([])
    function getDataFromServerdataHos() {
        getTambon()
            .then((res) =>
                setdataHos(res.data)
            )
            .catch((err) => {
                console.error(err);
            });
    }
    useEffect(() => {
        if (po) {
            getDataFromServer(token)
            dispatch(setAdss(''));
        }
        getDataFromServer()
        getDataFromServer2()
        getDataFromServerdataHos()
    }, [po])
    return (
        <div className=" h-[93vh] p-2 grid grid-cols-5 gap-2 bg-blue-100">
            <div >
                <TabSearch/>
            </div>
            <div className="col-span-4">
            <MapContainer
                    className=" w-full h-full"
                    center={[16.555742710509302, 101.8784096484496]} ////จุดกึ่งกลางแสดงแผนที่
                    zoom={11.5}
                >
                    <TileLayer
                        noWrap={true}
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <GeoJSON key={JSON.stringify(polygon)} style={geoStyle} data={polygon} />

                    {dataHos.map((item, i) => (
                        <div key={i}>
                            <Marker position={item.address.split(',')} icon={iconHos()}>
                                <Popup>
                                    {item.name}
                                </Popup>
                            </Marker>
                        </div>
                    ))}
                    {dataceas.map((item, i) => (
                        <div key={i}>
                            <C_ceas
                                iname={item.name_ceas}
                                icolor={item.color}
                                idetail={item.detail}
                                ihn={item.hn}
                                iar={item.ar}
                                iaddress={item.address}
                                id={item.id}
                                yakin={item.yakin}
                                yacheed={item.yacheed} />
                        </div>
                    ))}
                    <LocationMarker />
                </MapContainer>
            </div >
        </div>
    )
}
export default MapHos