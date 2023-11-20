import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardContent, IconButton, Typography } from '@mui/joy';
import { useState } from 'react'


const Counter = () => {


    let [count, setCount] = useState(0);

    const increment = (e: any) => {
        e.preventDefault();
        setCount(count + 1);

    }

    const decrement = (e: any) => {
        e.preventDefault();
        setCount(count - 1);
    }


    return (
        <Card orientation="horizontal" variant="outlined" sx={{ width: 140 }}>


            <CardContent orientation="horizontal">
                <IconButton
                    variant="soft"
                    color="neutral"
                    size="sm"
                    onClick={decrement}>

                    <FontAwesomeIcon icon={faMinus} style={{ color: "#000000", }} />

                </IconButton>

                <Typography fontSize="xl" fontWeight="lg">{count}</Typography>

                <IconButton
                    variant="soft"
                    color="neutral"
                    size="sm"
                    onClick={increment}>

                    <FontAwesomeIcon icon={faPlus} style={{ color: "#000000", }} />

                </IconButton>
            </CardContent>

        </Card>
    );
};

export default Counter;