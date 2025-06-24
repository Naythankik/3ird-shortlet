import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    isVerified: false,
};

const userReducer = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setFirstName(state, action) {
            state.firstName = action.payload;
        },
        setLastName(state, action) {
            state.lastName = action.payload;
        },
        setEmail(state, action) {
            state.email = action.payload;
        },
        setIsVerified(state, action) {
            state.isVerified = action.payload;
        },
    },
});

export const {
    setFirstName,
    setLastName,
    setEmail,
    setIsVerified
} = userReducer.actions;

export default userReducer.reducer;
