import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Navigation from '@/components/Navigation';
import HomePage from '@/pages/HomePage';
import ProvidersPage from '@/pages/ProvidersPage';
import ProviderProfilePage from '@/pages/ProviderProfilePage';
import AdminPage from '@/pages/AdminPage';
import ContactPage from '@/pages/ContactPage';
import Footer from '@/components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#4B6BFB]">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/prestataires" element={<ProvidersPage />} />
          <Route path="/prestataire/:id" element={<ProviderProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
