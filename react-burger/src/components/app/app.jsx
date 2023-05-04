import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ForgotPassword, HomePage, Login, Registration } from '../../pages';
import AppHeader from '../app-header/app-header'
import { getStore } from '../../services/actions/index.js';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getStore());
  }, [])
  const dataBurgers = useSelector(store => store.cartReducer.items);

  return (
    <>
      {dataBurgers.data && dataBurgers.success ? (
        <>
          <BrowserRouter>
            <AppHeader />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Routes>
          </BrowserRouter>
        </>
      ) : 'Loading...'}
    </>
  );
}

export default App;