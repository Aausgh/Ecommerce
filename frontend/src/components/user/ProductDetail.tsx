import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';


import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getData } from '../../services/axios.service';
import Loader from '../Loader';
import Navmenu from '../Navbar';
import { Rating, Input, FormControl } from '@mui/material';
import { Chip, Container } from '@mui/joy';

import Search from '../Search';
import { InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { successToast } from '../../services/toaster.service';
import { addToCart } from "../../slice/productSlice";
import { payloadForCartItem } from "../../helpers/product";
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const ProductDetail = () => {

    const [product, setProduct] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    let [qty, setQty] = useState("");

    const dispatch = useDispatch();


    const getProductById = async () => {
        setIsLoading(true);
        const resp = await getData(`/product/${id}`);
        setProduct(resp);
        setIsLoading(false);

    };

    useEffect(() => {
        getProductById();

    }, [])




    const handleAddToCart = (quantity: any) => {
        const data: any = payloadForCartItem(product.data, quantity);
        dispatch(addToCart(data));
        successToast(data.productName + "added to cart successfully");
    };


    return (
        <>
            <Navmenu />



            {isLoading ? (
                <Loader />
            ) : (

                <Container >

                    {product.status === "success" && (

                        <>
                            <Container className="d-flex justify-content-center p-4">


                                <Search />

                            </Container>

                            <Box
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'relative',
                                    overflow: { xs: 'auto', sm: 'initial' },
                                }}

                                className="p-3"
                            >

                                <Card
                                    orientation="horizontal"
                                    sx={{
                                        width: '100%',
                                        flexWrap: 'wrap'
                                    }}
                                >
                                    <AspectRatio flex ratio="1" maxHeight={482} sx={{ minWidth: 482 }}>
                                        <img
                                            src={product.data.productImage}

                                            loading="lazy"
                                            alt=""
                                        />
                                    </AspectRatio>

                                    <CardContent>


                                        <Typography

                                            level="h2"
                                            sx={{ mt: 1, fontWeight: 'xl' }}
                                            className="title text-dark "
                                            endDecorator={
                                                <Chip component="span" size="sm" variant="soft" color="success">
                                                    {product.data.countInStock > 0
                                                        ? product.data.countInStock < 5
                                                            ? "Low In Stock"
                                                            : "In Stock"
                                                        : "Out of Stock"}
                                                </Chip>
                                            }
                                        >
                                            {product.data.name}
                                        </Typography>


                                        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', '& > button': { flex: 1 } }}>
                                            <Typography fontSize="lg" fontWeight="lg">
                                                Brand
                                            </Typography>

                                            <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
                                                {product.data.brand}
                                            </Typography>

                                        </Box>

                                        <Sheet
                                            sx={{
                                                bgcolor: 'background.level1',
                                                borderRadius: 'sm',
                                                p: 1.5,
                                                my: 1.5,
                                                display: 'flex',
                                                gap: 2,
                                                '& > div': { flex: 1 },
                                            }}
                                        >
                                            <div>

                                                <Typography
                                                    level="h3"
                                                    className="title text-dark "
                                                >
                                                    ${product.data.price}
                                                </Typography>
                                            </div>

                                            <div>

                                                <Rating
                                                    name='read-only'
                                                    value={product.data.averagerating}
                                                    precision={0.5}
                                                    readOnly
                                                />

                                            </div>

                                        </Sheet>

                                        <hr />

                                        <InputGroup className='mb-3' style={{ width: 150 }}>

                                            <Typography >Quantity</Typography>
                                            <div className="d-flex">
                                                <Button
                                                    className='px-3'
                                                    onClick={() => setQty((prevQty) => String(Math.max(1, parseInt(prevQty, 10) - 1)))}

                                                    disabled={parseInt(qty, 10) <= 1}
                                                    variant="outlined"
                                                >
                                                    <FontAwesomeIcon icon={faMinus} style={{ color: "#000000" }} />
                                                </Button>

                                                <FormControl
                                                    variant="standard"
                                                    sx={{ display: 'flex', alignItems: 'center' }}
                                                    className="border"
                                                >

                                                    <Input
                                                        id="quantity"
                                                        type="number"
                                                        inputProps={{ min: 1, max: product.data.countInStock }}
                                                        value={qty}
                                                        onChange={(e) => setQty(e.target.value)}
                                                    />
                                                </FormControl>

                                                <Button
                                                    className='btn-light px-3'
                                                    onClick={() => setQty((prevQty) => String(Math.min(product.data.countInStock, parseInt(prevQty, 10) + 1)))}
                                                    disabled={qty >= product.data.countInStock}
                                                    variant="outlined"
                                                >
                                                    <FontAwesomeIcon icon={faPlus} style={{ color: "#000000" }} />
                                                </Button>
                                            </div>
                                        </InputGroup>



                                        <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
                                            <Button variant="solid" color="primary">
                                                Buy now
                                            </Button>

                                            <Button
                                                variant="solid"
                                                color="danger"
                                                onClick={() => handleAddToCart(qty)}>
                                                <FontAwesomeIcon icon={faCartPlus} size="lg" style={{ color: "#ffff", }} />
                                                Add to Cart
                                            </Button>
                                        </Box>


                                        <Box sx={{ p: 1.5 }}>
                                            <Typography fontSize="xl" fontWeight="lg">
                                                Description
                                            </Typography>

                                            <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
                                                {product.data.description}
                                            </Typography>

                                        </Box>

                                    </CardContent>
                                </Card>

                            </Box>
                        </>
                    )}
                </Container>

            )};
        </>
    )
}

export default ProductDetail;