import { ExaminationRoutes } from '../features/examinations';

export const publicRoutes = [
  {
    path: '/examination/*',
    element: <ExaminationRoutes />,
  },
];
