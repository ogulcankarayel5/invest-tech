import React from 'react';
import './index.scss';
import { Outlet } from 'react-router-dom';

const SharedLayout = () => {
  return (
    <div className="layout">
      <Outlet />
    </div>
  );
};

export default SharedLayout;
