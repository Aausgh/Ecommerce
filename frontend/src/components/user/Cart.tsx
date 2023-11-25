import { FormControl, MenuItem, Select } from "@mui/material";
import { Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import NavbarComponent from "../Navbar";
import { MdDeleteOutline } from "react-icons/md";
import { removeFromCart } from "../../slice/productSlice";
import { Link, useNavigate } from "react-router-dom";
import { successToast } from "../../services/toaster.service";
import { Container, Card, Button } from "@mui/joy";
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { ArrowCircleRight } from "@mui/icons-material";

const Cart = () => {
    const { cartItem } = useSelector((state: any) => state.product);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const returnTotalQuantity = () => {
        // let sum = 0;
        // console.log(cartItem);
        // cartItem.forEach((item: any) => {
        //   sum += item.qty;
        // });
        // return sum;

        return cartItem.reduce((acc: any, item: any) => acc + item.qty, 0);
    };

    const returnTotalPrice = () => {
        let sum = 0;
        cartItem.forEach((item: any) => {
            sum += item.qty * item.price;
        });
        return sum;

        // return cartItem.reduce(
        //   (acc: any, item: any) => acc + item.qty * item.price,
        //   0
        // );
    };

    return (
        <>
            <NavbarComponent />
            <Container className="p-5">
                <Row>
                    <Col md={8}>
                        <Card
                            variant="outlined"
                            invertedColors
                            sx={{
                                boxShadow: 'lg',
                                width: 800,
                                maxWidth: '100%'
                            }}>
                            <h1 className="text-center mb-2">Shopping Cart</h1><hr />

                            {cartItem.length > 0 ? (
                                <ListGroup>
                                    {cartItem.map((item: any) => {
                                        return (

                                            <ListGroup.Item key={item.productId}>
                                                <Row className="d-flex align-items-center">
                                                    <Col md={2}>
                                                        <Image
                                                            src={item.productImage}
                                                            alt={item.productName}
                                                            fluid
                                                            rounded
                                                        />
                                                    </Col>

                                                    <Col md={2}>
                                                        <span>{item.productName}</span>
                                                    </Col>

                                                    <Col md={2}>
                                                        <span><b>Rs.</b> {item.price}</span>
                                                    </Col>

                                                    <Col md={2}>
                                                        <FormControl variant="standard" sx={{ m: 1, minWidth: 40 }}>

                                                            <Select
                                                                value={item.qty}
                                                                label="Choose quantity"
                                                                labelId="demo-simple-select-standard-label"
                                                                id="demo-simple-select-standard"
                                                            >
                                                                {[...Array(item.countInStock)].map((_, index) => {
                                                                    return (
                                                                        <MenuItem key={index + 1} value={index + 1}>
                                                                            {index + 1}
                                                                        </MenuItem>
                                                                    );
                                                                })}
                                                            </Select>

                                                        </FormControl>

                                                    </Col>

                                                    <Col md={2}>
                                                        <b>Rs.</b> {item.qty * item.price}
                                                    </Col>

                                                    <Col md={2}>
                                                        <Button
                                                            variant="outlined"
                                                            color="danger"
                                                            onClick={() => {
                                                                dispatch(removeFromCart(item.productId));
                                                                successToast(
                                                                    item.productName + " removed from cart"
                                                                );
                                                            }}
                                                        >
                                                            <MdDeleteOutline />
                                                        </Button>

                                                    </Col>

                                                </Row>
                                            </ListGroup.Item>
                                        );
                                    })}

                                </ListGroup>

                            ) : (
                                <div className="text-center">
                                    Nothing to show on your cart.{" "}
                                    <Link to={"/all/products"}>Continue Shopping</Link>
                                </div>
                            )}
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card
                            variant="outlined"
                            invertedColors
                            sx={{
                                boxShadow: 'lg',
                                width: 800,
                                maxWidth: '100%'
                            }}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <>
                                        <b> Total Items:</b> {returnTotalQuantity()}{" "}

                                    </>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <>
                                        <b> Total Price:</b> <b>Rs.</b> {returnTotalPrice()}{" "}
                                    </>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button
                                        color="success"
                                        disabled={cartItem.length === 0}
                                        onClick={() => navigate("/checkout-step")}
                                    >
                                        Proceed to checkout <ArrowCircleRight />
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </Container >
        </>
    );
};

export default Cart;