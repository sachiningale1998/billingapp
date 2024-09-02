import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    orgOwnerName: '',
    mobile: '',
    password: '',
    orgName: '',
    orgEmail: '',
    orgGstNo: '',
    orgAddress: '',
    orgPan: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://127.0.0.1:8080/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === 'ok') {
        setSuccess('Registration successful!');
        setFormData({
          email: '',
          orgOwnerName: '',
          mobile: '',
          password: '',
          orgName: '',
          orgEmail: '',
          orgGstNo: '',
          orgAddress: '',
          orgPan: ''
        });
        navigate("/login")
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('An error occurred during registration.');
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2 className="mb-4">Register</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form style={{textAlign:"left"}} onSubmit={handleSubmit}>
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

            <Form.Group className="mb-3" controlId="formOrgOwnerName">
              <Form.Label>Organization Owner Name</Form.Label>
              <Form.Control
                type="text"
                name="orgOwnerName"
                value={formData.orgOwnerName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMobile">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formOrgName">
              <Form.Label>Organization Name</Form.Label>
              <Form.Control
                type="text"
                name="orgName"
                value={formData.orgName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formOrgEmail">
              <Form.Label>Organization Email</Form.Label>
              <Form.Control
                type="email"
                name="orgEmail"
                value={formData.orgEmail}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formOrgGstNo">
              <Form.Label>Organization GST Number</Form.Label>
              <Form.Control
                type="text"
                name="orgGstNo"
                value={formData.orgGstNo}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formOrgAddress">
              <Form.Label>Organization Address</Form.Label>
              <Form.Control
                type="text"
                name="orgAddress"
                value={formData.orgAddress}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formOrgPan">
              <Form.Label>Organization PAN</Form.Label>
              <Form.Control
                type="text"
                name="orgPan"
                value={formData.orgPan}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
