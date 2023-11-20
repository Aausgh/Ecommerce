import { useEffect, useState } from "react";
import NavMenu from "../../../components/Navbar";
import { getData } from "../../../services/axios.service";
import { Container } from "react-bootstrap";
import ProductList from "../../../components/user/ProductList";
import Loader from "../../../components/Loader";
import Search from "../../../components/Search";
import Filter from "../../../components/Filter";

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


    function searchProduct(e: any) {
        const searchedData = products.results.filter((product: any) => {
            return product.title && product.title.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setProducts(searchedData);
    }

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



    return (
        <>
            <NavMenu />

            <Container className="d-flex justify-content-between p-4">

                <Filter
                    product={products}
                    categories={categories}
                    filterProducts={filterProducts}
                />
                <Search
                    product={products}
                    searchProduct={searchProduct}
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

                                        <ProductList key={product.id} product={product} />

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