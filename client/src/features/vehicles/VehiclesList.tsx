import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchVehiclesFromCompanyAsync, vehicleSelectors } from "./vehiclesSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Box, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Avatar, Button } from "@mui/material";
import TwoWheelerOutlinedIcon from '@mui/icons-material/TwoWheelerOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import DirectionsBusOutlinedIcon from '@mui/icons-material/DirectionsBusOutlined';
import AgricultureOutlinedIcon from '@mui/icons-material/AgricultureOutlined';
import RvHookupOutlinedIcon from '@mui/icons-material/RvHookupOutlined';
import { Link } from "react-router-dom";

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

const VehiclesList = () => {

    const dispatch = useAppDispatch();

    const {user} = useAppSelector(state => state.account);
    const userCompanyId = user?.companyId;

    const vehicles = useAppSelector(vehicleSelectors.selectAll);
    const {vehiclesLoaded} = useAppSelector(state => state.vehicle);

    useEffect(() => {
        if(!vehiclesLoaded)
            dispatch(fetchVehiclesFromCompanyAsync(userCompanyId!));
    }, [vehiclesLoaded, dispatch, userCompanyId]);

    if(!vehicles)
        return <LoadingComponent message="Učitavanje vozila..." />

    return (
        <>
            <Box display='flex' flexDirection='column' justifyContent='space-between'>
                <Typography variant="h4" gutterBottom sx={{color: 'gray', mb: 4}}>
                    Vozila
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead sx={{backgroundColor: '#339966'}}>
                            <TableRow sx={{color: 'white'}}>
                                <TableCell sx={{color: 'white'}}></TableCell>
                                <TableCell sx={{color: 'white'}} align="left">Id</TableCell>
                                <TableCell sx={{color: 'white'}} align="center">Proizvodjač</TableCell>
                                <TableCell sx={{color: 'white'}} align="center">Model</TableCell>
                                <TableCell sx={{color: 'white'}} align="center">Godina</TableCell>
                                <TableCell sx={{color: 'white'}} align="center">Registarska oznaka</TableCell>
                                <TableCell sx={{color: 'white'}} align="left"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {vehicles.map((vehicle) => (
                                <TableRow
                                    key={vehicle.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell sx={{color: 'gray'}} component="th" scope="row">
                                        <Avatar sx={{ bgcolor: '#99ddb3' }}>
                                            {getIcon(vehicle.category)}
                                        </Avatar>
                                    </TableCell>
                                    <TableCell sx={{color: 'gray'}} align="left">
                                        <Box display='flex' alignItems='left'>
                                            <span>{vehicle.id}</span>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{color: 'gray'}} align="center">
                                        <Box display='flex' justifyContent='center'>
                                            <span>{vehicle.manufacturer}</span>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{color: 'gray'}} align="center">
                                        {vehicle.model}
                                    </TableCell>
                                    <TableCell sx={{color: 'gray'}} align="center">
                                        {vehicle.yearOfManufacture}
                                    </TableCell>
                                    <TableCell sx={{color: 'gray'}} align="center">
                                        {vehicle.registrationPlate}
                                    </TableCell>
                                    <TableCell sx={{color: 'gray'}} align="center">
                                        <Button
                                            component={Link}
                                            to={`/vehicles/${vehicle.id}/${vehicle.ownerId}`} 
                                            variant="contained" 
                                            sx={{backgroundColor: '#339966'}}
                                        >
                                            Pogledaj
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table> 
                </TableContainer>
            </Box>
        </>
    )
}

export default VehiclesList;