import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import PaginaLogin from './paginas/login/login';
import PaginaRegistro from './paginas/registro/register';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PaginaLogin/>} />
        <Route path='/login' element={<PaginaLogin/>} />
        <Route path='/register' element={<PaginaRegistro/>} />
      </Routes>
    </Router>
  );
};

export default App;