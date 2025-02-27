import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchMaintenanceNotificationsAsync, fetchRegistrationNotificationAsync, maintenanceNotificationSelector, registrationNotificationSelector, setNotification } from "./notificationSlice";
import { Link, useParams } from "react-router-dom";
import { Box, Divider, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { vehicleSelectors, fetchVehicleAsync } from "../vehicles/vehiclesSlice";
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import RegistrationNotificationCard from "./registrationNotificationCard/RegistrationNotificationCard";
import MaintenanceNotificationCard from "./maintenanceNotificationCard/MaintenanceNotificationCard";


const NotificationLayout = () => {
    
    const {id} = useParams<{id: string}>();
    const vehicleId = parseInt(id!);
    const maintenanceNotifications = useAppSelector(maintenanceNotificationSelector.selectAll);
    const registrationNotification = useAppSelector(registrationNotificationSelector.selectAll);

    const {maintenanceNotificationsLoaded, registrationNotificationLoaded} = useAppSelector(state => state.notification);
    const dispatch = useAppDispatch();

    const vehicle = useAppSelector(state => vehicleSelectors.selectById(state, parseInt(id!)));

    useEffect(() => {
        dispatch(setNotification());
        if(!vehicle && id) {
            dispatch(fetchVehicleAsync(parseInt(id)));
        }
    }, [id, vehicle, dispatch]);

    useEffect(() => {
        if(!maintenanceNotificationsLoaded) {
            dispatch(fetchMaintenanceNotificationsAsync(vehicleId));
        }
    }, [id, vehicle, maintenanceNotificationsLoaded, dispatch])

    useEffect(() => {
        if(!registrationNotificationLoaded) {
            dispatch(fetchRegistrationNotificationAsync(vehicleId));
        }
    }, [id, vehicle, registrationNotificationLoaded, dispatch])

    if(!maintenanceNotificationsLoaded)
        return <LoadingComponent message="Učitavanje notifikacija..." />
        
    if(!registrationNotificationLoaded)
        return <LoadingComponent message="Učitavanje notifikacije..." />

    if(!vehicle)
        return <LoadingComponent message="Učitavanje vozila..." />

    return (
        <Box sx={{m: 3}}>
            <Box display='flex' justifyContent='space-between' alignItems='center' mb={2}>
                <Typography variant="h5" fontWeight='bold' color="grey">Podsjetnici</Typography>
                <Box display='flex' justifyContent='start' alignItems='center' gap={1}>
                    <Typography variant="h5" fontWeight='bold' color="#339966">{vehicle.manufacturer}</Typography>
                    <Typography variant="h5" fontWeight='bold' color="grey">{vehicle.model}</Typography>
                    <Typography variant="h5" fontWeight='bold' color="grey">({vehicle.registrationPlate})</Typography>
                </Box>
                <Box>
                    <Tooltip title="Dodaj novi podsjetnik" placement="bottom-start">
                        <IconButton 
                            component={Link}
                            to={`/addnotification/${id}`}
                            size="large"
                            sx={{ 
                                backgroundColor: "#339966", 
                                color: "#fff", 
                                "&:hover": { 
                                    backgroundColor: "#339966", 
                                    color: "#fff" 
                                } 
                            }}     
                        > 
                            <NotificationAddOutlinedIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <Divider /> 
            <Box ml={10} mt={-2}>
                <Grid container rowSpacing={6} spacing={4} alignItems="strech" sx={{ width: "100%", mt: 0, mb: 0 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <RegistrationNotificationCard vehicle={vehicle} notification={registrationNotification} />
                    </Grid>
                    {maintenanceNotifications.map(notification => (
                        <Grid item xs={12} sm={6} md={3} key={notification.id}>
                            <MaintenanceNotificationCard notification={notification} />
                        </Grid>  
                    ))}
                </Grid>  
            </Box>
        </Box>
    )
}

export default NotificationLayout;