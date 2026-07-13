import Body from "./components/Body";
import { Toaster } from 'react-hot-toast'; 
import MovieDialog from "./components/MovieDialog";
import MovieInfoModal from "./components/MovieInfoModal";
 
function App() {
  return (
    <div>
       <Body/>
       <Toaster/>  
       <MovieDialog/>
       <MovieInfoModal/>
    </div>
  );
}

export default App;
