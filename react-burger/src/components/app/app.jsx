import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Profile, ResetPassword, ForgotPassword, HomePage, Login, Registration, HistoryOrders, Ingredients } from '../../pages';
import IngredientDetails from '../ingredient-details/ingredient-details'
import Modal from '../modal/modal'
import AppHeader from '../app-header/app-header'
import { getStore, authorization, getCookieExport } from '../../services/actions/index.js';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  React.useEffect(() => {
    const token = getCookieExport('accessToken');
    dispatch(getStore());
    console.log(1)
    if (token)
      dispatch(authorization());
  }, [])

  const closeModal = () => {
    navigate(-1);
  }
  const dataBurgers = useSelector(store => store.cartReducer.items);

  return (
    <>
      {dataBurgers.data && dataBurgers.success ? (
        <>
          <AppHeader />
          <Routes location={background || location}>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/orders" element={<HistoryOrders />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/ingredients/:id" element={<IngredientDetails />} />
          </Routes>

          {background && (
            <Routes>
              <Route path={'/ingredients/:id'}
                element={
                  <Modal title="Детали ингредиента" onClose={closeModal}>
                    <IngredientDetails />
                  </Modal>
                }
              />
            </Routes>
          )}
        </>

      ) : 'Loading...'}
    </>
  );
}

export default App;