import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShoppingPage } from './pages/ShoppingPage';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShoppingPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
