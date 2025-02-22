import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { notificationSlice } from "../notification/notificationSlice";

interface SnackbarState {
    open: boolean;
    message: string;
}

const initialState: SnackbarState = {
    open: false,
    message: ''
}

export const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        showSnackbar: (state, action: PayloadAction<string>) => {
            state.open = true;
            state.message = action.payload;
        },
        hideSnackbar: (state) => {
            state.open = false;
        }
    }
})

export const {showSnackbar, hideSnackbar} = snackbarSlice.actions;
export default notificationSlice.reducer;