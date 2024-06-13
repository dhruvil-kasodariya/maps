import logo from './logo.svg';
import './App.css';
import OpenlayerIndia from './india/openlayerIndia';
import SimpleReactMapIndia from './india/simpleReactMapIndia';

function App() {
  return (
    <div className="App">
     {/* <OpenlayerIndia /> */}
     <SimpleReactMapIndia/>
    </div>
  );
}

export default App;
