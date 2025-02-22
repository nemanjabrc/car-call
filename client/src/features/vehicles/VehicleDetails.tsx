import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchVehicleAsync, updateVehicle, vehicleSelectors } from "./vehiclesSlice";
import { useEffect, useState } from "react";
import { Alert, Avatar, Box, Button, Grid, IconButton, Paper, Snackbar, Tooltip, Typography } from "@mui/material";
import TwoWheelerOutlinedIcon from '@mui/icons-material/TwoWheelerOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import DirectionsBusOutlinedIcon from '@mui/icons-material/DirectionsBusOutlined';
import AgricultureOutlinedIcon from '@mui/icons-material/AgricultureOutlined';
import RvHookupOutlinedIcon from '@mui/icons-material/RvHookupOutlined';
import LoadingComponent from "../../app/layout/LoadingComponent";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from '@mui/icons-material/Error';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import dayjs from "dayjs";
import agent from "../../app/api/agent";
import DeleteVehicleDialog from "./DeleteVehicleDialog";

const getIcon = (category: string) => {
    switch (category) {
        case 'Automobili':
            return <DirectionsCarFilledOutlinedIcon sx={{ fontSize: '70px'}} />
        case 'Motocikli':
            return <TwoWheelerOutlinedIcon sx={{ fontSize: '70px'}} />
        case 'Teretna vozila':
            return <LocalShippingOutlinedIcon sx={{ fontSize: '70px'}} />
        case 'Autobusi/minibusi':
            return <DirectionsBusOutlinedIcon sx={{ fontSize: '70px'}} />
        case 'ATV/UTV/QUAD':
            return <AgricultureOutlinedIcon sx={{ fontSize: '70px'}} />
        case 'Prikolice':
            return <RvHookupOutlinedIcon sx={{ fontSize: '70px'}} />   
        default:
            break;
    }
}

const formatRegistrationMessage: any = (daysTillExpiration: number) => {
    if(daysTillExpiration === 0) {   
        return <>
                    <Typography variant="h6" color="red">Registracija ističe danas!</Typography>
                    <ErrorIcon sx={{ ml: 1, fontSize: 20, color: 'red' }} />
                </>
    }
    else if (daysTillExpiration == -1) {
        return <>
                    <Typography variant="h6" color="red">Registracija je istekla prije {Math.abs(daysTillExpiration)} dan!</Typography>
                    <ErrorIcon sx={{ ml: 1, fontSize: 20, color: 'red' }} />
                </>
    }
    else if (daysTillExpiration < -1) {
        return <>
                    <Typography variant="h6" color="red">Registracija je istekla prije {Math.abs(daysTillExpiration)} dana!</Typography>
                    <ErrorIcon sx={{ ml: 1, fontSize: 20, color: 'red' }} />
                </>
    }
    else if (daysTillExpiration == 1) {
        return <>
                    <Typography variant="h6" color="#FFB000">Registracija ističe za {daysTillExpiration} dan!</Typography>
                    <InfoOutlinedIcon sx={{ ml: 1, fontSize: 20, color: '#FFB000' }} />
                </>
    }
    else if (daysTillExpiration > 1) {
        return <>
                    <Typography variant="h6" color="#FFB000">Registracija ističe za {daysTillExpiration} dana!</Typography>
                    <InfoOutlinedIcon sx={{ ml: 1, fontSize: 20, color: '#FFB000' }} />
                </>
    }
}


const VehicleDetails = () => {

    const dispatch = useAppDispatch();
    const {id} = useParams<{id: string}>();
    const vehicle = useAppSelector(state => vehicleSelectors.selectById(state, parseInt(id!)));
    const {vehicleLoaded} = useAppSelector(state => state.vehicle);

    const [RenewSuccesAlert, setRenewSuccesAlert] = useState(false);

    const handleRegistrationRenewUpdate = async (vehicleId: number) => {
        try {
            await agent.Vehicle.renewVehicleRegistration(vehicleId);
            dispatch(updateVehicle());
            setRenewSuccesAlert(true);
        } catch (error: any) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(!vehicle && id || vehicleLoaded == false) {
            dispatch(fetchVehicleAsync(parseInt(id!)));
        }
    }, [id, vehicle, vehicleLoaded, dispatch]);


    if(!vehicle)
        return <LoadingComponent message="Učitavanje podataka o vozilu..." />

    const today = dayjs().startOf('day');
    const dateOfExpiration = dayjs(vehicle.dateOfExpiration);

    const daysTillExpiration = dateOfExpiration.diff(today, 'day');

    return (
        <Box component={Paper} display='flex' justifyContent='center' alignItems='center' pt={2} pb={3}>
            <Grid container spacing={0}>
               <Grid item xs={12} sm={12} md={12}>
                    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap={1}>
                        <Avatar
                            sx={{ width: 120, height: 120}}
                        >
                            {getIcon(vehicle.category)}
                        </Avatar>
                        <Typography variant="h6" color="grey">{vehicle.category}</Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                    <Box display='flex' justifyContent='space-between' mt={5} ml={5} mr={5}>
                        <Box display='flex' flexDirection='column' justifyContent='start'>
                            <Box display='flex' justifyContent='start' alignItems='end' gap={2}>
                                <Typography variant="h3" fontWeight='bold' color="#339966">{vehicle.manufacturer}</Typography>
                                <Typography variant="h4" fontWeight='bold' color="grey">{vehicle.model}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="h4" color="grey">{vehicle.yearOfManufacture}</Typography>
                            </Box>
                            <Box display='flex' flexDirection='column' justifyContent='start' alignItems='start' mt={4}>
                                <Typography variant="h6" color="grey">{vehicle.registrationPlate}</Typography>
                                <Box display='flex' justifyContent='start' alignItems='center' gap={1}>
                                    {vehicle.isRegistered ? (
                                        <>
                                            <Typography variant="h6" color="grey">
                                                Registracija važi
                                            </Typography>
                                            <CheckCircleIcon sx={{ ml: 1, fontSize: 20, color: 'green' }} />
                                        </>
                                    ) : (
                                        formatRegistrationMessage(daysTillExpiration)
                                    )}
                                </Box>
                                <Box>
                                    {daysTillExpiration > 30 ? (                                 
                                            <Typography gutterBottom variant="body1" color="grey">
                                                {daysTillExpiration} dana do isteka registracije ({dateOfExpiration.format('DD.MM.YYYY')}.)
                                            </Typography>
                                        ) : (
                                            <Typography gutterBottom variant="body1" color="grey">
                                                Datum isteka registracije: {dateOfExpiration.format('DD.MM.YYYY')}.
                                            </Typography>
                                        )
                                    }
                                </Box>
                            </Box>
                        </Box>
                        <Box display='flex' flexDirection='column' justifyContent='start' alignItems='center' gap={2} mt={5}>
                            <Button 
                                disabled={vehicle.isRegistered} 
                                variant="contained" 
                                sx={{backgroundColor: '#339966'}} 
                                onClick={() => handleRegistrationRenewUpdate(vehicle.id)} 
                                endIcon={<PublishedWithChangesOutlinedIcon />}
                            >
                                Obnovi registraciju
                            </Button>
                            {vehicle.isRegistered ? (
                                <Typography variant="caption" color="grey">
                                    Ova opcija će biti dostupna počevši od 30 dana prije isteka važenja tekuće registracije. 
                                </Typography>
                            ) : (
                                <Typography variant="caption" color="grey">
                                    Ukoliko ste registrovali Vaše vozilo, označite to ovdje kako biste dobijali pravovremene i izbjegli nepotrebne notifikacije.  
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                    <Box display='flex' justifyContent='space-between' alignItems='center' ml={5} mr={5}>
                        <Box>
                            <Box display='flex' justifyContent='start' alignItems='center' gap={0.5}>
                                <Avatar sx={{ color: '#339966', bgcolor: '#fff'}}>
                                    <NotificationsNoneOutlinedIcon />
                                </Avatar>
                                <Typography variant="h6" color="grey">{vehicle.numberOfNotifications} podsjetnika</Typography>
                            </Box>
                            <Box display='flex' justifyContent='flex-start' alignItems='center' gap={3} mt={1}>
                                <Button component={Link} to={`/vehiclenotifications/${id}`} variant="contained" sx={{backgroundColor: '#339966'}}>
                                    Pogledaj sve
                                </Button>
                                <Box>
                                    <Tooltip title="Dodaj novi podsjetnik" placement="right">
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
                        </Box>
                        <Box>
                            <DeleteVehicleDialog 
                                vehicleId={vehicle.id} 
                                vehicleManufacturer={vehicle.manufacturer} 
                                vehicleModel={vehicle.model} 
                                vehicleregistrationPlate={vehicle.registrationPlate} 
                            />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Snackbar open={RenewSuccesAlert} autoHideDuration={5000} onClose={() => setRenewSuccesAlert(false)}>
                <Alert onClose={() => setRenewSuccesAlert(false)} severity="success">
                    Uspješno ste obnovili registraciju vozila {vehicle.manufacturer} {vehicle.model} ({vehicle.registrationPlate})!
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default VehicleDetails;