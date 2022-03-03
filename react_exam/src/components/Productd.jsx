import React from "react";
import {useState, useEffect} from "react";
import Headerafter from "./Headerafter";
import Footer from "./Footer";


function Productd() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        
        const location = "localhost";

        const settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        };

        try {
            //listProduct api call
            const fetchResponse = await fetch(`http://${location}:5000/api/productManagement/listProduct/`, settings);
            const data = await fetchResponse.json();
            setProducts(data.product);
        }
        catch (e) {
            return e;
        }

    }

    async function deleteProduct(productId){

        if(window.confirm("Do you want to delete the product?")){
            const location = "localhost";
            const data = {
                "productId": productId
            }

            const settings = {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            };

            try {
                //delete api call
                const fetchResponse = await fetch(`http://${location}:5000/api/productManagement/delete/`, settings);
                const data = await fetchResponse.json();
                fetchProducts();
                return data;
            } 
            catch (e) {
                return e;
            }
        }

    }

  return (
    <div className="productd">
      <div className="container">
        <title>Product Details</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous"/>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>

        <div className="container main-container border border-2 border-secondary">

            <Headerafter/>

            <div className= " col-md-7 m-3 p-5 mx-auto">
                <table className="table table-bordered table-responsive" id="product" >

                    <thead className="thead-light">
                        <tr>
                            <th scope="col">ProductID</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Vendor</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Warranty(Days)</th>
                            <th scope="col">Operations</th>                        
                        </tr>
                    </thead>
    
                    <tbody className= "m-3 p-5" id="productData">
                        {products.map(product => {
                            return (
                                <tr>
                                    <td>{product.productId}</td>
                                    <td>{product.productName}</td>
                                    <td>{product.price}</td>
                                    <td>{product.vendor}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.warranty}</td>
                                    <td><button onClick={()=>deleteProduct(product.productId)}>Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>

                </table>
            </div> 

            <Footer/>
 
        </div>

      </div>
    </div>
  );
  
}

export default Productd;