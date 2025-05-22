import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialTheme = {
    theme: string;
}

const initialState: initialTheme = {
    theme: 'dark',
}

const themeSlice = createSlice({
    name:"theme",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<string>) =>{
            state.theme = action.payload
        }
    },
})

export const {setTheme} = themeSlice.actions;
export default themeSlice.reducer