// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SalesPage from './pages/SalesPage';
import Navbar1 from './components/Navbars/Navbar1';

function App() {
  return (
    <div className="App">
      <Navbar1 />
      <SalesPage />
    </div>
  );
}

export default App;
