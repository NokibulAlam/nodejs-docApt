import React from 'react';
import Menu from '../includes/Menu';
import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
    return (
        <div>
            <Menu />
            <Container fluid>
                <Row>

                    <Col md={12} className="mt-5">
                        <div>
                            {children}
                        </div>
                    </Col>

                </Row>
            </Container>
        </div >
    )
}

export default Layout;