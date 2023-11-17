
import { AspectRatio, Button, Card, CardContent, CardOverflow, Link, Typography } from '@mui/joy';
import { Rating } from '@mui/material';

// import moment from "moment";


const ProductList = ({ product }: any) => {

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
                <Typography level="body-xs">{product.category}</Typography>

                <Link
                    href="/details"
                    fontWeight="md"
                    color="neutral"
                    textColor="text.primary"
                    overlay

                >
                    {product.name.length > 35
                        ? product.name.slice(0, 35) + "..."
                        : product.name}
                </Link>

                <Typography
                    level="title-lg"
                    sx={{ mt: 1, fontWeight: 'xl' }}
                >
                    ${product.price}
                </Typography>

                <Rating
                    name="read-only"
                    value={product.averageRating}
                    precision={0.5}
                    readOnly
                />

            </CardContent>

            <CardOverflow>
                <Button variant="solid" color="danger" size="lg">
                    Add to cart
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