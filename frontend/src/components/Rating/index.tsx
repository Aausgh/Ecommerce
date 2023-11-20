import { Rating } from '@mui/material';

const Stars = ({ product }: any) => {
    return (
        <Rating
            name="read-only"
            value={product.averageRating}
            precision={0.5}
            readOnly
        />
    )
}

export default Stars;