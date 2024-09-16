import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Alltasks from './pages/AllTasks';
import Completetasks from './pages/Completetasks';
import IncompleteTasks from './pages/IncompleteTasks';
import FavouriteTasks from './pages/FavouriteTasks';
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col transition-colors duration-300 p-2">
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Alltasks />} />
            <Route path="completetasks" element={<Completetasks />} />
            <Route path="incompletetasks" element={<IncompleteTasks />} />
            {/* <Route path="favouritetasks" element={<FavouriteTasks />} /> */}
          </Route>
          <Route path="signup/" element={< Signup/>} />
          <Route path='login/'element={< Login/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
