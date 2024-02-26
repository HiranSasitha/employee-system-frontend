import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [employee, setEmployee] = useState(null);
  useEffect(() => {
    getAllEmployee();
  }, [])
  const getAllEmployee = async () => {
    const response = await axios.get("https://localhost:7087/api/Employee/get-all");
    console.log(response);
    console.log(response.data);
    setEmployee(response.data);
  } 
  const getAllEmployeeByName = async () => {
    const response = await axios.get("https://localhost:7087/api/Employee/get-all-order-name");
    console.log(response);
    console.log(response.data);
    setEmployee(response.data);
  }
  const getAllEmployeeByDepartment = async () => {
    const response = await axios.get("https://localhost:7087/api/Employee/get-all-order-department");
    console.log(response);
    console.log(response.data);
    setEmployee(response.data);
  }

  const filterByName = (event) => {
    if (event.target.value === "Name") {
      setEmployee(null);
      getAllEmployeeByName();
    } else if (event.target.value === "Department") {
      setEmployee(null);
      getAllEmployeeByDepartment();
    } 
    else {
      setEmployee(null);
      getAllEmployee();
    }
  }

  return (
    <>

      <nav class="n1 navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src='/image/logo.png' alt="Logo" width="300" height="100" class="d-inline-block align-text-top" />

          </a>
          <p className='p1 '>Employee-Manage-System</p>
        </div>
      </nav>
      <nav class="navbar navbar-expand-lg bg-body-tertiary mb-5 sticky-top" data-bs-theme="dark">
        <div class="container-fluid">
          <a class="navbar-brand fw-bold" href="#">Solis-Tech</a>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>


          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-3">
              <li class="nav-item">
                <Link class="nav-link" to={"/"} > Home </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to={"/"} > Manage Employee </Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>
      <div className="text-center my-4">
        <h2 className="k1">Employee Details</h2>
      </div>
      <div className="className mb-5 d-flex justify-content-end">
                            <label className="form-label me-3">Filter :</label>
                            <select className="form-select me-5" onChange={filterByName} style={{ width: '200px' }}>
                            <option value="Other">Date</option>
                            <option value="Name">Name</option>
                            <option value="Department">Department</option>
          
        </select>

                        </div>

      <table className="custom-table table table-success table-striped  mb-5 ">
        <thead>
          <tr>
            <th>Fist Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {employee && employee.map((emp) =>
            <tr>
              <td>{emp.firstName}</td>
              <td>{emp.lastName}</td>
              <td>{emp.email}</td>
              <td>
                <div className="mb-3">

                  <select className="form-select" style={{ width: '200px' }}>
                    {emp.departmentEmployees &&
                      emp.departmentEmployees.map((deptEmp) => (
                        <option key={deptEmp.id}>
                          {deptEmp.department.name}
                        </option>
                      ))}
                  </select>

                </div>
              </td>
              <td>
                <button type='button' class="btn btn-outline-primary" >
                  Details
                </button>
              </td>

            </tr>


          )}

        </tbody>
      </table>
      <div className="container-fluid">
                <div className='d2 row'>
                    <div className=' text-center'>
                        <img src='/image/logo.png' alt="Logo" width="200" height="100" class="d-inline-block align-text-top" />
                    </div>
                </div>

      <div className='d3 row'>
                    <div className=' text-center'>
                        <p className='mt-2'>Copyright © 2024 - All Rights Reserved. Concept, Design & Development By Hiran</p>
                    </div>
                </div>
           

                </div>
    </>
  )
}

export default Home;