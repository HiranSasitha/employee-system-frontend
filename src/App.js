import logo from './logo.svg';
import './App.scss';
import "/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import DepartmentManage from './DepartmentManage';
import EmployeeManage from './EmployeeManage';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route index element ={<Home/>}/>
      <Route path='/department-manage' element ={<DepartmentManage/>}/>
      <Route path='/employee-manage' element ={<EmployeeManage/>}/>
     </Routes>
     
     
     </BrowserRouter>


    </div>
  );
}

export default App;
