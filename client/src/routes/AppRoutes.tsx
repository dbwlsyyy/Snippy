import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import NewNote from '../pages/NewNote';
import NoteListPage from '../pages/NoteListPage';
import NoteDetailPage from '../pages/NoteDetailPage';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="new" element={<NewNote />} />
            <Route path="/notes" element={<NoteListPage />} />
            {/* <Route path="/snippets" element={<SnippetListPage />} /> */}
            <Route path="/notes/:id" element={<NoteDetailPage />} />
            <Route path="/notes/edit/:id" element={<NewNote />} />

            {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
    );
}
