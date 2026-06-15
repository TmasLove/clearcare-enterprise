import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SolutionsHubPage from './pages/SolutionsHubPage';
import SegmentPage from './pages/SegmentPage';
import DemoPage from './pages/DemoPage';
import LoginPage from './pages/LoginPage';
import EnrollPage from './pages/EnrollPage';
import NotFoundPage from './pages/NotFoundPage';
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="solutions" element={<SolutionsHubPage />} />
        <Route path="solutions/employers" element={<SegmentPage slug="employers" />} />
        <Route path="solutions/tpa" element={<SegmentPage slug="tpa" />} />
        <Route path="solutions/dso" element={<SegmentPage slug="dso" />} />
        <Route path="solutions/associations" element={<SegmentPage slug="associations" />} />
        <Route path="solutions/white-label" element={<SegmentPage slug="whiteLabel" />} />
        <Route path="demo" element={<DemoPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="enroll" element={<EnrollPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
