import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmployeeById = ()=>{
    const { id } = useParams();
    const [department, setDepartment] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [departmentId, setDepartmentId] = useState([]);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
    const [emailError, setEmailError] = useState("");
    const [birthdayError, setBirthdayError] = useState("");
    const [employeeById,setEmployeeById] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        
        getEmployeeById();
        getAllDepartments();


    }, [])
    useEffect(() => {
        setInput();
    }, [employeeById]);
    const hadleFirstName = (event) => {
        setFirstName(event.target.value);
    }
    const hadleLastName = (event) => {
        setLastName(event.target.value);
    }
    const hadleAddress = (event) => {
        setAddress(event.target.value);
    }
    const hadleMobile = (event) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) {         //hadle int value only
            setMobile(value);
        }
        
    }
    const hadleEmail = (event) => {
        setEmail(event.target.value);
    }
    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address");
        }
    }
    const hadleBirthday = (event) => {
        const { value } = event.target;
        setBirthday(value);
        setBirthdayError(""); 
    };
    const validateBirthday = () => {
        const birthdayRegex = /^(0?[1-9]|[12]\d|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/; // Day/Month/Year format
        if (!birthdayRegex.test(birthday)) {
            setBirthdayError("Please enter a valid birthday in the format dd/mm/yyyy.");
        }
    };
        
    
    const handleDepartmentId = () => {
        if (!departmentId.includes(selectedDepartmentId)) {
            setDepartmentId(prevIds => [...prevIds, selectedDepartmentId]);
        } else {
            console.log("Department ID already exists in the array.");
        }
        console.log(departmentId);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        validateEmail();
        validateBirthday();

     const   data = {
            "firstName": firstName,
            "lastName": lastName,
            "address": address,
            "mobileNumb": mobile,
            "email": email,
            "birthDay": birthday,
            "departmentsId": departmentId
              
            
        };
        const response = await axios.put(`https://localhost:7087/api/Employee/update/${id}`,data);
        if (response.status === 200) {
            alert("Success Upadte Empolyee");
       
            navigate("/");

        }
        
    }
    
    const getEmployeeById = async () => {
        try {
            const response = await axios.get(`https://localhost:7087/api/Employee/get-by-id/${id}`)
            setEmployeeById(response.data);



        } catch (error) {

        }
    }
    const setInput = () => {
        if (employeeById) {
            setFirstName(employeeById.firstName);
            setLastName(employeeById.lastName);
            setAddress(employeeById.address);
            setMobile(employeeById.mobileNumb);
            setEmail(employeeById.email);
            setBirthday(employeeById.birthDay);
            if (employeeById.departmentEmployees) {
                const departmentIds = employeeById.departmentEmployees.map((e) => e.departmentId);
                setDepartmentId(departmentIds); 
                
            }
        }
    };
    




    const getAllDepartments = async () => {
        const response = await axios.get("https://localhost:7087/api/Department/get-all");
        setDepartment(response.data);
    }

    const handleSelectDepartment = (event) => {
        setSelectedDepartmentId(event.target.value);
        console.log(selectedDepartmentId);
    }

    const deleteEmployee = async()=>{

        const response = await axios.delete(`https://localhost:7087/api/Employee/delete/${id}`);
        if (response.status === 200) {
            alert("Success Delete Employee");
            navigate("/");
           
           

        }
    }
return(
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
                <h2 className="k1">Manage Employee</h2>
            </div>

            <div class="card mx-5 mb-5 border border-secondary rounded-3">
                <h5 class="card-header card-header text-center fw-bold bg-secondary text-white">Add Employee</h5>
                <div class="card-body">
                    <form onSubmit={handleSubmit}>
                        <label className="form-label">
                            Fist Name
                        </label>
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" onChange={hadleFirstName} value={firstName} placeholder="First Name" required />
                        </div>
                        <label className="form-label">
                            Last Name
                        </label>
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" onChange={hadleLastName} value={lastName} placeholder="Last Name" required />
                        </div>
                        <label className="form-label">
                            Address
                        </label>
                        <div className="form-group mb-3">
                            <textarea className="form-control" onChange={hadleAddress} value={address} placeholder="Address" rows="2" required />
                        </div>
                        <label className="form-label">
                            Birthday
                        </label>
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" onChange={hadleBirthday} value={birthday} onBlur={validateBirthday} placeholder="Enter birthday (dd/mm/yyyy)" required />
                            {birthdayError && <div className="text-danger">{birthdayError}</div>}
                        </div>
                        <label className="form-label">
                            Mobile Number
                        </label>
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" onChange={hadleMobile}  value={mobile} placeholder="07x xxxxxxx" required />
                        </div>
                        <label className="form-label">
                            Email
                        </label>
                        <div className="form-group mb-3">
                            <input type="email" className="form-control" onChange={hadleEmail} value={email} onBlur={validateEmail} placeholder="Email" required />
                            {emailError && <div className="text-danger">{emailError}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Department</label>
                            <select className="form-select mb-3" onChange={handleSelectDepartment} value={selectedDepartmentId}>
                                <option value="" disabled>Select Department</option>
                                {department && department.map((dep) => (
                                    <option key={dep.id} value={dep.id} disabled={departmentId.includes(dep.id)}>
                                        {dep.name}
                                    </option>
                                ))}
                            </select>

                            <button type="button" onClick={handleDepartmentId} className="btn btn-outline-primary">Add Department</button>
                        </div>

                        <div className="card-body d-flex justify-content-between flex-column">
                            <button type="submit" className="btn btn-primary">Update</button>
                        </div>
                    </form>
                    <div className="card-body d-flex justify-content-between flex-column">
                        <button type="button" className="btn btn-danger mt-3" onClick={deleteEmployee}>Delete</button>
                    </div>

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

export default EmployeeById;