import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useParams, Navigate } from 'react-router-dom';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { registerLicense } from '@syncfusion/ej2-base';
import moment from 'moment';

// APIs
import { isAuthenticate } from '../APIs/Auth';
import { getSingleDoctor, bookAppointment } from '../APIs/CodeApi';

//components
import Layout from '../layouts/Layout';

const AppointmentPage = () => {
    registerLicense('ORg4AjUWIQA/Gnt2VVhjQlFac19JXGJWfVNpR2NbfU5xdV9HZ1ZURWYuP1ZhSXxRd0VgWH5fcXxWQmZUUk0=');

    // fetch user Data
    const { user, token } = isAuthenticate();

    // doctorid from parameter
    const { doctorId } = useParams();
    // console.log(doctorId);

    // State Variable
    // const [date, setDate] = useState();
    // const [time, setTime] = useState();
    const [success, setSuccess] = useState(false);
    const [ values, setValues ] = useState({
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
                    if(data.error) console.log(data.error);
                    else setSuccess(true);
                });
        } catch (error) {
            console.log(error);
        }
    }

    const redirectToHome = () => {
        if(success) {
            return <Navigate to="/" />
        }
    }



    return (
        <Layout>
            {redirectToHome()}
            <Container>
                <Card className="text-center">
                    <Card.Header>Book Your Appointment</Card.Header>
                    <Card.Body>
                        <Card.Title>{doctorData.name}</Card.Title>
                        <Card.Text>
                            <b>Specialization: {doctorData.specialization} and Fees: {doctorData.consultancyFee}</b>
                        </Card.Text>
                        <Card.Text>
                            {/* <b><input type="date" onChange={e => setDate(moment(e.target.value).format("DD-MM-YYYY"))} /></b> */}
                            <b>Date: <input type="date" onChange={e => setValues({ ...values, date: moment(e.target.value).format("DD-MM-YYYY") })} /></b>
                        </Card.Text>
                        <Card.Text style={{ width: "100px" }}>
                            {/* <TimePickerComponent onChange={e => setTime(moment(e.target.value).format("HH:mm"))}></TimePickerComponent> */}
                            <TimePickerComponent onChange={e => setValues({ ...values, time: moment(e.target.value).format("HH:mm") })}></TimePickerComponent>
                        </Card.Text>
                        <Button variant="primary" onClick={bookApt}>Book Apointment</Button>
                    </Card.Body>
                </Card>
            </Container>
        </Layout>
    )
}

export default AppointmentPage;