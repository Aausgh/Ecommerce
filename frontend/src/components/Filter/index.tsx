
import { Form } from "react-bootstrap";


const Filter = ({ filterProducts, categories }: any) => {


    return (
        <Form.Select
            style={{ width: "140px" }}
            size="sm"
            className="rounded-4 border-danger-subtle"
            onChange={(e) => filterProducts(e.target.value)}
        >
            <option value="">Categories</option>
            {categories.map((category: any) => {
                return (
                    <option key={category} value={category}>
                        {category}
                    </option>
                );
            })}
        </Form.Select>
    )
}

export default Filter;