import logo from './logo.svg';
import './App.css';
import OpenlayerIndia from './india/openlayerIndia';
import SimpleReactMapIndia from './india/simpleReactMapIndia';
import Navbar from './componets/navbar';
import { Route, Router, Routes } from 'react-router-dom';


function App() {
  return (
    <Routes>
      <Route path='/' element={<OpenlayerIndia/>}/>
      <Route path='/openlayer/india' element={<OpenlayerIndia/>}/>
      <Route path='/simple-react-map/india' element={<SimpleReactMapIndia/>}/>
    </Routes>
  );
}

export default App;
