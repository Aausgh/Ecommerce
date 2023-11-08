import { Col, Row, Form, Image } from "react-bootstrap";
import { Container, TextField, Button, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { successToast } from "../../../services/toaster.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { object, string } from "yup";
import { AuthInterface } from "../../../interface/auth.interface";
import { postData } from "../../../services/axios.service";
import { login } from "../../../slice/authSlice";

const Login = () => {
      let initailValues = {
            email: "",
            password: "",
      };

      const dispatch = useDispatch();
      const navigate = useNavigate();

      let authValidationSchema = object({
            email: string().email().required("Email is required"),
            password: string()
                  .min(8, "Passsword should be a least 8 character")
                  .required("Password is required"),
      });

      const loginHandler = async (values: AuthInterface) => {
            const resp = await postData("/auth/login", values);

            if (resp.status === "success") {
                  const data = {
                        jwt: resp.token,
                        role: resp.authData.role,
                        email: resp.authData.email,
                  };
                  dispatch(login(data));

                  if (resp.authData.role === "admin") {
                        navigate("/products");
                  } else if (resp.authData.role === "user") {
                        navigate("/all/products");
                  }

                  successToast("User is logged in successfully");
            }
      };

      return (
            <>
                  <Container>
                        <Row className="d-flex justify-content-between align-items-center vh-100">
                              <Col xs={12} md={12}>
                                    <div className="d-flex shadow ">
                                          <Image
                                                className="w-50 rounded-start"
                                                src="https://images.unsplash.com/photo-1512729343400-4fcf83a18f72?auto=format&fit=crop&q=80&w=2072&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                          />

                                          <Card className="w-50 bg-body-secondary">
                                                <Formik
                                                      initialValues={initailValues}
                                                      validationSchema={authValidationSchema}
                                                      onSubmit={loginHandler}
                                                >
                                                      {({
                                                            handleChange,
                                                            handleSubmit,
                                                            errors,
                                                            touched,
                                                            handleBlur,
                                                      }) => (
                                                            <Form className="w-75 m-auto p-3 " onSubmit={handleSubmit}>
                                                                  <h1>Login </h1>
                                                                  <p>Login to access the page.</p>

                                                                  <div className="mb-4">
                                                                        <TextField
                                                                              id="email"
                                                                              label="Email"
                                                                              name="email"
                                                                              variant="outlined"
                                                                              required
                                                                              fullWidth
                                                                              placeholder="Enter Your Email"
                                                                              autoFocus
                                                                              onChange={handleChange}
                                                                              onBlur={handleBlur}
                                                                        />
                                                                        <span className="text-danger">
                                                                              {touched.email && errors.email}
                                                                        </span>
                                                                  </div>

                                                                  <div>
                                                                        <TextField
                                                                              id="password"
                                                                              name="password"
                                                                              variant="outlined"
                                                                              required
                                                                              fullWidth
                                                                              onBlur={handleBlur}
                                                                              label="Password"
                                                                              placeholder="Enter password here"
                                                                              onChange={handleChange}
                                                                        />
                                                                        <span className="text-danger">
                                                                              {touched.password && errors.password}
                                                                        </span>
                                                                  </div>

                                                                  <p className="mb-5">
                                                                        <a
                                                                              href="./signup"
                                                                              className="text-danger text-decoration-none float-end"
                                                                        >
                                                                              Forgot Password?
                                                                        </a>
                                                                  </p>

                                                                  <Button type="submit" variant="contained">
                                                                        Login
                                                                  </Button>
                                                                  <br />

                                                                  <Button
                                                                        type="submit"
                                                                        variant="contained"
                                                                        className="bg-white text-black mt-3"
                                                                  >
                                                                        <FontAwesomeIcon
                                                                              icon={faGoogle}
                                                                              size="xl"
                                                                              style={{ color: "#ff0000" }}
                                                                              className="me-2"
                                                                        />
                                                                        Login with Google
                                                                  </Button>

                                                                  <p className="text-center mt-2">
                                                                        Don't Have a Account?
                                                                        <a
                                                                              href="./signup"
                                                                              className="ms-2 text-decoration-none"
                                                                        >
                                                                              Signup
                                                                        </a>
                                                                  </p>
                                                            </Form>
                                                      )}
                                                </Formik>
                                          </Card>
                                    </div>
                              </Col>
                        </Row>
                  </Container>
            </>
      );
};

export default Login;
