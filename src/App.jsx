import { Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { PageTransitionProvider } from './components/PageTransition';
import { LandingPage } from './features/landing/LandingPage';
import { LaPelosaPage } from './features/la-pelosa/LaPelosaPage';
import { RoomDetailPage } from './features/rooms/RoomDetailPage';
import { AdminPage } from './features/admin/AdminPage';
import { CheckoutPage } from './features/booking/pages/CheckoutPage';

function App() {
  return (
    <PageTransitionProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/la-pelosa" element={<LaPelosaPage />} />
        <Route path="/camere/:slug" element={<RoomDetailPage />} />
        <Route path="/prenota/conferma" element={<CheckoutPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </PageTransitionProvider>
  );
}

export default App;
