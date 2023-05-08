import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Profile, ResetPassword, ForgotPassword, HomePage, Login, Registration } from '../../pages';
import AppHeader from '../app-header/app-header'
import { getStore, authorization } from '../../services/actions/index.js';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getStore());
    dispatch(authorization());
  }, [])
  const dataBurgers = useSelector(store => store.cartReducer.items);

  return (
    <>
      {dataBurgers.data && dataBurgers.success ? (
        <>
          <BrowserRouter>
            <AppHeader />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
          </BrowserRouter>
        </>
      ) : 'Loading...'}
    </>
  );
}

export default App;