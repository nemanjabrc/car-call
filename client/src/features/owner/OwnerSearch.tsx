import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { TextField, InputAdornment } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { setOwnerParams } from './ownerSlice';

const OwnerSearch = () => {

    const dispatch = useAppDispatch();
    const {ownerParams} = useAppSelector(state => state.owner);

    return (
        <TextField 
            id="standard-basic" 
            label="Pretražite vlasnike" 
            variant="standard"
            value={ownerParams.searchTerm || ''}
            onChange={event => dispatch(setOwnerParams({searchTerm: event.target.value}))}
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

export default OwnerSearch;