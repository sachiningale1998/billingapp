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
    orgPan: '',
    orgPhone: '',
    bankName: '',
    accUserName: '',
    accNumber: '',
    bankBranchName: '',
    ifscCode: ''
  });

  const [orgLogoPic, setOrgLogoPic] = useState(null);
  const [orgOwnerSignaturePic, setOrgOwnerSignaturePic] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'orgLogoPic') {
      setOrgLogoPic(files[0]);
    } else if (name === 'orgOwnerSignaturePic') {
      setOrgOwnerSignaturePic(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
    if (orgLogoPic) form.append('orgLogoPic', orgLogoPic);
    if (orgOwnerSignaturePic) form.append('orgOwnerSignaturePic', orgOwnerSignaturePic);

    try {
      const response = await fetch('http://127.0.0.1:8080/auth/register', {
        method: 'POST',
        body: form,
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
          orgPan: '',
          orgPhone: '',
          bankName: '',
          accUserName: '',
          accNumber: '',
          bankBranchName: '',
          ifscCode: ''
        });
        setOrgLogoPic(null);
        setOrgOwnerSignaturePic(null);
        navigate("/login");
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
          <Form style={{ textAlign: "left" }} onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Existing input fields */}
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

            {/* New fields for organization phone and bank details */}
            <Form.Group className="mb-3" controlId="formOrgPhone">
              <Form.Label>Organization Phone</Form.Label>
              <Form.Control
                type="tel"
                name="orgPhone"
                value={formData.orgPhone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBankName">
              <Form.Label>Bank Name</Form.Label>
              <Form.Control
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAccUserName">
              <Form.Label>Account User Name</Form.Label>
              <Form.Control
                type="text"
                name="accUserName"
                value={formData.accUserName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAccNumber">
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                type="text"
                name="accNumber"
                value={formData.accNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBankBranchName">
              <Form.Label>Bank Branch Name</Form.Label>
              <Form.Control
                type="text"
                name="bankBranchName"
                value={formData.bankBranchName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formIfscCode">
              <Form.Label>IFSC Code</Form.Label>
              <Form.Control
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* File input fields */}
            <Form.Group className="mb-3" controlId="formOrgLogoPic">
              <Form.Label>Organization Logo</Form.Label>
              <Form.Control
                type="file"
                name="orgLogoPic"
                onChange={handleFileChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formOrgOwnerSignaturePic">
              <Form.Label>Owner Signature Picture</Form.Label>
              <Form.Control
                type="file"
                name="orgOwnerSignaturePic"
                onChange={handleFileChange}
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
