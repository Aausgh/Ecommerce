import { useEffect, useState } from "react";
import NavMenu from "../../../components/Navbar";
import { getData, getDataWithParams } from "../../../services/axios.service";
import { Container } from "react-bootstrap";
import ProductList from "../../../components/user/ProductList";
import Loader from "../../../components/Loader";
import Search from "../../../components/Search";
import Filter from "../../../components/user/Filter";
import { payloadForCartItem } from "../../../helpers/product";
import { successToast } from "../../../services/toaster.service";
import { addToCart, removeFromCart } from "../../../slice/productSlice";
import { useDispatch } from "react-redux";


const UserProducts = () => {
    const [products, setProducts] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState<any>([]);
    const [sort, setSort] = useState<any>([]);
    const [filters, setFilters] = useState<any>({});

    const dispatch = useDispatch();


    const getProducts = async () => {
        setIsLoading(true);
        const resp = await getData("/product");


        const newCategories = resp.data.results.map((result: any) => {
            return result.category;
        });
        setCategories([...new Set(newCategories)]);

        setProducts(resp.data);
        setIsLoading(false);
    };

    const fetchFilteredProduct = async () => {
        setIsLoading(true);
        const resp = await getDataWithParams("/product", filters);

        setProducts(resp.data);
        setIsLoading(false);
    };


    useEffect(() => {
        fetchFilteredProduct();
    }, [filters]);

    useEffect(() => {
        handleFilters("sort", sort.join(","));
    }, [sort]);

    const handleSort = (value: string) => {
        sort.includes(value)
            ? setSort(sort.filter((s: string) => s !== value))
            : setSort((prev: any) => {
                return [...prev, value];
            });
    };

    const addProdToCart = (product: any) => {
        const data: any = payloadForCartItem(product, 1);
        dispatch(addToCart(data));

        successToast(data.productName + " added to cart successfully");
    };
    const removeProdToCart = (product: any) => {
        dispatch(removeFromCart(product.id));

        successToast(product.name + " removed from cart successfully");
    };

    const handleFilters = (key: any, value: any) => {
        if (value !== "") {
            setFilters({ ...filters, [key]: value });
        }
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





    return (
        <>
            <NavMenu />

            <Container className="d-flex justify-content-between p-4">

                <Filter
                    categories={categories}
                    handleSort={handleSort}
                    handleFilters={handleFilters}
                    sort={sort}
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

                                {products.results
                                    .filter((product: any) => product.countInStock > 0)
                                    .map((product: any) => {
                                        return (

                                            <ProductList key={product.id}
                                                product={product}
                                                addProdToCart={addProdToCart}
                                                removeProdToCart={removeProdToCart}
                                            />

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