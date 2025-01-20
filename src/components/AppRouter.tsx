import { Route, Routes } from 'react-router-dom';
import AllCats from '../views/AllCats';
import '../styles/components/AppRouter.css';
function AppRouter() {
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<AllCats />} />
        <Route path="/favorites" element={<AllCats />} />
      </Routes>
    </div>
  );
}

export default AppRouter;
