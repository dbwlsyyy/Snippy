import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import NewNote from '../pages/NewNote';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="new" element={<NewNote />} />

            {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
    );
}
