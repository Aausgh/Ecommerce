
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AspectRatio, Button, Card, CardContent, CardOverflow, Link, Typography } from '@mui/joy';
import Stars from '../Rating';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// import moment from "moment";


const ProductList = ({ product, addProdToCart, removeProdToCart }: any) => {

    const navigate = useNavigate();
    const { cartItem } = useSelector((state: any) => state.product);

    return (
        <Card sx={{ width: 300, maxWidth: '100%', boxShadow: 'lg' }} className='mb-3'>

            <CardOverflow>
                <AspectRatio sx={{ minWidth: 200 }}>
                    <img
                        src={product.productImage}
                        loading="lazy"
                        alt=""
                    />
                </AspectRatio>
            </CardOverflow>

            <CardContent>
                <Typography level="body-xs" className="text-capitalize">{product.category}</Typography>


                <Link
                    onClick={(e: any) => navigate(`/products/${product.id}`)}
                    fontWeight="md"
                    color="neutral"
                    textColor="text.primary"
                    overlay
                >
                    <h5 >
                        {product.name.length > 35
                            ? product.name.slice(0, 35) + "..."
                            : product.name}
                    </h5>
                </Link>


                <Typography
                    level="title-lg"
                    sx={{ mt: 1, fontWeight: 'xl' }}
                >
                    ${product.price}
                </Typography>

                <Stars product={product} />

            </CardContent>

            <CardOverflow>
                <Button
                    variant="solid"
                    color={
                        cartItem.find((item: any) => item.id === product.id)
                            ? "success"
                            : "danger"
                    }
                    size="lg"
                    onClick={(e) => {
                        cartItem.find((item: any) => item.productId === product.id)
                            ? removeProdToCart(product)
                            : addProdToCart(product);
                    }}
                >

                    <FontAwesomeIcon icon={faCartPlus} size="lg" style={{ color: "#ffff", }} />

                </Button>
            </CardOverflow>

            {/* <CardHeader

                title={<h4 className="text-capitalize fw-bold">
                    {product.name.length > 35
                        ? product.name.slice(0, 35) + "..."
                        : product.name}
                </h4>}
            // subheader={moment(product.createdAt).format('YYYY-MM-DD')}
            />

            <CardContent>
                <Typography variant="body2" className=" fw-bold fs-5">
                    ${product.price}
                </Typography> */}

            {/* <Typography variant="body2" className="mb-4">
                    {product.description.length > 40
                        ? product.description.slice(0, 35) + "..."
                        : product.description}
                </Typography> */}


            {/* </CardContent>

            <CardActions disableSpacing>

                <IconButton aria-label="add to cart">
                    <FontAwesomeIcon icon={faCartPlus} size="sm" style={{ color: "#000000", }} />
                </IconButton>


            </CardActions> */}


        </Card >
    );
};
export default ProductList;