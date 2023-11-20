import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Counter from '../Counter';
// import Stars from '../Rating';
import { Rating } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getData } from '../../services/axios.service';
import Loader from '../Loader';
import Navmenu from '../Navbar';

const ProductDetail = () => {

    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();

    const getProductById = async () => {
        setIsLoading(true);
        const resp = await getData(`/product/${id}`);
        setProduct(resp);
        setIsLoading(false);

    };

    useEffect(() => {
        getProductById();

    }, [])

    return (
        <>
            <Navmenu />
            {isLoading ?
                <Loader /> :
                <>

                    <Box
                        sx={{
                            width: '100%',
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
                            <AspectRatio flex ratio="1" maxHeight={282} sx={{ minWidth: 282 }}>
                                <img
                                    src="https://images.unsplash.com/photo-1549632891-a0bea6d0355b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZ2UlMjByb3ZlcnxlbnwwfHwwfHx8MA%3D%3D"
                                    srcSet="https://images.unsplash.com/photo-1549632891-a0bea6d0355b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZ2UlMjByb3ZlcnxlbnwwfHwwfHx8MA%3D%3D 2x"
                                    loading="lazy"
                                    alt=""
                                />
                            </AspectRatio>

                            <CardContent>
                                <Typography fontSize="xl" fontWeight="lg">
                                    Range Rover
                                </Typography>

                                <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
                                    Brand: Jaguar
                                </Typography>

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
                                        <Typography level="body-xs" fontWeight="lg">
                                            Price
                                        </Typography>

                                        <Typography fontWeight="lg">$340,000</Typography>
                                    </div>

                                    <div>
                                        <Typography level="body-xs" fontWeight="lg">
                                            Stock
                                        </Typography>

                                        <Typography fontWeight="lg">9</Typography>
                                    </div>

                                    <div>
                                        <Typography level="body-xs" fontWeight="lg">
                                            Rating
                                        </Typography>


                                        <Rating />
                                    </div>

                                </Sheet>

                                <Box sx={{ p: 1.5 }}>
                                    <Typography fontSize="xl" fontWeight="lg">
                                        Quantity
                                    </Typography>
                                    <Counter />

                                </Box>


                                <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
                                    <Button variant="solid" color="primary">
                                        Buy now
                                    </Button>
                                    <Button variant="solid" color="danger">
                                        Add to Cart
                                    </Button>
                                </Box>


                                <Box sx={{ p: 1.5 }}>
                                    <Typography fontSize="xl" fontWeight="lg">
                                        Description
                                    </Typography>

                                    <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
                                        Lorem ipsum dolor, sit amet consectetur
                                    </Typography>

                                </Box>



                            </CardContent>
                        </Card>

                    </Box>

                </>
            };
        </>
    )
}

export default ProductDetail;