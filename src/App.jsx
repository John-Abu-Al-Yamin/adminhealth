import "./App.css";
import AppRoute from "./routes/AppRoute";
import { ToastContainer } from 'react-toastify';


function App() {
  
  return (
    <div className="dark text-light-200 bg-dark-300">
      <ToastContainer />
      <AppRoute />
    </div>
  );
}

export default App;

