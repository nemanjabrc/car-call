import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAppSelector } from "../store/configureStore";

interface Props {
    roles?: string[];
}

const RequireAuth = ({roles}: Props) => {
    const {user} = useAppSelector(state => state.account);
    const location = useLocation();

    if (!user){
        return <Navigate to={'/'} state={{from: location}} replace/>
    }

    if (roles && !roles.includes(user.role)){
        return <Navigate to='/' replace />
    }

    return <Outlet />
}

export default RequireAuth;