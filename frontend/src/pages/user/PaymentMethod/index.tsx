

import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addPaymentMethod } from "../../../slice/productSlice";
import { Card, Container, Button } from "@mui/joy";
import { ArrowCircleLeft, ArrowCircleRight } from "@mui/icons-material";


import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';



const PaymentMethod = ({ activeStep, setActiveStep }: any) => {

    const [paymentMethod, setPaymentMethod] = useState<any>("esewa");
    const dispatch = useDispatch();

    function submitHandler(e: any) {
        e.preventDefault();

        if (paymentMethod) {
            dispatch(addPaymentMethod(paymentMethod));
            setActiveStep(2);
        } else {
            console.error("Please select a payment method.");
        }
    }

    return (
        <>


            <Container className="d-flex justify-content-center">
                <Card
                    variant="outlined"
                    sx={{
                        boxShadow: 'lg',
                        width: 400,
                        maxWidth: '100%',


                    }}
                >

                    <Form onSubmit={submitHandler}>
                        <FormControl>

                            <FormLabel id="demo-radio-buttons-group-label">
                                Choose payment method
                            </FormLabel>



                            {/* <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="esewa"
                                name="radio-buttons-group"
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >

                                <FormControlLabel
                                    value="Esewa"
                                    control={<Radio />}
                                    label="Esewa"
                                />

                                <FormControlLabel
                                    value="Khalti"
                                    control={<Radio />}
                                    label="Khalti"
                                />

                            </RadioGroup> */}

                            <RadioGroup aria-label="Your plan" name="people" defaultValue="Individual" onChange={(e) => setPaymentMethod(e.target.value)}>
                                <List
                                    sx={{
                                        minWidth: 240,
                                        '--List-gap': '0.5rem',
                                        '--ListItem-paddingY': '1rem',
                                        '--ListItem-radius': '8px',
                                        '--ListItemDecorator-size': '32px',
                                    }}
                                >
                                    {['Esewa', 'Khalti', 'Paypal'].map((item) => (
                                        <ListItem variant="outlined" key={item} sx={{ boxShadow: 'sm', display: 'flex', alignItems: 'center' }}>
                                            <Radio
                                                overlay
                                                value={item}
                                                label={item}
                                                sx={{ flexGrow: 1, flexDirection: 'row-reverse' }}
                                                slotProps={{
                                                    action: ({ checked }) => ({
                                                        sx: (theme) => ({
                                                            ...(checked && {
                                                                inset: -1,
                                                                border: '2px solid',
                                                                borderColor: theme.vars.palette.primary[500],
                                                            }),
                                                        }),
                                                    }),
                                                }}
                                                required

                                            />

                                        </ListItem>
                                    ))}
                                </List>
                            </RadioGroup>


                        </FormControl>

                        <br />



                        <div className="d-flex justify-content-between mt-3">
                            <Button
                                color="warning"
                                onClick={(e) => setActiveStep(0)}

                            >
                                <ArrowCircleLeft /> Back
                            </Button>

                            <Button
                                type="submit"
                            >
                                Continue <ArrowCircleRight />
                            </Button>
                        </div>


                    </Form>
                </Card>
            </Container>
        </>
    );
};

export default PaymentMethod;