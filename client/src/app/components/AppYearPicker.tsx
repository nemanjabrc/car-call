import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useController, UseControllerProps } from "react-hook-form";
import { FormControl } from "@mui/material";
import dayjs from "dayjs";

interface Props extends UseControllerProps {
    label: string;
}

const AppYearPicker = (props: Props) => {
    const { field, fieldState } = useController({ ...props, defaultValue: "" });

    return (
        <FormControl
            fullWidth
            error={!!fieldState.error}
            sx={{
                "& .MuiOutlinedInput-root": {
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#339966",
                    },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                    color: "#339966",
                },
            }}
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label={props.label}
                    views={["year"]} 
                    value={field.value ? dayjs(field.value) : null} 
                    onChange={(newValue) => field.onChange(newValue ? newValue.year().toString() : "")} 
                    slotProps={{ textField: { error: !!fieldState.error, helperText: fieldState.error?.message } }}
                />
            </LocalizationProvider>
        </FormControl>
    );
};

export default AppYearPicker;
