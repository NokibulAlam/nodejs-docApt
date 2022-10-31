import React, { useState, useEffect } from 'react'
import Layout from '../layouts/Layout';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//APIs
import { getAllDoctors } from '../APIs/CodeApi';

const Home = () => {
  const [doctors, setDoctors] = useState([]);

  const loadDoctors = () => {
    getAllDoctors()
      .then((data) => {
        if (data.error) console.log(data.error);
        else setDoctors(data);
      });
  }

  useEffect(() => {
    loadDoctors();
  }, []);

  return (
    <Layout>
      <Container>
        <Row>
          {doctors.map((doc, i) => {
            return (
              <Col md={3} key={i}>
                <Card>
                  <Card.Header as="h5">{doc.name}</Card.Header>
                  <Card.Body>
                    <Card.Title>{doc.specialization}, {doc.fromTime} - {doc.toTime}</Card.Title>
                    <Card.Text>
                      Number: {doc.phoneNumber}, Fees: {doc.consultancyFee}
                    </Card.Text>
                    <Link to={`/book-appointment/${doc._id}`}><Button variant="primary">Book Appintment</Button></Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </Layout>
  )
}

export default Home;