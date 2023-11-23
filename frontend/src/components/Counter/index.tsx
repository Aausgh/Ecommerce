import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Typography } from '@mui/joy';
import { InputGroup } from 'react-bootstrap';


const Counter = ({ product, qty, increment, decrement }: any) => {



    return (
        <>
            <InputGroup className='mb-3' style={{ width: 150 }}>

                <Button
                    className='px-3'
                    onClick={decrement}
                    disabled={qty <= 1}
                    variant="outlined"
                >
                    <FontAwesomeIcon icon={faMinus} style={{ color: "#000000", }} />
                </Button>

                <Typography
                    fontSize="xl"
                    fontWeight="lg"
                    className='text-center form-control 
                    onChange={(e) => setQty(e.target.value)}'>
                    {qty}
                </Typography>

                <Button
                    className='btn-light px-3'
                    onClick={increment}
                    disabled={qty >= product.data.countInStock}
                    variant="outlined">

                    <FontAwesomeIcon icon={faPlus} style={{ color: "#000000", }} />
                </Button>

            </InputGroup>
            {/* <Card orientation="horizontal" variant="outlined" sx={{ width: 140 }}>


                <CardContent orientation="horizontal">
                    <IconButton
                        variant="soft"
                        color="neutral"
                        size="sm"
                        onClick={decrement}
                        disabled={count <= 1}
                    >

                        <FontAwesomeIcon icon={faMinus} style={{ color: "#000000", }} />

                    </IconButton>

                    <Typography fontSize="xl" fontWeight="lg">{count}</Typography>

                    <IconButton
                        variant="soft"
                        color="neutral"
                        size="sm"
                        onClick={increment}

                        disabled={count >= product.countInStock}
                    >

                        <FontAwesomeIcon icon={faPlus} style={{ color: "#000000", }} />

                    </IconButton>
                </CardContent>

            </Card> */}
        </>
    );

};


export default Counter;