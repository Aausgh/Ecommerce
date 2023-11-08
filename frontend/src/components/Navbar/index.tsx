import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slice/authSlice";
import { successToast } from "../../services/toaster.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons'

const Navmenu = () => {
    const { name, role } = useSelector((state: any) => state.auth);

    const dispatch = useDispatch();

    const logoutHandler = () => {
        localStorage.removeItem("persist:root");
        dispatch(logout());
        successToast("Logged out successfully");
    };
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>

                <Navbar.Brand href="#">Daraz</Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="ms-auto d-flex align-items-center gap-2">



                        <Nav.Link href="#">Home</Nav.Link>
                        <Nav.Link href="#products">Products</Nav.Link>

                        {role === "user" && <FontAwesomeIcon icon={faCartShopping} size="sm" style={{ color: "#000000", }} />}

                        <div>
                            {/* <FontAwesomeIcon icon={faUser} size="sm" style={{ color: "#000000", }} /> */}


                            <NavDropdown title='Name' id="basic-nav-dropdown">

                                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>

                                <NavDropdown.Item href="#action/3.2" onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>

                            </NavDropdown>


                        </div>

                    </Nav>

                </Navbar.Collapse>

            </Container>

        </Navbar >
    );
}

export default Navmenu