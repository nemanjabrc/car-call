import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Owner } from "../../app/models/owner";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";
import { Vehicle } from "../../app/models/vehicle";

const ownersAdapter = createEntityAdapter<Owner>();
const ownerVehiclesAdapter = createEntityAdapter<Vehicle>();

interface OwnerState {
    owners: ReturnType<typeof ownersAdapter.getInitialState>
    ownerVehicles: ReturnType<typeof ownerVehiclesAdapter.getInitialState>
    ownerLoaded: boolean;
    ownersLoaded: boolean;
    ownerVehiclesLoaded: boolean;
    status: string;
}

const initialState: OwnerState = {
    owners: ownersAdapter.getInitialState(),
    ownerVehicles: ownerVehiclesAdapter.getInitialState(),
    ownerLoaded: false,
    ownersLoaded: false,
    ownerVehiclesLoaded: false,
    status: 'idle'
}

export const fetchOwnersAsync = createAsyncThunk<Owner[], number>(
    'owner/fetchOwnersAsync',
    async(companyId, thunkAPI) => {
        try {
            const response = await agent.Account.getAllOwnersFromCompany(companyId);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.state});
        }
    }
)

export const fetchOwnerAsync = createAsyncThunk<Owner, number>(
    'owner/fetchOwnerAsync',
    async(ownerId, thunkAPI) => {
        try {
            const response = await agent.Account.getOwnerFromCompany(ownerId);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.state});
        }
    }
)

export const fetchOwnersVehiclesAsync = createAsyncThunk<Vehicle[], number>(
    'owner/fetchOwnersVehiclesAsync',
    async(ownerId, thunkAPI) => {
        try {
            const response = await agent.Vehicle.getOwnersVehicles(ownerId);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const ownerSlice = createSlice({
    name: 'owner',
    initialState,
    reducers: {
        setOwner: (state) => {
            state.ownersLoaded = false;
        },
        updateOwner: (state) => {
            state.ownerLoaded = false;
        },
        setOwnerVehicles: (state) => {
            state.ownerVehiclesLoaded = false;
            ownerVehiclesAdapter.removeAll(state.ownerVehicles);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOwnersAsync.pending, (state) => {
            state.status = 'pendingFetchOwners';
        });
        builder.addCase(fetchOwnersAsync.fulfilled, (state, action) => {
            ownersAdapter.setAll(state.owners, action.payload);
            state.status = 'idle';
            state.ownersLoaded = true;
        });
        builder.addCase(fetchOwnersAsync.rejected, (state) => {
            state.status = 'idle';
        });

        builder.addCase(fetchOwnerAsync.pending, (state) => {
            state.status = 'pendingFetchOwner';
        });
        builder.addCase(fetchOwnerAsync.fulfilled, (state, action) => {
            ownersAdapter.upsertOne(state.owners, action.payload);
            state.status = 'idle';
            state.ownerLoaded = true;
        });
        builder.addCase(fetchOwnerAsync.rejected, (state) => {
            state.status = 'idle';
        });

        builder.addCase(fetchOwnersVehiclesAsync.pending, (state) => {
            state.status = 'pendingFetchOwnersVehiclesAsync';
        });
        builder.addCase(fetchOwnersVehiclesAsync.fulfilled, (state, action) => {
            ownerVehiclesAdapter.setAll(state.ownerVehicles, action.payload);
            state.status = 'idle';
            state.ownerVehiclesLoaded = true;
        });
        builder.addCase(fetchOwnersVehiclesAsync.rejected, (state) => {
            state.status = 'idle';
        });
    }
})

export const ownerSelectors = ownersAdapter.getSelectors((state: RootState) => state.owner.owners);
export const ownerVehiclesSelectors = ownerVehiclesAdapter.getSelectors((state: RootState) => state.owner.ownerVehicles);

export const {setOwner, updateOwner, setOwnerVehicles} = ownerSlice.actions;