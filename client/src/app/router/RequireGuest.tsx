import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";

const RequireGuest = () => {
    const { user } = useAppSelector(state => state.account);

    if (user) {
        return <Navigate to="/myaccount" replace />;
    }

    return <Outlet />;
}

export default RequireGuest;