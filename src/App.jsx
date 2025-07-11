import './App.css'
import { Routes, Route } from "react-router-dom";
import LoginForm from './pages/login';
import Home from './pages/home';
import EmployeeForm from './pages/employee.jsx';
import DashboardForm from './pages/dashboard.jsx';

export default function App() {
 
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path="Home" element={<Home />}>
         <Route path="employee" element={<EmployeeForm />} />
         <Route path="dashboard" element={<DashboardForm/>} />
        </Route>
      </Routes>
    </>
  )
}
