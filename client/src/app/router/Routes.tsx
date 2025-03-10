import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import VehiclesLayout from "../../features/vehicles/VehiclesLayout";
import HomePage from "../../features/home/HomePage";
import Login from "../../features/account/login/Login";
import Register from "../../features/account/register/Register";
import RequireAuth from "./RequireAuth";
import CompanyForm from "../../features/company/CompanyForm";
import VehicleForm from "../../features/vehicles/VehicleForm";
import UserAccount from "../../features/account/UserAccount";
import VehicleDetails from "../../features/vehicles/VehicleDetails";
import NotificationForm from "../../features/notification/NotificationForm";
import NotificationLayout from "../../features/notification/NotificationsLayout";
import CompaniesList from "../../features/company/CompaniesList";
import MaintenanceNotificationDetails from "../../features/notification/MaintenanceNotificationDetails";
import RegistrationNotificationDetails from "../../features/notification/RegistrationNotificationDetails";
import RegisterOwnerForm from "../../features/owner/RegisterOwnerForm";
import RegisterOperatorForm from "../../features/operator/RegisterOperatorForm";
import RegisterAdminForm from "../../features/admin/RegisterAdminForm";
import OperatorsList from "../../features/operator/OperatorsList";
import OperatorProfilePreview from "../../features/operator/OperatorProfilePreview";
import OwnersList from "../../features/owner/OwnersList";
import OwnerProfilePreview from "../../features/owner/OwnerProfilePreview";
import VehiclesList from "../../features/vehicles/VehiclesList";
import VehiclePreview from "../../features/vehicles/VehiclePreview";
import AddOwnersVehicleForm from "../../features/vehicles/AddOwnersVehicleForm";
import RequireGuest from "./RequireGuest";
import RegistrationNotificationForm from "../../features/notification/RegistrationNotificationForm";
import ChangePassword from "../../features/account/changePassword/ChangePassword";
import ResetPassword from "../../features/account/resetPassword/ResetPassword";
import ForgotPassword from "../../features/account/resetPassword/ForgotPassword";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { element: <RequireGuest />, children: [
                { path: '', element: <HomePage /> },
                { path: 'login', element: <Login /> },
                { path: 'register', element: <Register /> },
                { path: 'forgotpassword', element: <ForgotPassword /> },
                { path: 'resetpassword/:email/:token', element: <ResetPassword /> },
            ]},
            {element: <RequireAuth roles={["Owner", "Operator", "Admin", "SuperAdmin"]} />, children: [
                {path: 'myaccount', element: <UserAccount />},
                { path: 'changepassword', element: <ChangePassword /> },
            ]},
            {element: <RequireAuth roles={["SuperAdmin"]} />, children: [
                {path: 'addcompany', element: <CompanyForm />},
                {path: 'companies', element: <CompaniesList />},
                {path: 'addadmin', element: <RegisterAdminForm />},
            ]},
            {element: <RequireAuth roles={["Admin"]} />, children: [
                {path: 'addoperator', element: <RegisterOperatorForm />},
                {path: 'operators', element: <OperatorsList />},
                {path: 'operators/:id', element: <OperatorProfilePreview />},
                {path: 'changeregistrationnotification', element: <RegistrationNotificationForm />},
            ]},
            {element: <RequireAuth roles={["Admin", "Operator"]} />, children: [
                {path: 'addowner', element: <RegisterOwnerForm />},
                {path: 'owners', element: <OwnersList />},
                {path: 'owners/:id', element: <OwnerProfilePreview />},
                {path: 'vehicles', element: <VehiclesList />},
                {path: 'vehicles/:vehicleId/:ownerId', element: <VehiclePreview />},
                {path: 'vehicles/addownersvehicle/:ownerId', element: <AddOwnersVehicleForm />},
            ]},
            {element: <RequireAuth roles={["Owner"]} />, children: [
                {path: 'myvehicles', element: <VehiclesLayout />},
                {path: 'myvehicles/:id', element: <VehicleDetails />},
                {path: 'vehiclenotifications/:id', element: <NotificationLayout />},
                {path: 'vehicleregistrationnotification/:id/:vehicleId', element: <RegistrationNotificationDetails />},
                {path: 'vehiclemaintenancenotification/:id', element: <MaintenanceNotificationDetails />},
                {path: 'addvehicle', element: <VehicleForm />},
                {path: 'addnotification/:id', element: <NotificationForm />},
            ]},
        ]
    }
])