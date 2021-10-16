import { Row, Col } from 'react-bootstrap';
import Product from '../../components/Product';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ProductType } from '../../types/product';

const HomePage = () => {

    const [products, setProducts] = useState<ProductType[]>([])

    const loadProducts = async () => {
        const response = await axios.get(
            'http://localhost:8000/api/products/',
            {
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                },
            });
        const data = response.data as ProductType[];
        setProducts(data);
    }


    useEffect(() => {
        loadProducts()
    }, [])

    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                {products.map(product => (
                    <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomePage;