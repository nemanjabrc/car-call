import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchVehiclesAsync, vehicleSelectors } from "./vehiclesSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Box, Grid, Typography } from "@mui/material";
import VehicleCard from "./vehicleCard/VehicleCard";
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';

const VehiclesLayout = () => {

    const vehicles = useAppSelector(vehicleSelectors.selectAll);

    const {vehiclesLoaded} = useAppSelector(state => state.vehicle);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!vehiclesLoaded)
            dispatch(fetchVehiclesAsync());
    }, [vehiclesLoaded, dispatch]);

    if(!vehiclesLoaded)
        return <LoadingComponent message="Učitavanje vozila..." />

    if(vehicles.length == 0)
        return <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' mt={20}>
                    <BlockOutlinedIcon  sx={{fontSize: '100px', color: 'grey'}}/>
                    <Typography variant="h6" color="grey">Nema vozila na profilu.</Typography>
                </Box>

    return(
        <Box sx={{mt: 3, ml: 7, p: 0}} display='flex' justifyContent='center' alignItems='center'>
            <Grid container rowSpacing={1} spacing={5} alignItems="strech" sx={{ width: "100%", mt: 0, mb: 0 }}>
                {vehicles.map((vehicle, index) => (
                    <Grid item xs={12} sm={6} md={3} key={vehicle.id} p={0} sx={{ mt: index >= 4 ? 5 : 0 }}>
                        <VehicleCard vehicle={vehicle}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default VehiclesLayout;