import { Alert, Box, FormControlLabel, FormGroup, Grid, Paper, Snackbar, Switch, Typography } from "@mui/material";
import AppTextInput from "../../app/components/AppTextInput";
import { Controller, FieldValues, useForm } from "react-hook-form";
import AppDatePicker from "../../app/components/AppDatePicker";
import AppSelectList2 from "../../app/components/AppSelectList2";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { LoadingButton } from "@mui/lab";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationNotificationSchema } from "./notificationValidation";
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { setNotification } from "./notificationSlice";
import { useState } from "react";
import { updateVehicle } from "../vehicles/vehiclesSlice";

interface Option {
    id: number;
    name: string;
    value: number;
}
 const numberOfDaysOptsions: Option[] = [
    {id: 1, name: '7 dana', value: 7},
    {id: 2, name: '15 dana', value: 15},
    {id: 3, name: '30 dana', value: 30},
    {id: 4, name: '2 mjeseca', value: 60},
    {id: 5, name: '3 mjeseca', value: 90},
    {id: 6, name: '4 mjeseca', value: 120},
    {id: 7, name: '5 mjeseci', value: 150},
    {id: 8, name: '6 mjeseci', value: 180},
    {id: 9, name: '7 mjeseci', value: 210},
    {id: 10, name: '8 mjeseci', value: 240},
    {id: 11, name: '9 mjeseci', value: 270},
    {id: 12, name: '10 mjeseci', value: 300}
 ] 

const NotificationForm = () => {

    const {id} = useParams<{id: string}>();
    const vehicleId = parseInt(id!);

    const dispatch = useAppDispatch();
    const [successAlert, setSuccessAlert] = useState(false);

    const { control, reset, handleSubmit, formState: { isSubmitting} } = useForm({
        resolver: yupResolver<any>(validationNotificationSchema)
    });

    async function handleSubmitData(data: FieldValues) {
        try {
            await agent.Notification.addNotification(vehicleId, data);
            dispatch(setNotification());
            reset();
            setSuccessAlert(true);
            dispatch(updateVehicle());
        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <Box component={Paper} sx={{p: 4}}>
            <Box display='flex' justifyContent='start' alignItems='center' gap={2} mb={4}>
                <Typography variant="h4" sx={{color: 'gray'}}>
                    Novi podsjetnik
                </Typography>
                <Box>
                    <NotificationsNoneOutlinedIcon sx={{fontSize: '40px', color: '#339966'}} />
                </Box>
            </Box>
            <form onSubmit={handleSubmit(handleSubmitData)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={6}>
                        <AppTextInput control={control} name='message' label='Poruka' multiline={true} rows={5} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <AppDatePicker 
                            control={control}
                            label="Datum početka"
                            name="startDate"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <AppSelectList2 
                            control={control}
                            label="Obavijesti za..." 
                            items={numberOfDaysOptsions} 
                            name="numberOfDays" 
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                    <FormGroup>
                    <Controller
                        name="repetitive"
                        control={control}
                        defaultValue={false} 
                        render={({ field }) => (
                            <FormControlLabel
                                control={
                                    <Switch
                                        {...field}
                                        checked={field.value}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                        sx={{
                                            "& .MuiSwitch-switchBase.Mui-checked": {
                                                color: "#339966",
                                            },
                                            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                                backgroundColor: "#339966",
                                            },
                                        }}
                                    />
                                }
                                label="Ponovi"
                                sx={{ color: "#666666" }}
                            />
                        )}
                    />
                    </FormGroup>
                    <Typography variant="body2" color="gray" sx={{ mt: 1 }}>
                        Ako uključite ovu opciju, podsjetnik će se ponavljati u zadatom intervalu.
                        U suprotnom, notfifikacija će se poslati jednom i zatim će biti obrisana.
                    </Typography>
                    </Grid>
                </Grid>
                <Box display='flex' justifyContent='flex-end' sx={{mt: 3}}>
                        <LoadingButton 
                            type="submit" 
                            loading={isSubmitting} 
                            variant='contained' 
                            sx={{backgroundColor: '#339966'}} 
                            endIcon={<AddCircleOutlineOutlinedIcon />}
                        >
                            Sačuvaj
                        </LoadingButton>
                </Box>
            </form>
            <Snackbar open={successAlert} autoHideDuration={5000} onClose={() => setSuccessAlert(false)}>
                <Alert onClose={() => setSuccessAlert(false)} severity="success">
                    Uspješno ste dodali novi podsjetnik!
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default NotificationForm;