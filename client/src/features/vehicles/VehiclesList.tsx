import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchVehiclesFromCompanyAsync, setVehicleParams, vehicleSelectors } from "./vehiclesSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Box, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Avatar, Button, Divider } from "@mui/material";
import TwoWheelerOutlinedIcon from '@mui/icons-material/TwoWheelerOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import DirectionsBusOutlinedIcon from '@mui/icons-material/DirectionsBusOutlined';
import AgricultureOutlinedIcon from '@mui/icons-material/AgricultureOutlined';
import RvHookupOutlinedIcon from '@mui/icons-material/RvHookupOutlined';
import { Link } from "react-router-dom";
import { fetchCategories } from "../lookupTables/lookupTablesSlice";
import VehicleSerach from "./VehicleSearch";
import CheckboxButtons from "../../app/components/CheckboxButtons";

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

const categories: string[] = [
    "Automobili",
    "Motocikli",
    "Teretna vozila",
    "Autobusi/minibusi",
    "ATV/UTV/QUAD",
    "Prikolice"
]

const VehiclesList = () => {

    const dispatch = useAppDispatch();

    const {user} = useAppSelector(state => state.account);
    const userCompanyId = user?.companyId;

    const vehicles = useAppSelector(vehicleSelectors.selectAll);
    const {vehiclesLoaded, vehicleParams} = useAppSelector(state => state.vehicle);

    useEffect(() => {
        if(!vehiclesLoaded)
            dispatch(fetchVehiclesFromCompanyAsync(userCompanyId!));
    }, [vehiclesLoaded, dispatch, userCompanyId]);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);


    if(!vehicles)
        return <LoadingComponent message="Učitavanje vozila..." />

    return (
        <>
            <Box display='flex' flexDirection='column' justifyContent='space-between' sx={{m: 5}}>
                <Box display='flex' flexDirection='column'>
                    <Box display='flex' justifyContent='space-between' alignItems='center' sx={{mb: 2}}>
                        <Typography variant="h4" sx={{color: 'gray'}}>
                            Vozila
                        </Typography> 
                        <VehicleSerach />
                    </Box> 
                    <Box display='flex' justifyContent='start' alignItems='center'>
                        <CheckboxButtons
                            items={categories}
                            checked={vehicleParams.categories}
                            onChange={(items: string[]) => dispatch(setVehicleParams({categories: items}))}
                        />
                    </Box>
                </Box>
                <Divider sx={{mt: 1, mb: 2}} />
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