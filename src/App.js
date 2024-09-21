// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import CustomRoutes from './customRoutes/CustomRoutes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <CustomRoutes />
      <ToastContainer />
    </div>
  );
}

export default App;
