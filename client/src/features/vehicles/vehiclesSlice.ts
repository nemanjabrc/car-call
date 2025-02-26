import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Vehicle, VehicleParams } from "../../app/models/vehicle";
import { RootState } from "../../app/store/configureStore";
import agent from "../../app/api/agent";

interface VehicleState {
    vehicleLoaded: boolean;
    vehiclesLoaded: boolean;
    status: string;
    categories: string[];
    vehicleParams: VehicleParams;
}

const vehiclesAdapter = createEntityAdapter<Vehicle>();

function getAxiosParams(vehicleParams: VehicleParams) {
    const params = new URLSearchParams();
    if(vehicleParams.searchTerm) {
        params.append('searchTerm', vehicleParams.searchTerm);
    }
    if(vehicleParams.categories) {
        params.append('categories', vehicleParams.categories.toString());
    }

    return params;
}

export const fetchVehiclesAsync = createAsyncThunk<Vehicle[], void, {state: RootState}>(
    'vehicle/fetchVehiclesAsync',
    async(_, thunkAPI) => {
        try {
            const response = await agent.Vehicle.getVehicles();
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const fetchVehicleAsync = createAsyncThunk<Vehicle, number>(
    'vehicle/fetchVehicleAsync',
    async(vehicleId, thunkAPI) => {
        try {
            const response = await agent.Vehicle.getVehicle(vehicleId);
            console.log(response);
            return response;
        } catch (error: any) {
            console.log(error);
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const fetchVehiclesFromCompanyAsync = createAsyncThunk<Vehicle[], number, {state: RootState}>(
    'vehicle/fetchVehiclesFromCompanyAsync',
    async(companyId, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().vehicle.vehicleParams)
        try {
            const response = await agent.Vehicle.getAllVehiclesFromCompany(companyId, params);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const vehicleSlice = createSlice({
    name:'vehicle',
    initialState: vehiclesAdapter.getInitialState<VehicleState>({
        vehicleLoaded: false,
        vehiclesLoaded: false,
        status: 'idle',
        categories: [],
        vehicleParams: {}
    }),
    reducers: {
        setVehicle: (state) => {
            state.vehiclesLoaded = false;
        },
        updateVehicle: (state) => {
            state.vehicleLoaded = false;
        },
        setVehicleParams: (state, action) => {
            state.vehiclesLoaded = false;
            state.vehicleParams = {...state.vehicleParams, ...action.payload};
        },
        resetVehicleParams: (state) => {
            state.vehicleParams = {};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchVehiclesAsync.pending, (state) => {
            state.status = 'pendingFetchVehicles';
        });
        builder.addCase(fetchVehiclesAsync.fulfilled, (state, action) => {
            vehiclesAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.vehiclesLoaded = true;
        });
        builder.addCase(fetchVehiclesAsync.rejected, (state) => {
            state.status = 'idle';
        });

        builder.addCase(fetchVehicleAsync.pending, (state) => {
            state.status = 'pendingFetchVehicles';
        });
        builder.addCase(fetchVehicleAsync.fulfilled, (state, action) => {
            vehiclesAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
            state.vehicleLoaded = true;
        });
        builder.addCase(fetchVehicleAsync.rejected, (state) => {
            state.status = 'idle';
        });

        builder.addCase(fetchVehiclesFromCompanyAsync.pending, (state) => {
            state.status = 'pendingFetchVehicles';
        });
        builder.addCase(fetchVehiclesFromCompanyAsync.fulfilled, (state, action) => {
            vehiclesAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.vehiclesLoaded = true;
        });
        builder.addCase(fetchVehiclesFromCompanyAsync.rejected, (state) => {
            state.status = 'idle';
        });
    }
});

export const vehicleSelectors = vehiclesAdapter.getSelectors((state: RootState) => state.vehicle);

export const {setVehicle, updateVehicle, setVehicleParams, resetVehicleParams} = vehicleSlice.actions;