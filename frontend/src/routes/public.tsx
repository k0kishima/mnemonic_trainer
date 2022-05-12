import React from 'react';
import { ExaminationRoutes } from '$frontend/features/examinations';

export const publicRoutes = [
  {
    path: '/examination/*',
    element: <ExaminationRoutes />,
  },
];
