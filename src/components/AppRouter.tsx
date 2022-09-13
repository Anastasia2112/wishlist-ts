import { observer } from 'mobx-react-lite';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import store from '../store/Store';
import CheckContextProvider from './context/CheckContext';

interface ProtectRouteProps {
    ({ auth, redirectPath } : { auth: boolean| undefined, redirectPath: string }): JSX.Element,
}

const AppRouter = observer(() => {

    const ProtectRoute: ProtectRouteProps = ({ auth, redirectPath = '/' }) => {
        if (auth) {
          return <Outlet />;
        }
    
        return <Navigate to={redirectPath} replace />;
    }

    return (
    <>
        <Routes>
            <Route element={<ProtectRoute auth={store.isAuth} redirectPath='/login' />}>
                <Route path="/" element={
                    <CheckContextProvider >
                        <Homepage />
                    </CheckContextProvider> 
                } />
            </Route>
            <Route element={<ProtectRoute auth={!store.isAuth} redirectPath='/' />}>
                <Route path="/login" element={
                    <Login />
                } />
                <Route path="/registration" element={
                    <Registration />
                } />
            </Route>
            {/* <Route
                path="*"
                element={<Navigate to="/" replace/>}
            /> */}
        </Routes> 
    </>
    )
});

export default AppRouter;