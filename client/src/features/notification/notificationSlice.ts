import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { MaintenanceNotification } from "../../app/models/maintenanceNotification";
import agent from "../../app/api/agent";
import { RegistrationNotification } from "../../app/models/registrationNotification";
import { RootState } from "../../app/store/configureStore";

const maintenanceNotificationsAdapter = createEntityAdapter<MaintenanceNotification>();
const registrationNotificationAdapter = createEntityAdapter<RegistrationNotification>();


interface NotificationState {
    maintenance: ReturnType<typeof maintenanceNotificationsAdapter.getInitialState>;
    registration: ReturnType<typeof registrationNotificationAdapter.getInitialState>;
    maintenanceNotificationsLoaded: boolean;
    registrationNotificationLoaded: boolean;
    status: string;
}

const initialState: NotificationState = {
    maintenance: maintenanceNotificationsAdapter.getInitialState(),
    registration: registrationNotificationAdapter.getInitialState(),
    maintenanceNotificationsLoaded: false,
    registrationNotificationLoaded: false,
    status: 'idle'
}

export const fetchMaintenanceNotificationsAsync = createAsyncThunk<MaintenanceNotification[], number>(
    'notification/fetchMaintenanceNotificationsAsync',
    async (vehicleId, thunkAPI) => {
        try {
            const response = await agent.Notification.getAllVehicleMaintenanceNotifications(vehicleId);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const fetchMaintenanceNotificationAsync = createAsyncThunk<MaintenanceNotification, number>(
    'notification/fetchMaintenanceNotificationAsync',
    async (notificationId, thunkAPI) => {
        try {
            var response = agent.Notification.getSingleVehicleMaintenanceNotification(notificationId);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const fetchRegistrationNotificationAsync = createAsyncThunk<RegistrationNotification, number>(
    'notification/fetchRegistrationNotificationAsync',
    async (vehicleId, thunkAPI) => {
        try {
            const response = await agent.Notification.getRegistrationNotification(vehicleId);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state) => {
            state.maintenanceNotificationsLoaded = false;
            state.registrationNotificationLoaded = false;
            maintenanceNotificationsAdapter.removeAll(state.maintenance);
            registrationNotificationAdapter.removeAll(state.registration);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMaintenanceNotificationsAsync.pending, (state) => {
            state.maintenanceNotificationsLoaded = false;
            state.status = 'pendingFetchMaintenanceNotifications';
        });
        builder.addCase(fetchMaintenanceNotificationsAsync.fulfilled, (state, action) => {
            maintenanceNotificationsAdapter.setAll(state.maintenance, action.payload);
            state.maintenanceNotificationsLoaded = true;
            state.status = 'idle';
        });
        builder.addCase(fetchMaintenanceNotificationsAsync.rejected, (state) => {
            state.status = 'idle';
        })

        builder.addCase(fetchRegistrationNotificationAsync.pending, (state) => {
            state.registrationNotificationLoaded = false;
            state.status = 'pendingFetchRegistrationNotificationAsync';
        });
        builder.addCase(fetchRegistrationNotificationAsync.fulfilled, (state, action) => {
            registrationNotificationAdapter.upsertOne(state.registration, action.payload);
            state.registrationNotificationLoaded = true;
            state.status = 'idle';
        });
        builder.addCase(fetchRegistrationNotificationAsync.rejected, (state) => {
            state.status = 'idle';
        });

        builder.addCase(fetchMaintenanceNotificationAsync.pending, (state) => {
            state.status = 'pendingFetchMaintenanceNotification';
        });
        builder.addCase(fetchMaintenanceNotificationAsync.fulfilled, (state, action) => {
            maintenanceNotificationsAdapter.upsertOne(state.maintenance, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchMaintenanceNotificationAsync.rejected, (state) => {
            state.status = 'idle';
        })
    }
})

export const maintenanceNotificationSelector = maintenanceNotificationsAdapter.getSelectors((state: RootState) => state.notification.maintenance);
export const registrationNotificationSelector = registrationNotificationAdapter.getSelectors((state: RootState) => state.notification.registration);

export const {setNotification} = notificationSlice.actions;