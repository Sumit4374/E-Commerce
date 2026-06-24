import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductCatalog from './pages/ProductCatalog';
import Auth from './pages/Auth';
import { useAuth } from './context/AuthContext';

function RequireAuth({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex h-[20rem] items-center justify-center">Loading...</div>;
  }

  return user ? children : <Navigate to="/auth" replace />;
}

function App() {
  return (
    <Router>
      <div className="bg-background text-on-background font-body-md min-h-screen antialiased flex flex-col">
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/*" element={
            <RequireAuth>
              <ProductCatalog />
            </RequireAuth>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;