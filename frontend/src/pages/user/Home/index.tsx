
import Navmenu from '../../../components/Navbar'
import { Container, Row, Col } from 'react-bootstrap'
import Carousels from '../../../components/Carousels'
import HomeList from '../../../components/user/HomeList'
import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { getData } from "../../../services/axios.service";


const Home = () => {

    const [products, setProducts] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);


    const getProducts = async () => {
        setIsLoading(true);
        const resp = await getData("/product");

        setProducts(resp.data);
        console.log(resp.data)
        setIsLoading(false);
    };


    useEffect(() => {
        getProducts();
    }, []);


    return (
        <>
            <Navmenu />

            {isLoading ? (
                <Loader />
            ) : (
                <>
                    {products.status === "success" && (
                        <>
                            <Container className='p-3 rounded-3 mt-2 mb-5' style={{ height: 344, width: 938 }} >
                                <Carousels />
                            </Container>
                            <Container className='p-3 rounded mt-2 mb-3'>
                                <h3 className='text-black mb-4'>Just For You</h3>
                                <Row>
                                    {products.results
                                        .filter((product: any) => product.category === "Smartphone")
                                        .slice(0, 4)
                                        .map((product: any) => (
                                            <Col key={product.id} sm={12} md={6} lg={3} xs={3}>
                                                <HomeList product={product} />
                                            </Col>
                                        ))}
                                </Row>
                            </Container>
                        </>

                    )}
                </>
            )}
        </>
    )
}

export default Home