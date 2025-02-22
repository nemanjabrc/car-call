import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface AppPhoneNumberInputProps extends UseControllerProps {
    setValue: (name: string, value: string) => void;
    setError: (name: string, error: any) => void;
    clearErrors: (name: string) => void;
    name: string;
}

const AppPhoneNumberInput = (props: AppPhoneNumberInputProps) => {

    const {fieldState} = useController({
        ...props, 
        defaultValue: '', 
    });

    const [phoneNumber, setPhoneNumber] = useState<string>("");

    const handleChange = (value: string) => {
        const valueWithPlus = value.startsWith("+") ? value : "+" + value;
        setPhoneNumber(valueWithPlus);
        const isValid = validatePhoneNumber(valueWithPlus);
        props.setValue(props.name, valueWithPlus); 
        if (!isValid) {
            props.setError(props.name, { type: "manual", message: "Unesite validan broj telefona." });
        } else {
            props.clearErrors(props.name);
        }
    };

    const validatePhoneNumber = (phoneNumber: string) => {
        const phoneNumberPattern = /^\+387[67]\d{7}$/;
        return phoneNumberPattern.test(phoneNumber);
    };

    return (
        <Box sx={{ width: "100%", position: "relative" }}>
            <TextField
                fullWidth
                label="Broj telefona"
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                InputLabelProps={{
                    shrink: true,  
                }}
                InputProps={{
                    readOnly: true
                }}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        height: "56px",
                        borderRadius: "4px",
                        border: '3px',
                        "& fieldset": {
                            borderWidth: "1.6px",
                            borderColor: fieldState.error ? "#f44336" : "#ccc", // Crvena boja ako ima greška
                        },
                        "&:hover fieldset": {
                            borderColor: "#339966",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#339966",
                            borderWidth: "1.6px",
                        },
                        "&.Mui-focused": {
                            borderRadius: "4px",
                        },
                    },
                    "& .MuiInputLabel-root": {
                        color: fieldState.error ? "#f44336" : "#666",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                        color: "#339966",
                    },
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    top: "18px",
                    left: "12px",
                    right: "12px",
                    bottom: "0",
                    display: "flex",
                    alignItems: "center",
                    height: "56px",
                }}
            >
                <PhoneInput
                    country={"ba"}
                    value={phoneNumber}
                    onChange={handleChange}
                    inputProps={{
                        required: true,
                    }}
                    inputStyle={{
                        width: "100%",
                        height: "100%",
                        fontSize: "16px",
                        fontFamily: "inherit",
                        paddingLeft: "50px",
                        border: "none",
                        outline: "none",
                        background: "transparent",
                        lineHeight: "56px",
                    }}
                    buttonStyle={{
                        background: "transparent",
                        border: "none",
                        padding: "0 8px",
                    }}
                />
            </Box>
        </Box>
    );
};

export default AppPhoneNumberInput;
