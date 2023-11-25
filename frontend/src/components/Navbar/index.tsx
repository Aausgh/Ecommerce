import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slice/authSlice";
import { successToast } from "../../services/toaster.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { resetCart } from "../../slice/productSlice";
import { resetOrder } from "../../slice/orderSlice";
import Logo from "../../assets/images/logo.png";




const Navmenu = () => {

    const { name, role } = useSelector((state: any) => state.auth);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("persist:root");
        dispatch(logout());
        dispatch(resetCart());
        dispatch(resetOrder());
        successToast("Logged out successfully");
    };

    return (
        <Navbar expand="lg" style={{ background: "#f95706" }}>
            <Container className="d-flex justify-content-around">

                <Navbar.Brand href="/home" >
                    <img src={Logo} alt="Logo" style={{ height: "60px", marginRight: "10px" }} />
                </Navbar.Brand>


                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="ms-auto d-flex align-items-center gap-3">


                        <Link to={"/home"} className="text-decoration-none text-white">
                            <Typography >Home</Typography>
                        </Link>

                        <Link to={"/all/products"} className="text-decoration-none text-white">
                            <Typography>Products</Typography>
                        </Link>

                        <NavDropdown
                            title={<span className=" text-white">
                                <FontAwesomeIcon icon={faUser} size="sm" style={{ color: "#f4f4f5", marginRight: '5px' }} />
                                {name}
                            </span>} id="basic-nav-dropdown" >


                            <NavDropdown.Item onClick={() => navigate('/profile')} >Profile</NavDropdown.Item>


                            <NavDropdown.Item onClick={logoutHandler}>
                                Logout
                            </NavDropdown.Item>

                        </NavDropdown>


                        {role === "user" &&
                            <Link to={"/cart"}>
                                <FontAwesomeIcon icon={faCartShopping} size="lg" style={{ color: "#f4f4f5", }} />
                            </Link>
                        }

                    </Nav>

                </Navbar.Collapse>

            </Container>

        </Navbar >
    );
}

export default Navmenu