import { useState, useEffect } from 'react';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom';
import Rating from '../../components/Rating';
import products from '../../products';
import axios from 'axios';
import { ProductType } from '../../types/product';


interface MatchParams {
    id: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> { }


const ProductPage = ({ match }: MatchProps) => {

    const productId = match.params.id;

    const [product, setProduct] = useState({
        _id: '',
        name: '',
        image: '',
        description: '',
        brand: '',
        category: '',
        price: 0,
        countInStock: 0,
        rating: 0,
        numReviews: 0
    });

    const [qty, setQty] = useState(0);

    const loadSingleProduct = async () => {
        const response = await axios.get(
            `http://localhost:8000/api/product/${productId}/`,
            {
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                },
            }
        );
        const data = response.data as ProductType[];
        if (data.length === 1) setProduct(data[0]);
    }

    useEffect(() => {
        loadSingleProduct()
    }, [])

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {product ?
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>

                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                            </ListGroup.Item>

                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>


                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col xs='auto' className='my-1'>
                                                <Form.Control
                                                    as="select"
                                                    value={qty}
                                                    onChange={(e) => setQty(Number(e.target.value))}
                                                >
                                                    {

                                                        Array.from(Array(product.countInStock).keys()).map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))
                                                    }

                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}


                                <ListGroup.Item>
                                    <Button
                                        onClick={() => { }}
                                        className='btn-block'
                                        disabled={product.countInStock === 0}
                                        type='button'>
                                        Add to Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row> : ""}
        </div>
    );
}

export default ProductPage;