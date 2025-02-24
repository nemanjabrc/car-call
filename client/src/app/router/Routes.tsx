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

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {element: <RequireAuth roles={["Admin", "Operator"]} />, children: [
                
            ]},
            {path:'', element: <HomePage />},
            {path: 'myvehicles', element: <VehiclesLayout />},
            {path: 'myvehicles/:id', element: <VehicleDetails />},
            {path: 'vehiclenotifications/:id', element: <NotificationLayout />},
            {path: 'vehicleregistrationnotification/:id/:vehicleId', element: <RegistrationNotificationDetails />},
            {path: 'vehiclemaintenancenotification/:id', element: <MaintenanceNotificationDetails />},
            {path: 'addvehicle', element: <VehicleForm />},
            {path: 'myaccount', element: <UserAccount />},
            {path: 'login', element: <Login />},
            {path: 'register', element: <Register />},
            {path: 'addcompany', element: <CompanyForm />},
            {path: 'companies', element: <CompaniesList />},
            {path: 'addnotification/:id', element: <NotificationForm />},
            {path: 'addowner', element: <RegisterOwnerForm />},
            {path: 'addoperator', element: <RegisterOperatorForm />},
            {path: 'addadmin', element: <RegisterAdminForm />},
            {path: 'operators', element: <OperatorsList />},
            {path: 'operators/:id', element: <OperatorProfilePreview />},
            {path: 'owners', element: <OwnersList />},
            {path: 'owners/:id', element: <OwnerProfilePreview />},
            {path: 'vehicles', element: <VehiclesList />},
            {path: 'vehicles/:vehicleId/:ownerId', element: <VehiclePreview />},
        ]
    }
])