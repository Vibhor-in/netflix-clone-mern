import {createSlice} from "@reduxjs/toolkit";

// Restore user from localStorage on app startup
const loadUser = () => {
    try {
        const data = localStorage.getItem("netflix_user");
        return data ? JSON.parse(data) : null;
    } catch {
        return null;
    }
};

const userSlice = createSlice({
    name:"user",
    initialState:{
        user: loadUser(),
        isLoading:false,
        showSplash:false,
    },
    reducers:{
        // actions
        setUser:(state,action)=>{
            state.user = action.payload;
            // Persist to localStorage (or clear on logout)
            if (action.payload) {
                try {
                    localStorage.setItem("netflix_user", JSON.stringify(action.payload));
                } catch (e) {
                    console.log("localStorage save error:", e);
                }
            } else {
                localStorage.removeItem("netflix_user");
            }
        },
        setLoading:(state,action)=>{
            state.isLoading = action.payload;
        },
        setShowSplash:(state,action)=>{
            state.showSplash = action.payload;
        },
    }
});
export const {setUser,setLoading,setShowSplash} = userSlice.actions;
export default userSlice.reducer;
