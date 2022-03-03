import React from 'react';

function Headerbefore(props) {
    
  return (
    <header className="row border-bottom border-2 border-secondary"><h3>Product Management</h3>   
        <div className="row">
            <nav className="navbar-right p-3 mx-auto navbar-light">
                <a className="navbar-brand" href="/"> Home </a>
                <a className="navbar-brand" href="#"> About us </a> 
                <a className="navbar-brand" href="#"> Contact </a>
            </nav> 
        </div>
    </header>
  )

}

export default Headerbefore;