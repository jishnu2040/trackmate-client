import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Alltasks from './pages/AllTasks';
import Completetasks from './pages/Completetasks';
import IncompleteTasks from './pages/IncompleteTasks';
import FavouriteTasks from './pages/FavouriteTasks';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col transition-colors duration-300 p-2">
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Alltasks />} />
            <Route path="completetasks" element={<Completetasks />} />
            <Route path="incompletetasks" element={<IncompleteTasks />} />
            <Route path="favouritetasks" element={<FavouriteTasks />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
