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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:9000/customer/", { customerName, customerAllergies });
      const { customerId, tableNumber } = response.data;
      sessionStorage.setItem('id', customerId);
      sessionStorage.setItem('table', tableNumber);
      setTableNumber(tableNumber);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/menu");
      }, 1000); // Hide table number after 1 second
    } catch (err) {
      console.log(err);
      setError("An error occurred. Please try again later.");
    }
  };

  const handleAllergyChange = (allergy) => {
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
            <Typography variant="body1" align="center" gutterBottom>Please enter your name and allergy preferences</Typography>
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
                  <Typography variant="subtitle1">Allergies:</Typography>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <FormControlLabel
                      control={<Checkbox
                        checked={customerAllergies.includes("Dairy")}
                        onChange={() => handleAllergyChange("Dairy")}
                      />}
                      label="Dairy"
                    />
                    <FormControlLabel
                      control={<Checkbox
                        checked={customerAllergies.includes("Gluten")}
                        onChange={() => handleAllergyChange("Gluten")}
                      />}
                      label="Gluten"
                    />
                    <FormControlLabel
                      control={<Checkbox
                        checked={customerAllergies.includes("Nuts")}
                        onChange={() => handleAllergyChange("Nuts")}
                      />}
                      label="Nuts"
                    />
                    <FormControlLabel
                      control={<Checkbox
                        checked={customerAllergies.includes("Shellfish")}
                        onChange={() => handleAllergyChange("Shellfish")}
                      />}
                      label="Shellfish"
                    />
                  </div>
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
