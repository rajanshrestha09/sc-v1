import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    status: false,
    user: null,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginStart(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.status = true
            state.user = action.payload;
        },
        loginFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.status = false
        },
        logout(state) {
            state.loading = false;
            state.error = null;
            state.status = false;
            state.user = null
        }

    }
})


export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;