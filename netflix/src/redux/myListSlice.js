import { createSlice } from "@reduxjs/toolkit";

// Helper to load from localStorage
const loadFromStorage = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

// Helper to save to localStorage
const saveToStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.log('localStorage save error:', error);
    }
};

const myListSlice = createSlice({
    name: "myList",
    initialState: {
        myList: loadFromStorage("netflix_myList"),
        continueWatching: loadFromStorage("netflix_continueWatching"),
    },
    reducers: {
        addToMyList: (state, action) => {
            const movie = action.payload;
            const exists = state.myList.find(m => m.id === movie.id);
            if (!exists) {
                state.myList.unshift(movie);
                saveToStorage("netflix_myList", state.myList);
            }
        },
        removeFromMyList: (state, action) => {
            const movieId = action.payload;
            state.myList = state.myList.filter(m => m.id !== movieId);
            saveToStorage("netflix_myList", state.myList);
        },
        addToContinueWatching: (state, action) => {
            const movie = action.payload;
            // Remove if already exists (to move to front)
            state.continueWatching = state.continueWatching.filter(m => m.id !== movie.id);
            // Add to front
            state.continueWatching.unshift(movie);
            // Cap at 20 items
            if (state.continueWatching.length > 20) {
                state.continueWatching = state.continueWatching.slice(0, 20);
            }
            saveToStorage("netflix_continueWatching", state.continueWatching);
        },
    },
});

export const { addToMyList, removeFromMyList, addToContinueWatching } = myListSlice.actions;
export default myListSlice.reducer;
