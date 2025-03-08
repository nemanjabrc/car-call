import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchOwnerAsync, fetchOwnersVehiclesAsync, ownerSelectors, ownerVehiclesSelectors, setOwnerVehicles } from "./ownerSlice";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import dayjs from "dayjs";
import { Box, Grid, Avatar, Typography, AvatarGroup, Tooltip, Button } from "@mui/material";
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'; 
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import VehicleSlider from "../vehicles/vehicleCard/vehicleSlider/VehicleSlider";
import DeleteOwnerDialog from "./DeleteOwnerDialog";

const getServiceName = (service: string | undefined) => {
    switch (service) {
        case "EmailService":
            return "Email"
        case "SMSService":
            return "SMS"
        case "WhatsAppService":
            return "WhatsApp"
        default:
            break;
    }
}

const getServiceIcon = (service: string | undefined) => {
    switch (service) {
        case "EmailService":
            return <EmailOutlinedIcon sx={{color: "#D14836"}} />
        case "SMSService":
            return <SmsOutlinedIcon sx={{color: "#42A5F5"}} /> 
        case "WhatsAppService":
            return <WhatsAppIcon sx={{color: "#25D366"}} /> 
        default:
            break;
    }
}

const getNumberOfVehiclesInfo = (numberOfVehicles: number) => {
    if(numberOfVehicles == 1) {
        return <Typography variant="h6" color="gray">
                    1 vozilo
                </Typography>
    }
    else {
        return <Tooltip title={numberOfVehicles + " vozila"} placement="right">
                    <AvatarGroup total={numberOfVehicles}>
                        <Avatar>
                            <DirectionsCarFilledOutlinedIcon />
                        </Avatar>
                    </AvatarGroup>
                </Tooltip>
    }
}

const OwnerProfilePreview = () => {

    const dispatch = useAppDispatch();
    const {id} = useParams<{id: string}>();
    const owner = useAppSelector(state => ownerSelectors.selectById(state, parseInt(id!)));
    const vehicles = useAppSelector(ownerVehiclesSelectors.selectAll);
    const {ownerLoaded} = useAppSelector(state => state.owner);
    const {ownerVehiclesLoaded} = useAppSelector(state => state.owner);

    useEffect(() => {
        dispatch(setOwnerVehicles());
        if(!owner && id || ownerLoaded == false) {
            dispatch(fetchOwnerAsync(parseInt(id!)));
        }
    }, [id, owner, ownerLoaded, dispatch]);

    useEffect(() => {
        if(!ownerVehiclesLoaded) {
            dispatch(fetchOwnersVehiclesAsync(parseInt(id!)));
        }
    }, [id, ownerVehiclesLoaded, dispatch]);


    if(!owner)
        return <LoadingComponent message="Učitavanje profila vlasnika..." />

    const creationDate = dayjs(owner.creationDate);

    return (
        <Box display='flex' justifyContent='center' alignItems='center' sx={{m: 3, p: 4}}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={12}>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                        <Box display='flex' justifyContent='start' alignItems='center' gap={4}>
                            <Avatar
                                sx={{ width: 150, height: 150, bgcolor: '#99ddb3' }}
                            >
                                <Typography variant="h2" sx={{color: '#fff'}}>
                                    {owner.name[0].toUpperCase()}{owner.surname[0].toUpperCase()}
                                </Typography>
                                <Typography 
                                    sx={{
                                        position: 'absolute',
                                        bottom: 20,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        color: '#fff',
                                    }}
                                >
                                    vlasnik
                                </Typography>
                            </Avatar>
                            <Box display='flex' flexDirection='column' justifyContent='center' gap={1.5}>
                                <Box>
                                    <Typography variant="h3" fontWeight='bold' color='#339966'>
                                        @{owner.username}
                                    </Typography>
                                </Box>
                                <Box display='flex' justifyContent='start' alignItems='center' gap={1.5}>
                                    <Typography variant="h4" color="gray">
                                        {owner.name}
                                    </Typography>
                                    <Typography variant="h4" color="gray">
                                        {owner.surname}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                           <DeleteOwnerDialog ownerId={owner.id} username={owner.username} name={owner.name} surname={owner.surname} /> 
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={4} md={4}>
                    <Box display='flex' flexDirection='column' justifyContent='start' mt={10}>
                        <Box display='flex' justifyContent='start' alignItems='center' gap={2} color='gray'>
                            <EmailOutlinedIcon />
                            <Typography variant="h6" color="gray">
                                {owner.email}
                            </Typography>
                        </Box>                        
                        <Box display='flex' justifyContent='start' alignItems='center' gap={2} color='gray'>
                            <CallOutlinedIcon />
                            <Typography variant="h6">
                                {owner.phoneNumber}
                            </Typography>
                        </Box>
                        <Box display='flex' justifyContent='start' alignItems='center' gap={2} color='gray'>
                            <BusinessOutlinedIcon />
                            <Typography variant="h6">
                                {owner.companyName}
                            </Typography>
                        </Box>
                        <Box display='flex' justifyContent='start' alignItems='center' gap={2} color='gray'>
                            {getServiceIcon(owner.notificationService)}
                            <Typography variant="h6">
                                {getServiceName(owner.notificationService)}
                            </Typography>
                        </Box>
                        <Box display='flex' justifyContent='start' alignItems='center' gap={2} color='gray' mt={3}>
                            {owner?.numberOfVehicles! > 0 ? (
                                getNumberOfVehiclesInfo(owner.numberOfVehicles)
                            ) : (
                                <Box display='flex' justifyContent='start' alignItems='center' gap={2} color='gray'>
                                    <InfoOutlinedIcon />
                                    <Typography variant="h6">
                                        Nema dodatih vozila.
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                        <Box mt={3}>
                            <Button
                                component={Link}
                                to={`/vehicles/addownersvehicle/${owner.id}`}
                                variant="contained" 
                                sx={{backgroundColor: '#339966'}} 
                                endIcon={<AddCircleOutlineIcon />}
                            >
                                Dodaj vozilo
                            </Button>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={8} md={8} mt={5}>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        {owner?.numberOfVehicles! > 0 && <VehicleSlider vehicles={vehicles} ownerId={owner.id} />}
                    </Box>
                </Grid>

                <Grid item xs={12} sm={8} md={8} mt={7}>
                    <Box>
                        <Typography variant="body2" color="gray">
                            Nalog kreiran {creationDate.format('DD.MM.YYYY')}.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default OwnerProfilePreview;