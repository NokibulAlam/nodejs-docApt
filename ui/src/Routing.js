import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//components
import Home from './components/pages/Home';
import Signup from './components/pages/Signup';

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Home />} />
                <Route path={'/signup'} element={<Signup />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing;