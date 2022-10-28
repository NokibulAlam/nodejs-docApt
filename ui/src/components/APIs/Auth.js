const API = 'http://localhost:4000/api';

export const signUp = (user) => {
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(user),
    })
    .then((res) => {
        return res.json();
    })
    .catch((err) => {
        return err;
    });
};