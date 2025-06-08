import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    description: '',
    apartments: [],
};

const wishlistReducer = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        setName(state, action) {
            state.name = action.payload;
        },
        setDescription(state, action) {
            state.description = action.payload;
        },
        setApartments(state, action) {
            state.apartments = action.payload;
        }
    },
});

export const {
    setName,
    setDescription,
    setApartments,
} = wishlistReducer.actions;

export default wishlistReducer.reducer;
