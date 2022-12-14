import { observer } from 'mobx-react-lite';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import NotFound from '../pages/NotFound';
import { userStore } from '../store';
import ForgotPassword from './Auth/ForgotPassword';

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
            <Route element={<ProtectRoute auth={userStore.isAuth} redirectPath='/login' />}>
                <Route path="/" element={
                    <Homepage isArchive={false}/>
                } />
                <Route path="/archive" element={
                    <Homepage isArchive={true}/>
                } />
            </Route>
            <Route element={<ProtectRoute auth={!userStore.isAuth} redirectPath='/' />}>
                <Route path="/login" element={
                    <Login />
                } />
                <Route path="/registration" element={
                    <Registration />
                } />
                <Route path="/forgot-password" element={
                    <ForgotPassword />
                }
                />
            </Route>
            <Route
                path="*"
                element={
                    <NotFound />
                }
            />
        </Routes> 
    </>
    )
});

export default AppRouter;