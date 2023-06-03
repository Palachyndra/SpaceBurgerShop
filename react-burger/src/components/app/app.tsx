import React, { Dispatch } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Profile, ResetPassword, ForgotPassword, HomePage, Login, Registration, HistoryOrders, Ingredients } from '../../pages';
import IngredientDetails from '../ingredient-details/ingredient-details'
import Modal from '../modal/modal'
import AppHeader from '../app-header/app-header'
import { getStore, authorization, getCookieExport } from '../../services/actions/index';
import { useSelector, useDispatch } from 'react-redux';
import { TLocation } from '../../types/generalTypes'

function App() {
  const dispatch: Dispatch<any> = useDispatch();
  // const location = useLocation<TLocation>(); - не работает
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state as { background?: Location};

  React.useEffect(() => {
    const token: string | undefined = getCookieExport('accessToken');

    dispatch(getStore());
    if (token)
      dispatch(authorization());
  }, [])

  const closeModal = () => {
    navigate(-1);
  }
 
  // @ts-ignore
  const dataBurgers: any = useSelector(store => store.cartReducer.items);

  return (
    <>
      {dataBurgers.data && dataBurgers.success ? (
        <>
          <AppHeader />
          <Routes location={location}>
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