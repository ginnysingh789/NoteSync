import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const navigate = useNavigate();

  // Function to open the Snackbar
  const handleClick = () => {
    setOpen(true);
  };

  // Function to close the Snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const signInBtw = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/sign-in', { email, password })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userId', res.data.user._id); 
          setMessage('Successfully Login');
          setSeverity('success');
          handleClick();
          navigate('/dashboard');
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setMessage('First Sign up');
          setSeverity('error');
          handleClick();
        } else if (err.response.status === 400) {
          setMessage('Invalid Datatype');
          setSeverity('error');
          handleClick();
        } else if (err.response.status === 403) {
          setMessage('Invalid Credentials');
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
    alignItems: 'center'
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    padding: '20px',
    width: '300px',
    height: '400px'
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
    backgroundColor: '#28a745',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer'
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
          <h2 style={titleStyle}>Sign in</h2>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
          <button onClick={signInBtw} style={buttonStyle}>Sign in</button>
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