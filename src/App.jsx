import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import ManageCategory from './Pages/ManageCategory';
import Dashboard from './Pages/Dashboard';
import ManageProduct from './Pages/ManageProduct';
import ManageOrder from './Pages/ManageOrder';
import ViewBill from './Pages/ViewBill';
import ManageUser from './Pages/ManageUser';
import './App.css';
function App() {
  

  return (
    <BrowserRouter>
    <ToastContainer position='bottom-center'/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/managecategory' element={<ManageCategory/>}/>
        <Route path='/manageproduct' element={<ManageProduct/>}/>
        <Route path='/manageorder' element={<ManageOrder/>}/>
        <Route path='/viewbill' element={<ViewBill/>}/>
        <Route path='/manageUser' element={<ManageUser/>}/>
    
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
