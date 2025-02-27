import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../store/configureStore'
import AppProvider from './AppProvider'
import { fetchCurrentUser } from '../../features/account/accountSlice';
import LoadingComponent from './LoadingComponent';
import SnackbarToast from '../../features/snackbar/SnackbarToast';

const App = () => {

  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
    } catch (error: any) {
      console.log(error);
    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp])

  if (loading)
    return <LoadingComponent />

  return (
    <>
      <SnackbarToast />
      <AppProvider />
    </>
  )
}

export default App
