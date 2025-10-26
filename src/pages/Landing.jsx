import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { IoMdAdd } from "react-icons/io";
import { Link } from 'react-router-dom';


function Landing() {
  return (
    <div>
      <div>
        <Typography variant="h3" align="center" gutterBottom sx={{ margin: "50px 0" }}>
          Welcome to RenteHome
        </Typography>
        <Typography variant="h6" align="center" gutterBottom sx={{ margin: "50px 100px " }}>
          Welcome to Rente Home — your simple and secure platform for managing rental home members. Add and manage tenants, owners, and agents with ease. Our intuitive interface lets you keep track of essential details, ensuring smooth communication and organized rental operations.

Whether you're a property manager or a homeowner, our system helps you stay connected with your members — all in one place.
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center", margin: "100px 100px 0px 100px" }}>
        <Link to="/addmember" style={{ textDecoration: 'none' }}>
          <Button variant="contained" size='large'><IoMdAdd style={{fontSize:"22px",gap:"10px", marginBottom:"3px"}} />
  Add New Members</Button>
        </Link>
      </div>
      <div style={{
        backgroundImage:
          "url('https://png.pngtree.com/png-vector/20230313/ourmid/pngtree-property-for-rent-illustration-with-house-trees-and-mountains-vector-png-image_6634394.png')",backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        }}>
        
      </div>
    </div>
  )
}

export default Landing
