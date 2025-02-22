import { TextField } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";

interface Props extends UseControllerProps {
    label: string;
    multiline?: boolean;
    rows?: number;
    type?: string;
    InputProps?: object; 
}

export default function AppPhoneNumberInput2(props: Props) {
    const { fieldState, field } = useController({
        ...props,
        defaultValue: '+387',  // Početna vrednost
    });

    // Regex za validaciju broja
    const phoneRegex = /^\+387[67]\d{7}$/;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        // Oduzmi sve karaktere osim brojeva i plusa
        const sanitizedInput = inputValue.replace(/[^0-9+]/g, '');

        // Ako broj odgovara regex-u ili je samo početni unos '+387', ažuriraj vrednost
        if (phoneRegex.test(sanitizedInput) || sanitizedInput === '+387') {
            field.onChange(sanitizedInput); // Ažuriraj vrednost u formi
        }
    };

    return (
        <TextField
            {...props}
            {...field}
            multiline={props.multiline}
            rows={props.rows}
            type="tel"  // Postavio tip na 'tel' za bolju podršku unosu brojeva
            fullWidth
            variant="outlined"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            InputProps={props.InputProps}
            onChange={handleChange} // Dodajemo onChange sa regex validacijom
            sx={{
                '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                        borderColor: '#339966',
                    },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: '#339966',
                },
            }}
        />
    );
}
