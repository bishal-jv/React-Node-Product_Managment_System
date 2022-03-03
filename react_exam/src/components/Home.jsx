import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Headerbefore from "./Headerbefore";
import Footer from "./Footer";

function Home() {
    const [username , setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showInvalidPass, setShowInvalidPass] = useState(false);
    const navigate = useNavigate();

    async function callLoginAPI(e) {
        e.preventDefault();
        const location = "localhost";
        const data = {
            "username": username,
            "password": password
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
            //signin api call
            const fetchResponse = await fetch(`http://${location}:5000/api/signin/`, settings);
            const data = await fetchResponse.json();
            sessionStorage.setItem('loginedUserName', data.user.name);
            navigate("/productd");
            return data;
        }
        catch (e) {
            setShowInvalidPass(true);
            return e;
        }
    };

return (
    <div className="home">
      <div className="container">
        <title>Login</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"></link>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>

        <div className="container main-container border border-2 border-secondary">

            <Headerbefore/>

            <div className="row col-md-4 mx-auto">
                <form className ="align-self-sm-center m-5 pb-5 needs-validation mx-auto border" onSubmit={callLoginAPI}>
                    <div className="m-3 p-2">
                        <label className="form-label" htmlFor="userName">Username:</label>
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} id="userName" name="userName" className="form-control" placeholder="Enter the Username" required/>
                    </div>

                    <div className="m-3 p-2">
                        <label className="form-label" htmlFor="password">Password: </label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} id="password" name="password" className="form-control" placeholder="Enter the password" required/> 
                    </div>

                    <div className="m-3 p-2">
                        <a href="/register" className="reglink">New Register</a>
                        <button type="submit" className="btn btn-primary">Login</button> 
                    </div>

                    {showInvalidPass ?
                    <div className="alert alert-danger" role="alert" id="invalid-credentials" >
                        Invalid credentials!
                    </div>
                    : null}

                </form>
            </div>

            <Footer/>

        </div>
        
      </div>
    </div>
  );
}

export default Home;