import { useEffect, useState } from "react";
import NavbarComponent from "../../../components/Navbar";
import { getData } from "../../../services/axios.service";
import { Col, Container, Form, Row } from "react-bootstrap";
import ProductList from "../../../components/user/ProductList";

const UserProducts = () => {
    const [products, setProducts] = useState<any>({});
    // const [categories, setCategories] = useState([]);

    const getProducts = async () => {
        const resp = await getData("/product");

        setProducts(resp.data);

        // const categories = resp.data.products.map((product: any) => {
        //     return product.category;
        // });

        // setCategories(categories);
    };

    useEffect(() => {
        getProducts();
    }, []);

    // function searchProduct(e: any) {
    //     const searchedData = products.filter((product: any) => {
    //         return product.title.toLowerCase().includes(e.target.value.toLowerCase());
    //     });
    //     setProducts(searchedData);
    // }

    // function filterProducts(data: any) {
    //     if (data !== "") {
    //         const filteredProd = products.filter((item: any) => {
    //             return item.category === data;
    //         });
    //         setProducts(filteredProd);
    //     } else {
    //         setProducts(products);
    //     }
    // }

    return (
        <>
            <NavbarComponent />

            {products.status === "success" && (

                <Container>
                    <div className="d-flex justify-content-between mb-3 p-4">

                        <Form.Select
                            style={{ width: "170px" }}
                            size="sm"
                            className="rounded-pill border-black"
                        // onChange={(e) => filterProducts(e.target.value)}
                        >
                            <option value="">Filter by category</option>
                            {/* {categories.map((category) => {
                                return (
                                    <option key={category} value={category}>
                                        <b>{category}</b>
                                    </option>
                                );
                            })} */}
                        </Form.Select>


                        <Form.Control
                            type="text"
                            name="searchKey"
                            className="rounded-pill border-black"
                            style={{ width: "10%" }}
                            placeholder='Search'
                        // onChange={searchProduct}
                        />

                    </div>
                    <Container className=" d-flex flex-wrap gap-3">
                        <Row>
                            {products.results.map((product: any) => {
                                return (
                                    <Col key={product.id} sm={12} md={6} lg={4} xs={3}>
                                        <ProductList product={product} />
                                    </Col>
                                );
                            })}
                        </Row>
                    </Container>
                </Container>
            )}

        </>
    );
};

export default UserProducts;