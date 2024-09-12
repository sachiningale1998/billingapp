import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('https://invoicemakerserver.onrender.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
    //   console.log("data", data)

      if (data.status === 'ok') {
        setSuccess('Login successful!');
        // Optionally, store the token or navigate to another page
        localStorage.setItem('token', data.token);
        navigate("/")
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (error) {
      setError('An error occurred during login.');
    }
  };

  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword); // Toggle password visibility state
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2 className="mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password *</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type={showPassword ? 'text' : 'password'} // Conditionally show text or password
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Button variant="outline-secondary" onClick={toggleShowPassword} className="ml-2">
                  {showPassword ? 'Hide' : 'Show'} {/* Change text based on visibility */}
                </Button>
              </div>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <div xs={12} md={6} className="d-flex justify-content-center mt-3">
          <p>Don't have an account? 
          <span 
            style={{
                color: "blue", 
                textDecoration: "underline", 
                cursor: "pointer"
            }} 
            onClick={() => navigate("/register")}
           >
            Register here
</span>
          </p>
        </div>
      </Row>
    </Container>
  );
};

export default Login;
