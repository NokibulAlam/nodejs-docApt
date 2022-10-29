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

export const signIn = (user) => {
    return fetch(`${API}/signin`, {
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

export const authenticate = (data, next) => {
    if (typeof window !== undefined) return localStorage.setItem("JWT", JSON.stringify(data));
    next();
};

export const isAuthenticate = () => {
    if (typeof window == undefined) {
        return false;
    }

    if (localStorage.getItem("JWT")) {
        return JSON.parse(localStorage.getItem("JWT"));
    }
    return false;

};

export const signOut = (next) => {
    if(typeof window !== undefined){
        localStorage.removeItem("JWT");
        next();

        return fetch(`${API}/signout`, {
            method: "GET",
        })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err);
        });
    }
}