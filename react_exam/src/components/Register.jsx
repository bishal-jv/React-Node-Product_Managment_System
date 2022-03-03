import React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Headerbefore from "./Headerbefore";
import Footer from "./Footer";

function Register() {

    const location = "localhost";
    const [pname , setpname] = useState("");
    const [contact , setcontact] = useState("");
    const [email , setemail] = useState("");
    const [uname , setuname] = useState("");
    const [pwd , setpwd] = useState("");
    const navigate = useNavigate();

    async function callsignUpAPI(e) {
        e.preventDefault();

        const data = {
            "name": pname,
            "contact": contact,
            "email": email,
            "username": uname,
            "password": pwd
        }

        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };

        try {
            //register api call
            const fetchResponse = await fetch(`http://${location}:5000/api/register/`, settings);
            const data = await fetchResponse.json();
            sessionStorage.setItem('loginedUserName', data.user.name);
            navigate("/productd");
            return data;
        } 
        catch (e) {
            return e;
        }

    };


  return (
    <div className="register">
      <div className="container">
        <title>Register</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
        <link rel="stylesheet" href="../index.css"></link>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>

        <div className="container main-container border border-2 border-secondary">

            <Headerbefore/>

            <div className = "row col-md-7 mx-auto">
                <form className = "align-self-sm-center m-5 pb-5 needs-validation mx-auto border" onSubmit={callsignUpAPI}>
                    
                    <div className= "m-2 p-2">
                        <label className= "form-label" htmlFor="name">Name </label>
                        <input type="text" value={pname} onChange={e => setpname(e.target.value)} id="name" className="form-control m-3 mx-auto" placeholder="Enter name" name="name" required/>
                    </div>

                    <div className= "m-2 p-2">
                        <label className="form-label" htmlFor="contact" >Contact </label> 
                        <input type="text" value={contact} onChange={e => setcontact(e.target.value)} id="contact" className="form-control m-3 mx-auto" placeholder="Enter contact" name="contact" required/>
                    </div>

                    <div className= "m-2 p-2">
                        <label className="form-label" htmlFor="email" >Email</label> 
                        <input type="email" value={email} onChange={e => setemail(e.target.value)} id="email" className="form-control m-3 mx-auto" placeholder="Enter email" name="email" required/>
                    </div>

                    <div className= "m-2 p-2">
                        <label  className="form-label" htmlFor="uName">Username  </label>
                        <input type="text" value={uname} onChange={e => setuname(e.target.value)} id="uName" className="form-control m-3 mx-auto" placeholder="Enter Username" name="uName" required/>
                    </div>

                    <div className= "m-2 p-2">
                        <label className="form-label" htmlFor="pwd">Password </label>
                        <input type="password" value={pwd} onChange={e => setpwd(e.target.value)} id="pwd" className="form-control m-3 mx-auto" placeholder="Enter Password" name="pwd" required/>
                    </div>

                    <div className= "row m-4 ">  
                        <button className="btn btn-primary" type="submit">Save</button> 
                        <a className="btn border" href="/">Cancel</a>
                    </div>

                </form>   
            </div>

            <Footer/>
            
        </div>

      </div>
    </div>
  );
}

export default Register;