import { useEffect, useState } from "react";
import NavbarComponent from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../../slice/productSlice";
import { resetOrder } from "../../slice/orderSlice";
import axios from "axios";
import { config } from "../../config";
import { errorToast } from "../../services/toaster.service";
import { Container, Card, CardOverflow, AspectRatio, Typography, CardContent, CardActions, Button } from '@mui/joy';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Image, ListGroup, Row } from "react-bootstrap";

const Success = () => {
    const dispatch = useDispatch();
    const [orde, setOrder] = useState<any>({});
    const { order } = useSelector((state: any) => state.order);
    const { jwt } = useSelector((state: any) => state.auth);

    const totalItems = order.orderItems.reduce(({ acc, item }: any) => acc + item.qty, 0);


    const navigate = useNavigate();

    async function successFn() {
        try {
            const { data } = await axios.post(
                `${config.SERVER_URL}/order/${order._id}/pay`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }

            );
            console.log(data);
            setOrder(data);

            dispatch(resetCart());
        } catch (error) {
            errorToast("fail");
        }
        // dispatch(resetOrder());
    }

    useEffect(() => {
        successFn();
    }, []);

    return (
        <>
            <NavbarComponent />
            <Container className="d-flex justify-content-center">

                {orde.status === "success" && (
                    <>
                        <Card
                            data-resizable
                            sx={{
                                textAlign: 'center',
                                alignItems: 'center',
                                width: 643,
                                marginTop: 4,
                                '--icon-size': '100px',
                            }}
                        >

                            <CardOverflow variant="solid" color="success">
                                <AspectRatio
                                    variant="outlined"
                                    color="warning"
                                    ratio="1"
                                    sx={{
                                        m: 'auto',
                                        transform: 'translateY(50%)',
                                        borderRadius: '50%',
                                        width: 'var(--icon-size)',
                                        boxShadow: 'sm',
                                        bgcolor: 'background.surface',
                                        position: 'relative',
                                    }}
                                >

                                    <div>
                                        <FontAwesomeIcon icon={faCheck} size="2xl" style={{ color: "#1f7a1f", }} />
                                    </div>

                                </AspectRatio>

                            </CardOverflow>

                            <Typography level="h1" sx={{ mt: 'calc(var(--icon-size) / 2)' }}>
                                Rs. {order.shippingPrice}
                            </Typography>

                            <Typography level="h3" >
                                Payment Successful ! <br />
                                Your payment have been received.
                            </Typography>
                            <Typography level="h3" >

                            </Typography>

                            <CardContent sx={{ maxWidth: '60ch' }}>


                                <Row>

                                    <Typography level="title-sm">
                                        Order ID: {order._id}
                                    </Typography>


                                    <Typography level="title-sm">
                                        Payment Method: {order.payment.paymentMethod}
                                    </Typography>

                                </Row>

                                <Card>
                                    <ListGroup variant="flush">
                                        {order.orderItems.map((item: any) => {
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
                                                            <span>Rs. {item.price}</span>
                                                        </Col>
                                                        <Col md={2}>
                                                            <span>{item.qty}</span>
                                                        </Col>
                                                        <Col md={2}>Rs. {item.qty * item.price}</Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            );
                                        })}
                                    </ListGroup>
                                </Card>


                                <Card
                                    sx={{

                                        width: 300,
                                        maxWidth: '90%',
                                        ml: 'auto',

                                    }}
                                >
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <>
                                                <b> Total Items:</b> {totalItems}

                                            </>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <>
                                                <b>Total Price:</b> Rs. {order.itemsPrice.toFixed(2)}{" "}
                                            </>
                                        </ListGroup.Item>

                                        {/* <ListGroup.Item>
                                            <>
                                                <b>Delivery Charge:</b> Rs. {order.shippingPrice.toFixed(2)}{" "}
                                            </>
                                        </ListGroup.Item> */}

                                        <ListGroup.Item>
                                            <>
                                                <b> Tax(13%):</b> Rs. {order.taxPrice.toFixed(2)}
                                            </>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <>
                                                <b> Paid Price:</b> Rs. {order.totalPrice.toFixed(2)}{" "}
                                            </>
                                        </ListGroup.Item>


                                    </ListGroup>
                                </Card>

                            </CardContent>

                            <CardActions
                                orientation="vertical"
                                buttonFlex={1}
                                sx={{
                                    '--Button-radius': '40px',
                                    width: 'clamp(min(100%, 160px), 50%, min(100%, 200px))',
                                }}
                            >
                                <Button
                                    variant="solid"
                                    color="success"
                                    onClick={() => {
                                        navigate("/home")
                                        dispatch(resetOrder())
                                    }}>
                                    Done
                                </Button>

                            </CardActions>
                        </Card>
                    </>
                )
                }

            </Container >
        </>
    );
};

export default Success;