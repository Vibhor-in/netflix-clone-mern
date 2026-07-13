import {createSlice} from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name:"movie",
    initialState:{
        nowPlayingMovies:null,
        popularMovie:null,
        topRatedMovies:null,
        upcomingMovies:null,
        toggle:false,
        trailerMovie:null,
        heroTrailerMovie:null,
        open:false,
        id:"",
        infoOpen:false,
        infoMovie:null,
    },
    reducers:{
        // actions
        getNowPlayingMovies:(state,action)=>{
            state.nowPlayingMovies = action.payload;
        },
        getPopularMovie:(state,action)=>{
            state.popularMovie = action.payload;
        },
        getTopRatedMovie:(state,action)=>{
            state.topRatedMovies = action.payload;
        },
        getUpcomingMovie:(state,action)=>{
            state.upcomingMovies = action.payload;
        },
        setToggle:(state)=>{
            state.toggle = !state.toggle;
        },
        getTrailerMovie:(state,action)=>{
            state.trailerMovie = action.payload;
        },
        setHeroTrailerMovie:(state,action)=>{
            state.heroTrailerMovie = action.payload;
        },
        setOpen:(state,action)=>{
            state.open = action.payload;
        },
        getId:(state,action)=>{
            state.id = action.payload;
        },
        setInfoOpen:(state,action)=>{
            state.infoOpen = action.payload;
        },
        setInfoMovie:(state,action)=>{
            state.infoMovie = action.payload;
        },
    }
});
export const {getNowPlayingMovies, getPopularMovie, getTopRatedMovie, getUpcomingMovie,setToggle,getTrailerMovie,setHeroTrailerMovie,setOpen,getId,setInfoOpen,setInfoMovie} = movieSlice.actions;
export default movieSlice.reducer;