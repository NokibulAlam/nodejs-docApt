import React, { useEffect, useState } from 'react';
import Layout from '../layouts/Layout';
import { Container, Table, Row, Col } from 'react-bootstrap';
import moment from 'moment';

// apis
import { isAuthenticate } from '../APIs/Auth';
import { getAllAppointments } from '../APIs/CodeApi';

const UserAppointments = () => {
    const { user, token } = isAuthenticate();

    const [appointments, setAppointments] = useState([]);

    const loadAppointments = async () => {
        try {
            await getAllAppointments(user, token)
                .then((data) => {
                    if (data.error) console.log(data.error);
                    // console.log(data);
                    setAppointments(data);
                })
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        loadAppointments();
    }, []);
    console.log(appointments);
    return (
        <Layout>
            <Container>

                <Row>
                    <Col md={12}>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Doctor's Name</th>
                                    <th>Appointment Time</th>
                                    <th>Phone No</th>
                                </tr>
                            </thead>

                            {appointments.map((apt, i) => {
                                return(
                                    <tbody key={i}>
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{apt.doctorId}</td>
                                            <td>{moment(apt.date).format("MMM Do YY")}</td>
                                            <td>{moment(apt.time).format("LT")}</td>
                                        </tr>
                                    </tbody>
                                )
                            })}

                        </Table>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default UserAppointments;