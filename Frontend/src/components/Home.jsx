import React, { useEffect, useState } from "react";
import axios from "axios";

const URL = "http://localhost:8080/api/employee";
// const URL = "http://192.168.1.70:8080/api/employee";

const Home = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [employees, setEmployees] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const reset = () => {
    setName("");
    setAge("");
    setEditIndex(null);
  };

  const addEmployee = async (e) => {
    e.preventDefault();
    const obj = { empName: name, empAge: age };

    try {
      if (editIndex !== null) {
        // Update existing employee
        const employeeId = employees[editIndex].empId;
        await axios.put(`${URL}/${employeeId}`, obj);
      } else {
        // Add new employee
        await axios.post(`${URL}/add`, obj);
      }

      // Refresh employee list from backend after add/update
      fetchEmployees();
      reset();
    } catch (error) {
      console.error("Error adding/updating employee", error);
    }
  };

  const editEmployee = (index) => {
    const emp = employees[index];
    setName(emp.empName);
    setAge(emp.empAge);
    setEditIndex(index);
  };

  const deleteEmployee = async (indexToDelete) => {
    try {
      const id = employees[indexToDelete].empId;
      await axios.delete(`${URL}/${id}`);
      fetchEmployees();
      if (editIndex === indexToDelete) {
        reset();
      }
    } catch (error) {
      console.error("Error deleting employee", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(URL);
      console.log(res.data);
      setEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <div className="text-center mt-5 font-bold text-2xl underline">
        Add Employee
      </div>

      <div className="flex">
        <form className="border p-5 m-auto mt-4" onSubmit={addEmployee}>
          <div className="">
            <label>Employee Name </label>
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              type="text"
              placeholder="Enter your name"
              className="border-2 border-gray-300 p-2 outline-none mb-4 w-full"
            />
          </div>
          <div className="">
            <label htmlFor="">Age</label>
            <input
              onChange={(e) => {
                setAge(e.target.value);
              }}
              type="text"
              placeholder="Enter your age"
              name="age"
              value={age}
              className="border-2 border-gray-300 p-2 outline-none mb-4 w-full"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 font-medium bg-black text-white cursor-pointer hover:bg-black/90 transition-all hover:scale-102"
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </form>
      </div>

      <div className="mt-4 m-auto w-full max-w-md text-center">
        <h2 className="font-semibold text-lg underline mb-2">Employees List</h2>
        {employees.length === 0 ? (
          <p className="border border-gray-300 p-2 text-center">
            No employees added yet.
          </p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2 text-center">Name</th>
                <th className="border border-gray-300 p-2 text-center">Age</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{emp.empName}</td>
                  <td className="border border-gray-300 p-2">
                    {emp.empAge} years old
                  </td>
                  <td className="border border-gray-300 p-2 flex gap-1 justify-center items-center">
                    <button
                      className="bg-black text-white px-2 py-1 rounded cursor-pointer hover:scale-102"
                      onClick={() => editEmployee(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer hover:scale-102"
                      onClick={() => deleteEmployee(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Home;
