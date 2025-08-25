import { useEffect, useState } from "react";
import Button from "../components/employees/button";
import { FaPlus } from "react-icons/fa";
import SearchSelect from "../components/employees/selectSearch";
import EmployeeCard from "../components/employees/employeecard";
import EmployeeForm from "../components/employees/employeeform";
import axios from "axios";

export default function Employee() {
  const [modelform, setModelForm] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);


  const fetchEmployees = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:8000/employee", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setEmployees(res?.data.data);
      }
      
    } catch (err) {
      console.error("Failed to fetch employees", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (_id) => {
    const confirmDelete = window.confirm("Do you want to delete the employee?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8000/employee/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Fixed typo from "Authorizaton"
        },
      });

      setEmployees((prev) => prev.filter((emp) => emp._id !== _id));
      alert("Employee deleted successfully!");
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Something went wrong while deleting.");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center pl-2 pr-2 text-gray-500">
        <div className="flex flex-col gap-1">
          <h3 className="text-black text-md">Employee Management</h3>
          <p className="text-black text-xs">Manage your organization employees</p>
        </div>

        <Button
          onClick={() => {
            setModelForm(true);
            setEditEmployee(null);
          }}
          icon={<FaPlus />}
          type="button"
        >
          Add Employee
        </Button>
      </div>

      <SearchSelect />
      <EmployeeCard
        employees={employees}
        setEditEmployee={setEditEmployee}
        setModelForm={setModelForm}
        handleDelete={handleDelete}
      />

      {modelform && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="rounded-md bg-white shadow-xl w-full max-w-md relative p-4">
            <Button
              onClick={() => setModelForm(false)}
              className="absolute top-2 right-2 text-xs bg-black px-2 py-1 text-white rounded"
            >
              ✕
            </Button>
            <EmployeeForm
              setEmployees={setEmployees}
              setModelForm={setModelForm}
              editEmployee={editEmployee}
              setEditEmployee={setEditEmployee}
            />
          </div>
        </div>
      )}
    </>
  );
}
