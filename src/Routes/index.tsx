import { useContext } from 'react';
import { Navigate, Outlet, redirect, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { Assets } from '../pages/Assets';
import { CreateAsset } from '../pages/Assets/CreateAsset';
import { Companies } from '../pages/Companies';
import { CreateCompany } from '../pages/Companies/CreateCompany';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { NotFound } from '../pages/NotFound';
import { Units } from '../pages/Units';
import { CreateUnit } from '../pages/Units/CreateUnit';
import { Users } from '../pages/Users';
import { CreateUser } from '../pages/Users/CreateUser';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='*' element={<NotFound />} />
      <Route path='/' element={<Home />} />
      <Route path='/users' element={<Users />} />
      <Route path='/users/create-user' element={<CreateUser />} />
      <Route path='/units' element={<Units />} />
      <Route path='/units/create-unit' element={<CreateUnit />} />
      <Route path='/companies' element={<Companies />} />
      <Route path='/companies/create-company' element={<CreateCompany />} />
      <Route path='/assets' element={<Assets />} />
      <Route path='/assets/create-asset' element={<CreateAsset />} />
    </Routes>
  );
};

export const LoginRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
    </Routes>
  );
};
