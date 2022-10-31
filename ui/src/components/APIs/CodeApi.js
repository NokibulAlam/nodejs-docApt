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