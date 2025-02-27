import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { TextField, InputAdornment } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { setVehicleParams } from './vehiclesSlice';

const VehicleSerach = () => {

    const dispatch = useAppDispatch();
    const {vehicleParams} = useAppSelector(state => state.vehicle);

    return (
        <TextField 
            id="standard-basic" 
            label="Pretraži vozila" 
            variant="standard"
            value={vehicleParams.searchTerm || ''}
            onChange={event => dispatch(setVehicleParams({searchTerm: event.target.value}))}
            sx={{
                "& label.Mui-focused": { color: "#339966" },
                "& .MuiInput-underline:after": { borderBottomColor: "#339966" },
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <SearchOutlinedIcon sx={{ color: "#339966" }} />
                    </InputAdornment>
                ),
            }}
        />
    )
}

export default VehicleSerach;