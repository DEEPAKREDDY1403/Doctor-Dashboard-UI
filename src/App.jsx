import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="appointments" element={<Dashboard />} />
            <Route path="patients" element={<div className="text-center py-12"><h2 className="text-2xl font-bold text-gray-600">Patients - Coming Soon</h2></div>} />
            <Route path="reports" element={<div className="text-center py-12"><h2 className="text-2xl font-bold text-gray-600">Reports - Coming Soon</h2></div>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;