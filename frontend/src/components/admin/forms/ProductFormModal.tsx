import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Col, Image, Row, Form } from "react-bootstrap";
import FormControl from "@mui/material/FormControl";
import { InputLabel, MenuItem, Select } from "@mui/material";
import ButtonSpinner from "../../Loader/Spinner";

export default function ProductFormModal({
    open,
    handleClose,
    categories,
    handleChange,
    handleSubmit,
    isSpinning,
    handleUpdate,
    edit,
    product,
}: any) {
    return (
        <Dialog open={open} onClose={handleClose}>

            <DialogTitle>
                {edit ? "Update product form" : "Add Product Form"}
            </DialogTitle>

            <DialogContent>

                {edit && (
                    <Row className="mb-2">
                        <Col md={6}>
                            <Form.Label>Product Image</Form.Label>
                            <br />
                            <Image src={product.productImage} width={"100"} height={"100"} />

                        </Col>
                    </Row>
                )}

                <Row>
                    <Col>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            name="name"
                            label="Product Name"
                            type="text"
                            fullWidth
                            required
                            variant="outlined"
                            onChange={handleChange}
                            value={product.name}
                        />
                    </Col>

                    <Col>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="brand"
                            name="brand"
                            label="Product brand"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                            value={product.brand}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="price"
                            name="price"
                            label="Product price"
                            type="number"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                            value={product.price}
                        />
                    </Col>

                    <Col>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="countInStock"
                            label="Product Stock"
                            type="number"
                            name="countInStock"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                            value={product.countInStock}
                        />
                    </Col>

                </Row>

                <Row>
                    <Col md={6}>
                        <FormControl fullWidth>

                            <InputLabel>Category</InputLabel>
                            <Select
                                value={product.category}
                                label="Category"
                                name="category"
                                onChange={handleChange}
                            >
                                {categories.map((category: any) => {
                                    return (
                                        <MenuItem key={category} value={category}>
                                            {category}
                                        </MenuItem>
                                    );
                                })}
                            </Select>

                        </FormControl>
                    </Col>

                    <Col>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="description"
                            label="Product description"
                            type="text"
                            fullWidth
                            name="description"
                            variant="outlined"
                            onChange={handleChange}
                            value={product.description}
                        />
                    </Col>
                </Row>

                {!edit && (
                    <Row>
                        <Col>
                            <TextField
                                type="file"
                                margin="normal"
                                id="file"
                                fullWidth
                                name="productImage"
                                variant="outlined"
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                    variant="outlined"
                    disabled={isSpinning}
                    onClick={edit ? handleUpdate : handleSubmit}
                >
                    {isSpinning ? <ButtonSpinner /> : edit ? "Update" : "Submit"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}