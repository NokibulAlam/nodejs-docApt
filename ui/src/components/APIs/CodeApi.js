const API = 'http://localhost:4000/api';

export const getAllDoctors = () => {
    return fetch(`${API}/doctors`, {
            method: "GET",
        })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            return err.json();
        });
};


// Read Single Doctor
export const getSingleDoctor = (doctorId) => {
    return fetch(`${API}/doctor/${doctorId}`, {
            method: "GET",
        })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            return err.json();
        });
};

// Book Appointment
export const bookAppointment = (data, token) => {
    return fetch(`${API}/appointment/book/${data.userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            return err;
        });
    // console.log(JSON.stringify(data));
};


// check Availability
export const checkAvailability = (data, token) => {
    return fetch(`${API}/appointment/availability`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            return err;
        });
};

export const getAllAppointments = (data, token) => {
    return fetch(`${API}/appointments/${data._id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
    .then((res) => {
        return res.json();
    })
    .catch((err) => {
        return err.json();
    });
};

