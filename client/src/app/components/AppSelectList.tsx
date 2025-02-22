import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";

interface Props extends UseControllerProps {
    label: string;
    items: any[];
    disabled?: boolean;
    onChange?: (event: any) => void;
}

const AppSelectList = (props: Props) => {
    const {fieldState, field} = useController({...props, defaultValue: ''});
    return (
        <FormControl 
            fullWidth 
            error={!!fieldState.error}
            disabled={props.disabled}
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
            <InputLabel>{props.label}</InputLabel>
            <Select
                value={field.value}
                label={props.label}
                onChange={(event) => {
                    field.onChange(event);
                    if (props.onChange) props.onChange(event);
                }}
            >
                {props.items.map((item) => (
                    <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                ))}
            </Select>
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
    )
}

export default AppSelectList;