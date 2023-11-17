import { useEffect, useState } from "react";
import NavMenu from "../../../components/Navbar";
import { getData } from "../../../services/axios.service";
import { Container, Form } from "react-bootstrap";
import ProductList from "../../../components/user/ProductList";
import Loader from "../../../components/Loader";

const UserProducts = () => {
    const [products, setProducts] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState<any>([]);


    const getProducts = async () => {
        setIsLoading(true);
        const resp = await getData("/product");

        setProducts(resp.data);


        const newcategories = resp.data.results.map((results: any) => {
            return results.category;
        });
        setCategories([...new Set(newcategories)]);


        setIsLoading(false);
    };


    useEffect(() => {
        getProducts();
    }, []);


    function filterProducts(data: any) {
        if (data !== "") {
            const filteredProd = products.results.filter((item: any) => {
                return item.category === data;
            });
            setProducts(filteredProd);
        } else {
            setProducts(data.results);
        }
    }

    function searchProduct(e: any) {
        const searchedData = products.results.filter((product: any) => {
            return product.title && product.title.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setProducts(searchedData);
    }




    return (
        <>
            <NavMenu />

            <Container className="d-flex justify-content-between p-4">

                <Form.Select
                    style={{ width: "170px" }}
                    size="sm"
                    className="rounded-pill border-black"
                    onChange={(e) => filterProducts(e.target.value)}
                >
                    <option value="">Filter by category</option>
                    {categories.map((category: any) => {
                        return (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        );
                    })}
                </Form.Select>

                <Form.Control
                    type="text"
                    name="searchKey"
                    className="rounded-pill"
                    style={{ width: "40%" }}
                    placeholder='Search'
                    onChange={searchProduct}
                />


            </Container>

            {isLoading ? (
                <Loader />
            ) : (
                <>

                    <Container>


                        {products.status === "success" && (

                            <Container className=" d-flex flex-wrap gap-3">

                                {products.results.map((product: any) => {
                                    return (

                                        <ProductList product={product} />

                                    );
                                })}

                            </Container>

                        )}
                    </Container>
                </>
            )}

        </>
    );
};

export default UserProducts;