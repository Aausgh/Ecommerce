
import axios from "axios";
import { Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { config } from "../../../config";
import { errorToast } from "../../../services/toaster.service";
import { createOrder } from "../../../slice/orderSlice";
import { Card, Button } from "@mui/joy";
import { ArrowCircleLeft } from "@mui/icons-material";

const CheckoutStep = ({ setActiveStep }: any) => {
    const { cartItem, shippingAddress, paymentMethod } = useSelector(
        (state: any) => state.product
    );
    const { jwt } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();

    const returnTotalQuantity = () => {

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
    const returnTaxPrice = () => {
        return 0.13 * returnTotalPrice();
    };
    const returnShippingPrice = () => {
        if (returnTotalPrice() >= 50000) {
            return 0;
        } else {
            return 0.01 * returnTotalPrice();
        }

        // return cartItem.reduce(
        //   (acc: any, item: any) => acc + item.qty * item.price,
        //   0
        // );
    };
    const returnActualTotalPrice = () => {
        return returnTotalPrice() + returnTaxPrice() + returnShippingPrice();
    };

    const payWithEsewa = async (e: any) => {
        e.preventDefault();
        const orderData = {
            orderItems: cartItem,
            shipping: shippingAddress,
            payment: { paymentMethod },
            itemsPrice: returnTotalPrice(),
            taxPrice: returnTaxPrice(),
            shippingPrice: returnActualTotalPrice(),
            totalPrice: returnActualTotalPrice(),
        };

        try {
            const { data } = await axios.post(
                `${config.SERVER_URL}/order`,
                orderData,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            if (data.status === "success") {
                dispatch(createOrder(data.data));
                paymentEsewa(data.data);
            }
        } catch (error: any) {
            errorToast(error.response.data.error);
        }
    };

    function paymentEsewa(order: any) {
        let path = "https://uat.esewa.com.np/epay/main";
        let params: any = {
            amt: returnActualTotalPrice(),
            psc: 0,
            pdc: 0,
            txAmt: 0,
            tAmt: returnActualTotalPrice(),
            pid: order._id,
            scd: "EPAYTEST",
            su: "http://localhost:5173/payment/success",
            fu: "http://merchant.com.np/page/esewa_payment_failed",
        };
        let form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", path);

        for (var key in params) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
            form.appendChild(hiddenField);
        }

        document.body.appendChild(form);
        form.submit();
    }




    return (
        <>
            <Row className="mt-3">
                <Col md={7}>

                    <Card
                        variant="outlined"
                        invertedColors
                        sx={{
                            boxShadow: 'lg',
                            width: 800,
                            maxWidth: '100%'
                        }}>

                        <ListGroup>
                            <ListGroup.Item>
                                <h3>Shipping Address:</h3>
                                <p>
                                    Address: {shippingAddress.postalCode}, {shippingAddress.address}
                                    , {shippingAddress.city}, {shippingAddress.country}
                                </p>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h3>Payment Method:</h3>
                                <p> {paymentMethod}</p>
                            </ListGroup.Item>

                            <ListGroup variant="flush">
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
                        </ListGroup>

                    </Card>
                </Col>

                <Col md={5}>
                    <Card
                        variant="outlined"

                        invertedColors
                        sx={{
                            boxShadow: 'lg',
                            width: 400,
                            maxWidth: '100%',
                        }}
                    >
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <>
                                    <b> Total Items:</b> {returnTotalQuantity()}{" "}

                                </>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <>
                                    <b> Sub Price:</b> Rs. {returnTotalPrice().toFixed(2)}{" "}
                                </>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <>
                                    <b> Delivery Charge (10%):</b> Rs. {returnShippingPrice().toFixed(2)}
                                </>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <>
                                    <b> Tax (13%):</b> Rs. {returnTaxPrice().toFixed(2)}
                                </>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <>
                                    <b> Total Price:</b> Rs. {returnActualTotalPrice().toFixed(2)}{" "}
                                </>
                            </ListGroup.Item>

                            <ListGroup.Item className="d-flex justify-content-between mt-3">
                                <Button

                                    color="success"
                                    onClick={payWithEsewa}
                                    className="mt-2"
                                >
                                    {/* <img
                                        src={
                                            "https://p7.hiclipart.com/preview/261/608/1001/esewa-zone-office-bayalbas-google-play-iphone-iphone.jpg"
                                        }
                                        height={"30px"}
                                        alt="e"
                                    /> */}
                                    Pay with {paymentMethod}
                                </Button>

                                <Button

                                    color="danger"
                                    className="mt-2 ms-2"
                                    onClick={(e) => setActiveStep(1)}
                                >
                                    <ArrowCircleLeft />
                                    Go back
                                </Button>

                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row >
        </>
    );
};

export default CheckoutStep;