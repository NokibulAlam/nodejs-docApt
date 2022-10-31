import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { registerLicense } from '@syncfusion/ej2-base';

// APIs
import { isAuthenticate } from '../APIs/Auth';
import { getSingleDoctor } from '../APIs/CodeApi';

//components
import Layout from '../layouts/Layout';

const AppointmentPage = () => {
    registerLicense('ORg4AjUWIQA/Gnt2VVhjQlFac19JXGJWfVNpR2NbfU5xdV9HZ1ZURWYuP1ZhSXxRd0VgWH5fcXxWQmZUUk0=');

    // fetch user Data
    const { user } = isAuthenticate();

    // State Variable
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [doctorData, setDoctorData] = useState([]);

    // doctorid from parameter
    const { doctorId } = useParams();
    // console.log(doctorId);

    const loadDoctorData = async (docId) => {
        try {
            await getSingleDoctor(docId)
                .then((data) => {
                    // console.log(data);
                    setDoctorData(data);
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadDoctorData(doctorId);
    }, []);

    // const maxTime = (doctorData.toTime);
    const minTime = new Date("31/10/2022 09.00 PM");
    const maxTime = new Date();

    console.log(maxTime);
    console.log(date);
    console.log(time);

    return (
        <Layout>
            <Container>
                <Row>
                    <Col md={12}>
                        <h1>Book Your Appointment</h1>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <h1>Doctor's Name: {doctorData.name}</h1>
                    </Col>
                    <Col md={6}>
                        <h1>Specialization: {doctorData.specialization}</h1>
                    </Col>
                </Row>

                <Row>
                    <Col md={12}>
                        <h3>Fees: {doctorData.consultancyFee}</h3>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <input type="date" onChange={e => setDate(e.target.value)} />
                    </Col>
                    <Col md={6}>
                        <TimePickerComponent min={minTime} max={maxTime} onChange={e => setTime(e.target.value)}></TimePickerComponent>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default AppointmentPage;