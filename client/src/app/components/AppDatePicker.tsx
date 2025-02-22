import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useController, UseControllerProps } from 'react-hook-form';
import { FormControl } from '@mui/material';
import dayjs from 'dayjs';

interface Props extends UseControllerProps {
    label: string
}


const AppDatePicker = (props: Props) => {
    const {field, fieldState} = useController({...props, defaultValue: ''});
    return(  
        <FormControl
            fullWidth 
                error={!!fieldState.error}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#339966',
                        },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#339966',
                    },
                }}
            >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    label={props.label} 
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(newValue) => {
                        if (newValue) {
                            // Postavljanje datuma na početak dana, ali u lokalnoj vremenskoj zoni
                            const formattedDate = dayjs(newValue).startOf('day'); // Postavi na 00:00 lokalno vreme
                            // Korišćenje formatiranja da dobijemo tačan ISO datum u lokalnoj vremenskoj zoni
                            const isoDate = formattedDate.format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
                            console.log("📅 Odabrani datum:", isoDate);
                            field.onChange(isoDate);
                        } else {
                            field.onChange("");
                        }
                    }}
                    slotProps={{ textField: { error: !!fieldState.error, helperText: fieldState.error?.message } }}
                />
            </LocalizationProvider>
        </FormControl>
    )
}

export default AppDatePicker;