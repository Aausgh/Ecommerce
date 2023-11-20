
import Navmenu from '../../../components/Navbar'
import { Container, Row, Col } from 'react-bootstrap'
import Carousels from '../../../components/Carousels'
import HomeList from '../../../components/user/HomeList'
import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { getData } from "../../../services/axios.service";
import Search from '../../../components/Search';
import { Card } from '@mui/joy';


const Home = () => {

    const [products, setProducts] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);


    const getProducts = async () => {
        setIsLoading(true);
        const resp = await getData("/product");

        setProducts(resp.data);

        setIsLoading(false);
    };


    useEffect(() => {
        getProducts();
    }, []);


    return (
        <>
            <Navmenu />

            <Container>

                <Container className="d-flex justify-content-center p-4">
                    <Search
                        product={products}

                    />
                </Container>

                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        {products.status === "success" && (
                            <>
                                <Container className='p-3 mb-5' style={{ height: 344, width: 938 }} >
                                    <Carousels />
                                </Container>

                                <Container className='p-3 rounded mt-2 mb-3'>
                                    <h3 className='text-black mb-1 ms-3'>Just For You</h3>

                                    <Container className='d-flex flex-row flex-wrap gap-3'>
                                        {products.results
                                            // .filter((product: any) => product.category === "Smartphone")
                                            .slice(0, 6)
                                            .map((product: any) => (

                                                <HomeList product={product} />

                                            ))}
                                    </Container>

                                </Container>

                                <Container className='p-3 rounded mt-2 mb-3'>
                                    <h3 className='text-black mb-1 ms-3'>Smartphones</h3>

                                    <Container className='d-flex flex-row flex-wrap gap-3'>
                                        {products.results
                                            .filter((product: any) => product.category === "Smartphone")
                                            .slice(0, 8)
                                            .map((product: any) => (

                                                <HomeList product={product} />

                                            ))}
                                    </Container>

                                </Container>
                            </>

                        )}
                    </>
                )}
            </Container>
        </>
    )
}

export default Home