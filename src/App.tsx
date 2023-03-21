import { Routes, Link, Route } from 'react-router-dom';
import './pages/home/data';
import './pages/home/home';
import { Home } from './pages/home/home';
import { About } from './pages/aboutUs/about';
import { Form } from './pages/form/form';
import { Notfound } from './pages/notFound/notfoundpage';

function App(): JSX.Element {
  return (
    <>
      <header>
        <div className="header">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/form">Form</Link>
          {/* <Link to="/404">Not found page</Link> */}
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/form" element={<Form />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
