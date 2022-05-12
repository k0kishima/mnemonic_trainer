import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ExaminationsList } from '../';

export const ExaminationRoutes = () => {
  return (
    <Routes>
      <Route path="list" element={<ExaminationsList />} />
    </Routes>
  );
};
