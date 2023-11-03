import { Col, Row, Form, Image } from "react-bootstrap";
import { Container, TextField, Button, Card } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { errorToast, successToast } from "../../../services/toaster.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'


const Login = () => {

      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");

      const navigate = useNavigate();

      const loginSubmitHandler = async (e: any) => {
            e.preventDefault();
            const data = {
                  email,
                  password,
            };
            try {
                  const resp = await axios.post("http://localhost:8080/api/v1/auth/login", data);

                  console.log(resp.data);

                  if (resp.data.status) {
                        navigate("/Signup");
                        successToast(resp.data.message)
                  }
            }
            catch (error: any) {

                  errorToast(error.response.data.message)
            }

      }

      return (
            <>
                  <Container>
                        <Row className="d-flex justify-content-center w-100 ">

                              <Col xs={12} md={12}>
                                    <Card className="d-flex shadow">

                                          <Image className="w-50" src="https://images.unsplash.com/photo-1512729343400-4fcf83a18f72?auto=format&fit=crop&q=80&w=2072&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" rounded-start />


                                          <Card className="w-50 bg-body-secondary">
                                                <Form onSubmit={loginSubmitHandler} className="w-75 m-auto p-3 ">
                                                      <h1>Login </h1>

                                                      <TextField
                                                            id="email"
                                                            label="Email"
                                                            variant="outlined"
                                                            className="mb-4"
                                                            required
                                                            fullWidth
                                                            placeholder="Enter Your Email"
                                                            autoFocus
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

                                                      <p>
                                                            <a href="./signup" className='text-danger text-decoration-none'>Forgot Password?</a>
                                                      </p>

                                                      <Button type="submit" variant="contained">
                                                            Login
                                                      </Button><br />

                                                      <Button type="submit" variant="contained" className="bg-white text-black mt-3">
                                                            <FontAwesomeIcon icon={faGoogle} size="xl" style={{ color: "#ff0000", }} className="me-2" />
                                                            Login with Google
                                                      </Button>

                                                      <p className='text-center mt-2'>Don't Have a Account?
                                                            <a href="./signup" className='ms-2 text-decoration-none'>Signup</a>
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

export default Login;