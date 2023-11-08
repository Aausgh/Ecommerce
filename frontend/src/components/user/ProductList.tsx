import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";


const ProductList = ({ product }: any) => {

    return (
        <Card sx={{ maxWidth: 300 }} className="mb-4">

            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }

                title={product.name}
                subheader={moment(product.createdAt).format('YYYY-MM-DD')}
            />

            <CardMedia
                component="img"
                height="194"
                image={product.productImage}
                alt="Paella dish"
            />

            <CardContent>
                <Typography variant="body2" color="text.secondary" className=" fw-bold mb-3">
                    ${product.price}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {product.description.length > 40
                        ? product.description.slice(0, 35) + "..."
                        : product.description}
                </Typography>
            </CardContent>

            <CardActions disableSpacing>

                <IconButton aria-label="add to cart">
                    <FontAwesomeIcon icon={faCartPlus} size="sm" style={{ color: "#000000", }} />
                </IconButton>

                <IconButton aria-label="share">View</IconButton>

            </CardActions>


        </Card >
    );
};
export default ProductList;