import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Detail from './routes/Detail';
import SharedLayout from './components/SharedLayout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="detail/:id" element={<Detail />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
