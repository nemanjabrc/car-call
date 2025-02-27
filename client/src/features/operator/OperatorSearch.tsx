import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { TextField, InputAdornment } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { setOperatorParams } from './operatorSlice';

const OperatorSearch = () => {

    const dispatch = useAppDispatch();
    const {operatorParams} = useAppSelector(state => state.operator);

    return (
        <TextField 
            id="standard-basic" 
            label="Pretraži operatere" 
            variant="standard"
            value={operatorParams.searchTerm || ''}
            onChange={event => dispatch(setOperatorParams({searchTerm: event.target.value}))}
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

export default OperatorSearch;