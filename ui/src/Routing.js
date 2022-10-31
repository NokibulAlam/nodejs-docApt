import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';


//components
import Home from './components/pages/Home';
import Signin from './components/pages/Signin';
import Signup from './components/pages/Signup';
import AppointmentPage from './components/pages/AppointmentPage';

//protected Routing
import PrivateRoute from './components/Private Routes/PrivateRoute';

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path={'/'} element={<PrivateRoute />}>
                    <Route path={'/'} element={<Home />} />
                </Route>

                <Route exact path={'/book-appointment/:doctorId'} element={<PrivateRoute />}>
                    <Route path={'/book-appointment/:doctorId'} element={<AppointmentPage />} />
                </Route>

                <Route path={'/signup'} element={<Signup />} />
                <Route path={'/signin'} element={<Signin />} />
                
            </Routes>
        </BrowserRouter>
    )
}

export default Routing;