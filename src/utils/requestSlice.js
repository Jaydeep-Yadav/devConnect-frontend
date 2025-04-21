import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "request",
    initialState: null,
    reducers: {
        addRequest: (_, action) => {
            return action.payload;
        },
        removeRequest: (state, action) => {
            const newArray = state.filter((req) => req._id !== action.payload);
            return newArray;
        }
    }
})

export const { addRequest, removeRequest } = requestSlice.actions;

export default requestSlice.reducer;