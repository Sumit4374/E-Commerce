import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductCatalog from './pages/ProductCatalog';
import Auth from './pages/Auth';

function App() {
  return (
    <Router>
      <div className="bg-background text-on-background font-body-md min-h-screen antialiased flex flex-col">
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/*" element={<ProductCatalog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
