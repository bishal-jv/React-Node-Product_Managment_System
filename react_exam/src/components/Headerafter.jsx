import React from 'react';

function Headerafter(props) {

    const username = sessionStorage.getItem("loginedUserName");
    
    return (
        <div>
            <header className="row border-bottom border-2 border-secondary"><h3>Product Management</h3><span class= "header">Welcome: {username}</span>
                <div className="row">
                    <nav className="navbar-right p-3 mx-auto navbar-light ">
                        <a className="navbar-brand" href="/productd">Home</a>
                        <a className="navbar-brand" href="#">About us</a>
                        <a className="navbar-brand" href="/addproduct">Add product details</a>
                        <a className="navbar-brand" href="/productd">Show Report</a> 
                        <a className="navbar-brand" href="/">Logout</a>
                    </nav> 
                </div>
            </header>
        </div>
    )
    
}

export default Headerafter;