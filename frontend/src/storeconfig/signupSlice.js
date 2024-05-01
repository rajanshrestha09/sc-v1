import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: 'signup',
    initialState,
    reducers:{
        signupStart(state){
            state.loading = true;
            state.error = null;
        },
        signupSuccess(state, action){
            state.loading = false;
            state.user = action.payload;
        },
        signupFailure(state, action){
            state.loading = false;
            state.error = action.payload;
            console.log(state.error);
        }
    }
})

export const {signupStart, signupSuccess, signupFailure} = authSlice.actions
export default authSlice.reducer