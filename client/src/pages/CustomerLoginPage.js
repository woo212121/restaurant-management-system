import React, { useState } from "react";
import { Helmet } from 'react-helmet';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Checkbox, Button, FormControlLabel, Grid, Typography, Paper } from "@mui/material";

function CustomerLoginPage() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [tableNumber, setTableNumber] = useState(null);
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("");
  const [customerAllergies, setCustomerAllergies] = useState([]);

  const handleSubmit = async (event) => { // Function to handle form submission
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:9000/customer/", { customerName, customerAllergies });
      const { customerId, tableNumber } = response.data; // Extract customerId and tableNumber from response
      sessionStorage.setItem('id', customerId);
      sessionStorage.setItem('customer_name', customerName);
      sessionStorage.setItem('table', tableNumber);
      setTableNumber(tableNumber);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/menu");
      }, 1000); // Hide table number after 1 second
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  const handleAllergyChange = (allergy) => { // Function to handle allergy checkbox change
    if (customerAllergies.includes(allergy)) {
      setCustomerAllergies(customerAllergies.filter((a) => a !== allergy));
    } else {
      setCustomerAllergies([...customerAllergies, allergy]);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Grid container justify="center" alignItems="center" style={{ maxWidth: "500px" }}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Helmet>
              <title>Oaxaca | Customer Login</title>
            </Helmet>
            <Typography variant="h5" align="center" gutterBottom>Welcome to Oaxaca</Typography>
            <Typography variant="body1" align="center" gutterBottom>Please enter your name</Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" type="submit" fullWidth>
                    Guest Login
                  </Button>
                </Grid>
                {success && tableNumber && (
                  <Grid item xs={12}>
                    <Typography variant="body1" align="center" style={{ backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "5px" }}>
                      Your table number is: {tableNumber}
                    </Typography>
                  </Grid>
                )}
                {error && <Grid item xs={12}><Typography variant="subtitle2" color="error">{error}</Typography></Grid>}
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default CustomerLoginPage;
