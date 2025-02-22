import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchCurrentAdminProfileData, fetchCurrentOperatorProfileData, fetchCurrentOwnerProfileData, fetchSuperadminProfileData } from "./accountSlice";
import UserProfilePreview from "./UserProfilePreview";

const UserAccount = () => {

    const {user, profileData} = useAppSelector(state => state.account);
    const dispatch = useAppDispatch();
    const userRole = user?.role;

    useEffect(() => {
        switch (userRole) {
            case "Owner":
                dispatch(fetchCurrentOwnerProfileData());
              break;
            case "Operator":
                dispatch(fetchCurrentOperatorProfileData());
              break;
            case "Admin":
                dispatch(fetchCurrentAdminProfileData());
              break;
            case "SuperAdmin":
                dispatch(fetchSuperadminProfileData());
              break;
            default:
              break;
          }
    }, [dispatch]);

    return (
        <>
          <UserProfilePreview  profileData={profileData} userRole={userRole}/>
        </>
    )
}

export default UserAccount;