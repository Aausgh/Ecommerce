
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';


import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Link } from '@mui/joy';
import Stars from '../Rating';
import { useNavigate } from 'react-router-dom';
// import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
// import moment from 'moment';



const HomeList = ({ product }: any) => {

    const navigate = useNavigate();

    return (
        <Card sx={{ width: 193 }}>

            <div>

                <Link
                    onClick={(e) => navigate('/products/${product.id}')}
                    fontWeight="md"
                    color="neutral"
                    textColor="text.primary"
                    overlay

                >
                    {<h5>
                        {product.name.length > 10
                            ? product.name.slice(0, 10) + "..."
                            : product.name}
                    </h5>}
                </Link>

                <IconButton
                    variant="plain"
                    sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
                >
                    <FontAwesomeIcon icon={faCartPlus} size="lg" style={{ color: "#000000", }} />
                </IconButton>

            </div>

            <AspectRatio minHeight="120px" maxHeight="200px">
                <img
                    src={product.productImage}
                    loading="lazy"
                    alt=""
                />
            </AspectRatio>

            <CardContent >

                <div>
                    <Typography fontSize="lg" fontWeight="lg">
                        ${product.price}
                    </Typography>
                </div>

                <Stars product={product} />

            </CardContent>





        </Card >
    );
};
export default HomeList;