import { useState } from "react";

import { Col, Form, Row } from "react-bootstrap";
import { Container, } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setShippingAddress } from "../../../slice/productSlice";
import { Card, FormControl, Input, Typography, Button, } from "@mui/joy";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { ArrowCircleRight } from "@mui/icons-material";

const Shipping = ({ setActiveStep }: any) => {

    const shpData = useSelector((state: any) => state.product.shippingAddress);

    const [shippingData, setShippingData] = useState<any>(shpData);

    const dispatch = useDispatch();

    function handleChange(e: any) {
        let data = {
            ...shippingData,
            [e.target.name]: e.target.value,
        };
        dispatch(setShippingAddress(data));

        setShippingData((prev: any) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        dispatch(setShippingAddress(shippingData));
        setActiveStep(1);
    };

    return (
        <>
            <Container className="d-flex justify-content-center">
                <Card
                    variant="outlined"
                    sx={{
                        width: 620,
                    }}>
                    <Form onSubmit={handleSubmit}>




                        <Row className='d-flex align-items-center mb-3'>
                            <Col md={4} >
                                <Typography color="neutral" level="h4" fontSize="xl">
                                    Country
                                </Typography>
                            </Col>
                            <Col md={4}>
                                <FormControl>

                                    <Input
                                        required
                                        placeholder="Enter Country"
                                        type="text"
                                        name="country"
                                        onChange={handleChange}
                                        value={shpData.country}
                                    />

                                </FormControl>
                            </Col>
                        </Row>

                        <Row className='d-flex align-items-center mb-3'>
                            <Col md={4} >
                                <Typography color="neutral" level="h4" fontSize="xl">
                                    Address
                                </Typography>
                            </Col>
                            <Col md={6}>
                                <FormControl>

                                    <Input
                                        required
                                        placeholder="Enter Address"
                                        type="text"
                                        name="address"
                                        onChange={handleChange}
                                        value={shpData.address}
                                    />
                                </FormControl>
                            </Col>
                        </Row>


                        <Row className='d-flex align-items-center mb-3'>
                            <Col md={4} >
                                <Typography color="neutral" level="h4" fontSize="xl">
                                    City
                                </Typography>
                            </Col>
                            <Col md={6}>
                                <FormControl>

                                    <Input
                                        required
                                        placeholder="Enter City"
                                        type="text"
                                        name="city"
                                        onChange={handleChange}
                                        value={shpData.city}
                                    />
                                </FormControl>
                            </Col>
                        </Row>

                        <Row className='d-flex align-items-center mb-3'>
                            <Col md={4} >
                                <Typography color="neutral" level="h4" fontSize="xl">
                                    State
                                </Typography>
                            </Col>
                            <Col md={4}>
                                <FormControl>

                                    <Input
                                        placeholder="Enter State"
                                        type="text"
                                        className="mt-2"
                                        name="state"


                                    />
                                </FormControl>
                            </Col>
                        </Row>

                        <Row className='d-flex align-items-center mb-3'>
                            <Col md={4} >
                                <Typography color="neutral" level="h4" fontSize="xl">
                                    Zip Code
                                </Typography>
                            </Col>
                            <Col md={4}>
                                <FormControl>

                                    <Input
                                        placeholder="Enter Zip Code"
                                        type="number"
                                        name="postalCode"
                                        onChange={handleChange}
                                        value={shpData.postalCode}
                                    />

                                </FormControl>
                            </Col>
                        </Row>




                        <Button
                            type="submit"
                            className="mt-2"
                        >
                            Continue <ArrowCircleRight />
                        </Button>
                    </Form>
                </Card>
            </Container>
        </>
    );
};

export default Shipping;