import React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Headerafter from "./Headerafter";
import Footer from "./Footer";


function Addproduct() {

    const location = "localhost";
    const [productname , setproductname] = useState("");
    const [price , setprice] = useState("");
    const [quantity , setquantity] = useState("");
    const [vendor , setvendor] = useState("");
    const [warranty , setwarranty] = useState("");
    const navigate = useNavigate();

    async function callsaveproductAPI(e) {
        e.preventDefault();
        const data = {
            "productName": productname,
            "price": price,
            "quantity": quantity,
            "vendor": vendor,
            "warranty": warranty
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
            //saveProduct api call
            const fetchResponse = await fetch(`http://${location}:5000/api/productManagement/saveProduct/`, settings);
            const data = await fetchResponse.json();
            navigate("/productd");
            return data;
            
        } 
        catch (e) {
            return e;
        }

    }


  return (
    <div className="addproduct">
      <div className="container">
        <title>Add Product</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous"/>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>

        <div className="container main-container border border-2 border-secondary">

            <Headerafter/>

            <div className = "row col-md-7 mx-auto">
                <form className ="align-self-sm-center m-5 pb-5 needs-validation mx-auto border" onSubmit={callsaveproductAPI}>
                    <div className= "m-2 p-2">
                        <label className= "form-label" htmlFor="productName">Product Name</label> 
                        <input type="text" value={productname} onChange={e => setproductname(e.target.value)} id="productName" className="form-control m-3 mx-auto" placeholder="Product name" name="productName" required/> 
                    </div>

                    <div  className= "m-2 p-2">
                        <label className= "form-label" htmlFor="price">Price</label> 
                        <input type="number" value={price} onChange={e => setprice(e.target.value)} id="price" className="form-control m-3 mx-auto" placeholder="Enter price" name="price" required/>
                    </div>

                    <div className= "m-2 p-2">
                        <label className= "form-label" htmlFor="quantity">Quantity in stock</label>
                        <input type="number" value={quantity} onChange={e => setquantity(e.target.value)}id="quantity" className="form-control m-3 mx-auto" placeholder="Quantity" name="Quantity" required/>
                    </div>

                    <div className= "m-2 p-2">
                        <label className= "form-label" htmlFor="vendor">Vendor</label> 
                        <input type="text" value={vendor} onChange={e => setvendor(e.target.value)} id="vendor" className="form-control m-3 mx-auto" placeholder="Enter Vendor" name="vendor" required/>
                    </div>

                    <div className= "m-2 p-2">
                        <label className= "form-label" htmlFor="warranty">Warranty</label>
                        <input type="number" value={warranty} onChange={e => setwarranty(e.target.value)} id="warranty" className="form-control m-3 mx-auto" placeholder="Enter Warranty" name="warranty" required/>
                    </div>

                    <div className="row m-4 ">
                        <button className="btn btn-primary" type="submit">Save</button> 
                        <a className="btn border" href="/productd">Cancel</a>
                    </div>

                </form>   
            </div>

            <Footer/>

        </div>

      </div>
    </div>
  );
}

export default Addproduct;