
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';


import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Link } from '@mui/joy';
import moment from 'moment';



const HomeList = ({ product }: any) => {

    return (
        <Card sx={{ width: 320 }}>

            <div>

                <Link
                    href="/details"
                    fontWeight="md"
                    color="neutral"
                    textColor="text.primary"
                    overlay

                >
                    {<h5>
                        {product.name.length > 25
                            ? product.name.slice(0, 25) + "..."
                            : product.name}
                    </h5>}
                </Link>

            </div>

            <AspectRatio minHeight="120px" maxHeight="200px">
                <img
                    src={product.productImage}
                    loading="lazy"
                    alt=""
                />
            </AspectRatio>

            <CardContent orientation="horizontal">

                <div>
                    <Typography fontSize="lg" fontWeight="lg">
                        ${product.price}
                    </Typography>
                </div>



                <Button
                    variant="solid"
                    size="md"
                    color="primary"
                    aria-label="Explore Bahamas Islands"
                    sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                >
                    <FontAwesomeIcon icon={faCartPlus} size="lg" style={{ color: "#ffff", }} />
                </Button>
            </CardContent>





        </Card >
    );
};
export default HomeList;