import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useStore } from '../../context/store';
import { useNavigate } from 'react-router-dom';

function Navbar1() {
  const [ userName, setUsername] = useState("User Name");
  const { handleSearchStore, userId, setSearchQuery, setCurrentPage, searchQuery } = useStore(); // Use global state and functions
  const navigate = useNavigate()



  useEffect(()=>{
    let token = localStorage.getItem("token");
    if(token){
      token = JSON.parse(atob(token.split('.')[1]));
      let name = token.userName
      setUsername(name)
    }

  }, [userName, userId]);

  const handleSearch = async () => {
    setCurrentPage(1); // Reset to page 1 on new search
    await handleSearchStore({ searchQuery, userId, pageNumber: 1 }); // Perform search with page 1
  };

  return (
    <>
      {['sm'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand style={{fontSize:"2rem", fontWeight:'700'}} onClick={()=> navigate("/")} >Empire Group</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Empire Group
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link onClick={()=> navigate("/")} >Sales</Nav.Link>
                  <Nav.Link onClick={()=> navigate("/createinvoice")} >New Invoice +</Nav.Link>
                  <NavDropdown
                    title={userName}
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item onClick={()=> navigate("/login")} >Login</NavDropdown.Item>
                    <NavDropdown.Item onClick={()=> navigate("/register")} >
                      Register Yourself
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={()=>{
                      navigate("/profile")
                    }} >
                      My Profile
                    </NavDropdown.Item>
                      <NavDropdown.Divider />
                    <NavDropdown.Item onClick={()=>{
                      localStorage.removeItem("token");
                      navigate("/login")
                    }} >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    onChange={(e)=>setSearchQuery(e.target.value)}
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button onClick={handleSearch} variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Navbar1;