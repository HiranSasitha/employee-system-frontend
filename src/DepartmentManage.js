import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DepartmentManage = () => {
    const [departmentName, setDepartmentName] = useState("");
    const [department, setDepartment] = useState(null);

    useEffect(() => {
        getAllDepartments();


    }, [])

    const handleDepartmentName = (event) => {
        setDepartmentName(event.target.value);
    }
    const handeleAdd = async (event) => {
        event.preventDefault();
        const data = { "name": departmentName };
        const response = await axios.post("https://localhost:7087/api/Department/save", data);
        console.log(response);
        if (response.status === 200) {
            alert("Success Add Department");
            setDepartmentName("");
            window.location.reload();

        }
    }

    const getAllDepartments = async () => {
        const response = await axios.get("https://localhost:7087/api/Department/get-all");
        setDepartment(response.data);
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
                                <Link class="nav-link" to={"/department-manage"} > Department Manage </Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to={"/employee-manage"} > Employee Manage </Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
            <div className="text-center my-4">
                <h2 className="k1">Department Manage</h2>
            </div>
            <div class="card mx-5 mb-5 border border-secondary rounded-3">
                <h5 class="card-header card-header text-center fw-bold bg-secondary text-white">Add Department</h5>
                <div class="card-body">
                    <form onSubmit={handeleAdd}>
                        <label className="form-label">
                            Name
                        </label>
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" onChange={handleDepartmentName} value={departmentName} placeholder="Department Name" required />
                        </div>
                        <button type="submit" className="btn btn-primary">Add</button>
                    </form>
                </div>
            </div>

            <div class="card mx-auto mb-5 w-50 border border-danger rounded-3">
                <div class="card-header text-center fw-bold bg-danger text-white">
                    Departments
                </div>
                <div class="card-body bg-light">
                    <blockquote class="blockquote mb-0">
                        <ul class="list-group">
                            {department && department.map((dep) => (
                                <li class="list-group-item">{dep.name}</li>
                            ))}
                        </ul>
                    </blockquote>
                </div>
            </div>

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

export default DepartmentManage;
