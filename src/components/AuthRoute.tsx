import { FC, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../components/context/FirebaseContext';

interface IAuthRouteProps {
    children: any
}
 
const AuthRoute: FC<IAuthRouteProps> = props => {

    const { children } = props;
    const auth = useContext(FirebaseContext);
    // const auth = getAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        AuthCheck();
        return () => AuthCheck();
    }, [auth]);

    const AuthCheck = onAuthStateChanged(auth, (user) => {
        if (user) {
            setLoading(false);
        } else {
            console.log('unauthorized');
            navigate('/login');
        }
    });

    if (loading) return <p>loading...</p>

    return <>{children}</>;
}
 
export default AuthRoute;