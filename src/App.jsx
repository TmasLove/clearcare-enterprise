import { Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import { ThemeProvider } from './theme/ThemeContext';
import HomePage from './pages/HomePage';
import SolutionsHubPage from './pages/SolutionsHubPage';
import SegmentPage from './pages/SegmentPage';
import DemoPage from './pages/DemoPage';
import LoginPage from './pages/LoginPage';
import EnrollPage from './pages/EnrollPage';
import NotFoundPage from './pages/NotFoundPage';

function Root() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  );
}

export const routes = [
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'solutions', element: <SolutionsHubPage /> },
      { path: 'solutions/employers', element: <SegmentPage slug="employers" /> },
      { path: 'solutions/tpa', element: <SegmentPage slug="tpa" /> },
      { path: 'solutions/dso', element: <SegmentPage slug="dso" /> },
      { path: 'solutions/associations', element: <SegmentPage slug="associations" /> },
      { path: 'solutions/white-label', element: <SegmentPage slug="whiteLabel" /> },
      { path: 'demo', element: <DemoPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'enroll', element: <EnrollPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
