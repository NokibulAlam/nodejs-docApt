import React, { useEffect } from 'react';
import Layout from '../layouts/Layout';

// apis
import { isAuthenticate } from '../APIs/Auth';
import { getAllAppointments } from '../APIs/CodeApi';

const UserAppointments = () => {
    const { user, token } = isAuthenticate();

    const loadAppointments = () => {
        getAllAppointments(user, token)
            .then((data) => {
                if(data.error) console.log(data.error)
                console.log(data);
            })
    }
    useEffect(() => {
        loadAppointments();
    }, []);
    return (
        <Layout>
            <h1>{user.name}</h1>
        </Layout>
    )
}

export default UserAppointments;