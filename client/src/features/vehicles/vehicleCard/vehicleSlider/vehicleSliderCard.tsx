import "../vehicleSlider/vehicleSliderCard.styles.css";
import { CardMedia, CardContent, Typography, CardActions, Button, Avatar, Box } from "@mui/material";
import TwoWheelerOutlinedIcon from '@mui/icons-material/TwoWheelerOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import DirectionsBusOutlinedIcon from '@mui/icons-material/DirectionsBusOutlined';
import AgricultureOutlinedIcon from '@mui/icons-material/AgricultureOutlined';
import RvHookupOutlinedIcon from '@mui/icons-material/RvHookupOutlined';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from '@mui/icons-material/Error';
import dayjs from "dayjs";
import { Vehicle } from "../../../../app/models/vehicle";
import { Link } from "react-router-dom";

interface Props {
    vehicle: Vehicle;
    ownerId: number;
}

const getIcon = (category: string) => {
    switch (category) {
        case 'Automobili':
            return <DirectionsCarFilledOutlinedIcon />
        case 'Motocikli':
            return <TwoWheelerOutlinedIcon />
        case 'Teretna vozila':
            return <LocalShippingOutlinedIcon />
        case 'Autobusi/minibusi':
            return <DirectionsBusOutlinedIcon />
        case 'ATV/UTV/QUAD':
            return <AgricultureOutlinedIcon />
        case 'Prikolice':
            return <RvHookupOutlinedIcon />   
        default:
            break;
    }
}

const formatRegistrationMessage: any = (daysTillExpiration: number) => {
    if(daysTillExpiration === 0) {   
        return <>
                    <Typography variant="body2" color="red">Registracija ističe danas</Typography>
                    <ErrorIcon sx={{ ml: 0.21, fontSize: 20, color: 'red' }} />
                </>
    }
    else if (daysTillExpiration < 0) {
        return <>
                    <Typography variant="body2" color="red">Registracija ne važi</Typography>
                    <ErrorIcon sx={{ ml: 1, fontSize: 20, color: 'red' }} />
                </>
    }
    else if (daysTillExpiration > 0) {
        return <>
                    <Typography variant="caption" color="#FFB000">Registracija ističe uskoro...</Typography>
                </>
    }
}


const VehicleCard = ({vehicle, ownerId}: Props) => {

    const today = dayjs().startOf('day');
    const dateOfExpiration = dayjs(vehicle.dateOfExpiration);
    
    const daysTillExpiration = dateOfExpiration.diff(today, 'day');

    return(
        <Box className="slider-card-box" sx={{ width: 230 }}>
            <CardMedia sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 0.5, mb:1}}>
                <Avatar>
                    {getIcon(vehicle.category)}
                </Avatar>
            </CardMedia>
            <CardContent>
                <Typography variant="h5" component="div" sx={{ color: '#339966', fontWeight: 'bold' }}>
                    {vehicle.manufacturer}
                </Typography>
                <Typography variant="h6" sx={{ color: 'grey', fontWeight: 'bold' }}>
                    {vehicle.model}
                </Typography>
                <Typography gutterBottom variant="body1" sx={{ color: 'grey' }}>
                    {vehicle.yearOfManufacture}
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey' }}>
                    {vehicle.registrationPlate}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'grey' }}>
                    {vehicle.isRegistered ? (
                        <>
                            <Typography variant="body2">
                                Registracija važi
                            </Typography>
                            <CheckCircleIcon sx={{ ml: 1, fontSize: 20, color: 'green' }} />
                        </>
                    ) : (
                        formatRegistrationMessage(daysTillExpiration)
                    )}
                </Box>
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Button
                    component={Link}
                    to={`/vehicles/${vehicle.id}/${ownerId}`}
                    variant="contained"
                    className="card-button"
                    sx={{
                    transform: 'translate(-50%, 125%)',
                    width: '60%',
                    fontSize: '1rem',
                    position: 'absolute',
                    left: '50%',
                    bottom: 0,
                    opacity: 0,
                    transition: '0.3s ease-out',
                    backgroundColor: '#339966',
                    color: '#fff',
                    }}
                    >
                    Pogledaj
                </Button>
            </CardActions>
        </Box>
    )
}

export default VehicleCard;