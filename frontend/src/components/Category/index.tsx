import { List, ListItem, ListItemButton, ListSubheader } from '@mui/joy';
import Sheet from '@mui/joy/Sheet';
import { useState } from 'react';

const Category = ({ products, categories }: any) => {

    const [setProducts] = useState<any>({});

    function filterProducts(data: any) {
        if (data !== "") {
            const filteredProd = products.results.filter((item: any) => {
                return item.category === data;
            });
            setProducts(filteredProd);
        } else {
            setProducts(data.results);
        }
    }

    return (
        <Sheet
            variant="outlined"
            sx={{
                width: 180,
                maxHeight: 400,
                overflow: 'auto',
                borderRadius: 'sm',

            }}
            onChange={(e) => filterProducts(e.target.value)}
        >
            <List>
                <ListSubheader>Categories</ListSubheader>

                {categories.map((category: any) => {
                    return (
                        <ListItem>
                            <ListItemButton >
                                {category}
                            </ListItemButton>
                        </ListItem>
                    );
                })}



            </List>
        </Sheet >
    )
}

export default Category;