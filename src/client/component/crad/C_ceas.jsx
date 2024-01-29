import C_data from "./C_data";
import C_edit from "./C_edit";
import iconMarker from "../iconMap/iconMarker";
import { useState, useCallback, useRef, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import { useSelector, useDispatch } from 'react-redux';
import { setadssCeas } from "../Redux/locationSlice";
function C_ceas({ iname, icolor, idetail, ihn, iar, iaddress, id, yakin, yacheed }) {
  const initialPosition = iaddress.split(",").map((coord) => parseFloat(coord));
  const [showData, setShowData] = useState(true);
  const toggleComponent = useCallback(() => {
    setShowData((prevShowData) => !prevShowData);
  }, []);
  const popupElRef = useRef(null);

  const dispatch = useDispatch();
  const adssCeas = useSelector((state) => state.location.adssCeas)
  const markerRef = useRef(null)

  const hideElement = () => {
    if (!popupElRef.current) {
      popupElRef.current.close();
    }
  }
  const onShowMarker = () => {
    const marker = markerRef.current
    if (marker) {
      marker.openPopup()
    }
  }
  useEffect(() => {
    if (adssCeas === iaddress) {
      onShowMarker();
      dispatch(setadssCeas(''));
    }
  }, [adssCeas, iaddress]);


  return (
    <Marker
      ref={markerRef}
      position={initialPosition}
      icon={iconMarker(icolor)}
    >
      <Popup
        ref={popupElRef}
        closeButton={false}
      >
        <C_data
          show={showData}
          iname={iname}
          icolor={icolor}
          idetail={idetail}
          iaddress={iaddress}
          ihn={ihn}
          iar={iar}
          toggleDraggable={toggleComponent}
          id={id}
          hideElement={hideElement}
          yakin={yakin}
          yacheed={yacheed}
        />
        <C_edit
          show={showData && ('hidden')}
          iname={iname}
          idetail={idetail}
          iaddress={iaddress}
          icolor={icolor}
          ihn={ihn}
          iar={iar}
          id={id}
          toggleDraggable={toggleComponent}
          yakin={yakin}
          yacheed={yacheed} />
      </Popup>
    </Marker>
  );
}
export default C_ceas;