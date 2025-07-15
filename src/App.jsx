import './App.css'
import { Routes, Route } from "react-router-dom";
import LoginForm from './pages/login';
import Home from './pages/home';
import EmployeeForm from './pages/employee.jsx';
import DashboardForm from './pages/dashboard.jsx';
import ProtectedRoute from './components/protectedRoute.jsx';
import Unauthorized from './components/utils/unauthorized.jsx';

export default function App() {
 
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path="/unauthorized" element={<Unauthorized/>}/>
        <Route path="Home" element={
          <ProtectedRoute><Home />
          </ProtectedRoute>}>
          
         <Route path="employee" element={
          <ProtectedRoute allowedRoles={["hr", "manager", "admin"]}>
          <EmployeeForm />
          </ProtectedRoute>}/>
         <Route path="dashboard" element={<DashboardForm/>} />
        </Route>
      </Routes>
    </>
  )
}
