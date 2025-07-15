import React from "react";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import FileMenu from "./FileMenu/FileMenu";
import { State } from "../../data_type/interfaces";

interface Props {
  editor: State;
  setEditor: (properties: object, callback?: () => void) => void;
}

const NavbarComp: React.FC<Props> = ({ editor, setEditor }) => {
  return (
    <Navbar bg="white" variant="light" className="shadow-sm border-bottom" expand="lg">
      <Container fluid>
        <Navbar.Brand className="d-flex align-items-center">
          <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" 
               style={{ width: '40px', height: '40px' }}>
            <i className="fas fa-tshirt text-white"></i>
          </div>
          <div>
            <h4 className="mb-0 text-primary fw-bold">T-Shirt Designer Pro</h4>
            <small className="text-muted">Professional Design Studio</small>
          </div>
        </Navbar.Brand>
        
        <Nav className="me-auto">
          <FileMenu editor={editor} setEditor={setEditor} />
        </Nav>
        
        <Nav className="d-flex align-items-center">
          <div className="d-flex align-items-center me-4">
            <span className="text-muted me-2">Design Status:</span>
            <Badge bg={editor.selectedObjects.length > 0 ? "success" : "secondary"}>
            <Badge variant={editor.selectedObjects.length > 0 ? "success" : "secondary"}>
              {editor.selectedObjects.length > 0 ? "Active" : "Ready"}
            </Badge>
          </div>
          
          <div className="d-flex align-items-center">
            <button className="btn btn-outline-primary btn-sm me-2">
              <i className="fas fa-save me-1"></i>
              Save
            </button>
            <button className="btn btn-primary btn-sm">
              <i className="fas fa-share me-1"></i>
              Share
            </button>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;