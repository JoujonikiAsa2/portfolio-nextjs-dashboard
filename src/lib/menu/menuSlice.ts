import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialMenuStatus = {
    isClicked: boolean;
}

const initialState: initialMenuStatus = {
    isClicked: false,
}

const menuSlice = createSlice({
    name:"menu",
    initialState,
    reducers: {
        setMenu: (state, action: PayloadAction<boolean>) =>{
            state.isClicked = action.payload
        }
    },
})

export const {setMenu} = menuSlice.actions;
export default menuSlice.reducer