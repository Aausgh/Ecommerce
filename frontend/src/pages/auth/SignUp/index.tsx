import { Container, TextField, Button, Card } from "@mui/material";
import { useState } from "react";
import { Col, Row, Form, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast, warningToast } from "../../../services/toaster.service";
import axios from "axios";

const SignUp = () => {

      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [confirmpassword, setConfirmPassword] = useState("");
      const [isLoading, setLoading] = useState("");

      const navigate = useNavigate();

      const registerSubmitHandler = async (e: any) => {
            e.preventDefault();
            if (password !== confirmpassword) {
                  warningToast("Password and Confirm Password must be same")
            } else {
                  const data = {
                        name,
                        password,
                        email,
                  };
                  try {
                        const response = await axios.post("http://localhost:8080/api/v1/auth/register", data);

                        console.log(response.data);

                        if (response.data.status) {
                              navigate("/");
                              successToast(response.data.message);
                        }
                  } catch (error: any) {
                        errorToast(error.response.data.error);
                  }
            }
      };




      return (
            <>
                  <Container>
                        <Row className="d-flex justify-content-center w-100 ">

                              <Col xs={12} md={12}>
                                    <Card className="d-flex shadow">

                                          <Image className="w-50" src="https://images.unsplash.com/photo-1512729343400-4fcf83a18f72?auto=format&fit=crop&q=80&w=2072&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" rounded-start />


                                          <Card className="w-50 bg-body-secondary">
                                                <Form onSubmit={registerSubmitHandler} className="w-75 m-auto p-3  ">
                                                      <h1>Create Account</h1>
                                                      <p>Let's create a account.</p>
                                                      <TextField
                                                            id="name"
                                                            label="Name"
                                                            variant="outlined"
                                                            className="mb-4"
                                                            required
                                                            fullWidth
                                                            placeholder="Enter Your Name"
                                                            autoFocus
                                                            onChange={(e) => setName(e.target.value)}
                                                      />

                                                      <TextField
                                                            id="email"
                                                            label="Email"
                                                            variant="outlined"
                                                            className="mb-4"
                                                            required
                                                            fullWidth
                                                            placeholder="Enter Your Email"
                                                            onChange={(e) => setEmail(e.target.value)}
                                                      />

                                                      <TextField
                                                            id="password"
                                                            label="Password"
                                                            variant="outlined"
                                                            className="mb-4"
                                                            required
                                                            fullWidth
                                                            placeholder="Enter Password"
                                                            onChange={(e) => setPassword(e.target.value)}
                                                      />

                                                      <TextField
                                                            id="confirm-password"
                                                            label="Confirm Password"
                                                            variant="outlined"
                                                            className="mb-4"
                                                            required
                                                            fullWidth
                                                            placeholder="Confirm Password"
                                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                                      />

                                                      <Button type="submit" variant="contained">
                                                            Signup
                                                      </Button>

                                                      <p className='text-center mt-2'>Already Have a Account?
                                                            <a href="./" className='ms-2'>Login</a>
                                                      </p>

                                                </Form>
                                          </Card>
                                    </Card>

                              </Col>
                        </Row>


                  </Container >
            </>
      )
};

export default SignUp;