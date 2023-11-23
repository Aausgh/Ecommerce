
import { Form } from "react-bootstrap";


const Search = ({ searchProduct, product }: any) => {


    return (
        <Form.Control
            type="text"
            name="searchKey"
            className="rounded-4 border-danger-subtle"
            style={{ width: "40%" }}
            placeholder='Search'
            onChange={searchProduct}
        />
    )
}

export default Search;