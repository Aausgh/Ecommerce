
import Skeleton from '@mui/joy/Skeleton';
import { AspectRatio, Button, Card, CardContent, CardOverflow, Link, Typography } from '@mui/joy';
import { Rating } from '@mui/material';


const ProductSkeleton = ({ product }: any) => {
    return (
        <>

            <Card sx={{ width: 300, maxWidth: '100%', boxShadow: 'lg' }} className='mb-3'>

                <CardOverflow>
                    <AspectRatio sx={{ minWidth: 200 }}>
                        <Skeleton>
                            <img
                                src={product.productImage}
                                loading="lazy"
                                alt=""
                            />
                        </Skeleton>
                    </AspectRatio>
                </CardOverflow>

                <CardContent>
                    <Skeleton>
                        <Typography level="body-xs">{product.category}</Typography>
                    </Skeleton>

                    <Skeleton>
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
                    </Skeleton>

                    <Skeleton>
                        <Typography
                            level="title-lg"
                            sx={{ mt: 1, fontWeight: 'xl' }}
                        >
                            ${product.price}
                        </Typography>
                    </Skeleton>

                    <Skeleton>
                        <Rating
                            name="read-only"
                            value={product.averageRating}
                            precision={0.5}
                            readOnly
                        />
                    </Skeleton>

                </CardContent>

                <CardOverflow>
                    <Skeleton>
                        <Button variant="solid" color="danger" size="lg">
                            Add to cart
                        </Button>
                    </Skeleton>
                </CardOverflow>




            </Card >





        </>
    )
};

export default ProductSkeleton;