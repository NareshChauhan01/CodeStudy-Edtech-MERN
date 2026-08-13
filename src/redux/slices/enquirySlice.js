import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enquiryData: null,
  loading: false
}

const enquirySlice = createSlice({
  name: "enquiry",
  initialState: initialState,

  reducers: {
    setEnquiryData(state, value) {
      state.enquiryData = value.payload
    },

    setLoading(state, value) {
      state.loading = value.payload
    }
  }
})

export const { setEnquiryData, setLoading } = enquirySlice.actions
export default enquirySlice.reducer