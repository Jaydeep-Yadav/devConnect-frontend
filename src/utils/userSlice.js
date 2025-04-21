import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        addUser: (_, action) => {
            return action.payload; // set state to action.payload
        },
        removeUser: () => {
            return null; // set state to null
        }
    }
})

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;