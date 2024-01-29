// locationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    additionalInput: '',
    adss: '',
    tokenAuth:'',
    hosCeas:[],
    adssCeas: '',
    arreaPolygon:[]
  },
  reducers: {
    setAdditionalInput: (state, action) => {
      state.additionalInput = action.payload;
    },
    setAdss: (state, action) => {
      state.adss = action.payload;
    },
    setTokenAuth: (state, action) => {
      state.tokenAuth = action.payload;
    },
    sethosCeas: (state, action) => {
      state.hosCeas = action.payload;
    },
    setadssCeas: (state, action) => {
      state.adssCeas = action.payload;
    },
    setarreaPolygon: (state, action) => {
      state.arreaPolygon = action.payload;
    }
  },
});

export const { setAdditionalInput, setAdss,setTokenAuth,sethosCeas,setadssCeas,setarreaPolygon } = locationSlice.actions;
export default locationSlice.reducer;
