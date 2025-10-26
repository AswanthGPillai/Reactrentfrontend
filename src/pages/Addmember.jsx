import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper, Snackbar, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const Addmember = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim() || !phone.trim()) {
      setSnackbar({
        open: true,
        message: "Please fill in all fields",
        severity: "error"
      });
      return;
    }

    const existingMembers = JSON.parse(localStorage.getItem("members") || "[]");
    
    const newMember = {
      id: Date.now(),
      name: name.trim(),
      phone: phone.trim()
    };
    
    localStorage.setItem("members", JSON.stringify([...existingMembers, newMember]));
    
    setSnackbar({
      open: true,
      message: "Member added successfully!",
      severity: "success"
    });
    
    setName("");
    setPhone("");
    navigate("/member");
  };

  return (
    
   <div style={{margin:"80px"}}>
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 3, mb:5 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Add New Member
          </Typography>
          
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Member Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              required
            />
            
            <TextField
              fullWidth
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              margin="normal"
              required
              inputProps={{ pattern: "[0-9]*" }}
            />
            
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3 }}
              startIcon={<AddIcon />}
            >
              Add Member
            </Button>
          </form>
        </Paper>
        
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
   </div>
    
  );
};

export default Addmember;
