import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import signupSlice from "./signupSlice";

const store = configureStore({
    reducer: {
        signup: signupSlice,
        login: loginSlice
    }
})


export default store