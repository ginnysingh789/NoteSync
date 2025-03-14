import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  // Open the Snackbar
  const handleClick = () => {
    setOpen(true);
  };

  // Close the Snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // Handle sign-up API call
  const SignUpBtw = (e) => {
    e.preventDefault(); // Prevent page reload
    axios.post('http://localhost:5000/sign-up', { email, password })
      .then((res) => {
        if (res.status === 200) {
          setMessage('Sign-Up Successful');
          setSeverity('success');
          handleClick();
        }
      })
      .catch((err) => {
        if (err.response?.status === 411) {
          setMessage('User already Exists');
          setSeverity('error');
          handleClick();
        } else if (err.response?.status === 400) {
          setMessage('Invalid data');
          setSeverity('error');
          handleClick();
        } else {
          setMessage('An error occurred');
          setSeverity('error');
          handleClick();
        }
      });
  };

  // Styles
  const pageStyle = {
  
    backgroundColor: '#f0f4f8',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflowX: "hidden" 
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    borderRadius: '20px',
    padding: '20px',
    width: '300px',
    height: '350px' // Increased height for Snackbar
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#28a745', // Green button color
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer'
  };

  const signInButtonStyle = {
    marginTop:'200px',
    width: '100%',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    color: '#007bff',
    border: '1px solid #007bff',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px'
  };

  return (
    <>
      <style>
        {`
          input::placeholder {
            color: #aaa;
            font-style: italic;
          }
          input:focus {
            border-color: #28a745;
            outline: none;
          }
        `}
      </style>
      <div style={pageStyle}>
        <div style={cardStyle}>
          <h2 style={titleStyle}>Sign up</h2>
          <input
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
          <Button onClick={SignUpBtw} style={buttonStyle}>Sign-up</Button>
          <Link to={'/sign-in'} style={{ textDecoration: 'none' }}>
            <Button style={signInButtonStyle}>Go to Sign-in</Button>
          </Link>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={severity}
              variant="filled"
              sx={{ width: '100%' }}
            >
              {message}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </>
  );
}