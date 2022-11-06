import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useParams, Navigate } from 'react-router-dom';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { registerLicense } from '@syncfusion/ej2-base';
import moment from 'moment';

// APIs
import { isAuthenticate } from '../APIs/Auth';
import { getSingleDoctor, bookAppointment, checkAvailability } from '../APIs/CodeApi';

//components
import Layout from '../layouts/Layout';

const AppointmentPage = () => {
    registerLicense('ORg4AjUWIQA/Gnt2VVhjQlFac19JXGJWfVNpR2NbfU5xdV9HZ1ZURWYuP1ZhSXxRd0VgWH5fcXxWQmZUUk0=');

    // fetch user Data
    const { user, token } = isAuthenticate();

    // doctorid from parameter
    const { doctorId } = useParams();

    // State Variable
    const [booked, setBooked] = useState(false);
    const [available, setAvailable] = useState(false);
    const [success, setSuccess] = useState(0);
    const [error, setError] = useState(0);
    const [values, setValues] = useState({
        doctorId: doctorId,
        userId: user._id,
        date: "",
        time: ""
    });
    const [doctorData, setDoctorData] = useState([]);


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

    const bookApt = async () => {
        try {
            await bookAppointment(values, token)
                .then((data) => {
                    if (data.error) console.log(data.error);
                    else setBooked(true);
                });
        } catch (error) {
            console.log(error);
        }
    }

    const checkAppointment = async () => {
        try {
            await checkAvailability(values, token)
                .then((data) => {
                    if (data.error) {
                        setSuccess(0);
                        setError(data.error);
                        setAvailable(false);
                    }
                    else {
                        // console.log(data);
                        setSuccess(1);
                        setError(0);
                        setAvailable(true);
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }

    const redirectToHome = () => {
        if (booked) {
            return <Navigate to="/" />
        }
    };

    // Show Error Message
    const showError = () => {
        return (
            <div className='alert alert-danger text-center' style={{ display: error ? "" : "none" }}>
                {error}
            </div>
        )
    };


    // Show Error Message
    const showSuccess = () => {
        return (
            <div className='alert alert-info text-center' style={{ display: success ? "" : "none" }}>
                Appointment Available
            </div>
        )
    };

    return (
        <Layout>
            {redirectToHome()}
            {showError()}
            {showSuccess()}

            <Container>
                <Card className="text-center">
                    <Card.Header>Book Your Appointment</Card.Header>
                    <Card.Body>
                        <Card.Title>{doctorData.name}</Card.Title>
                        <Card.Text>
                            <b>Specialization: {doctorData.specialization} and Fees: {doctorData.consultancyFee}</b>
                        </Card.Text>
                        <Card.Text>
                            <b>From: {doctorData.fromTime} - To: {doctorData.toTime}</b>
                        </Card.Text>
                        {!available && (
                            <>
                                <Card.Text>
                                    {/* <b><input type="date" onChange={e => setDate(moment(e.target.value).format("DD-MM-YYYY"))} /></b> */}
                                    <b>Date: <input type="date" onChange={e => setValues({ ...values, date: moment(e.target.value).format("DD-MM-YYYY") })} /></b>
                                </Card.Text>
                                <Card.Text style={{ width: "100px" }}>
                                    {/* <TimePickerComponent onChange={e => setTime(moment(e.target.value).format("HH:mm"))}></TimePickerComponent> */}
                                    <TimePickerComponent onChange={e => setValues({ ...values, time: moment(e.target.value).format("HH:mm") })}></TimePickerComponent>
                                </Card.Text>
                                <Button variant="primary" onClick={checkAppointment}>Check Apointment</Button>
                            </>
                        )}

                        <br />
                        {available && (
                            <>
                                <Card.Text>
                                    <b>You want to book an Appointment on {values.date} at {values.time}</b>
                                </Card.Text>
                                <Button variant="primary" className='mt-3' onClick={() => setAvailable(false) }>Change Time</Button>
                                <br />
                                <Button variant="primary" className='mt-3' onClick={bookApt}>Book Apointment</Button>
                            </>
                        )}

                    </Card.Body>
                </Card>
            </Container>
        </Layout>
    )
}

export default AppointmentPage;