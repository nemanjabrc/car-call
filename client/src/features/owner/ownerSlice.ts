import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Owner } from "../../app/models/owner";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

interface OwnerState {
    ownerLoaded: boolean;
    ownersLoaded: boolean;
    status: string;
}

const ownersAdapter = createEntityAdapter<Owner>();

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

export const ownerSlice = createSlice({
    name: 'owner',
    initialState: ownersAdapter.getInitialState<OwnerState>({
        ownerLoaded: false,
        ownersLoaded: false,
        status: 'idle'
    }),
    reducers: {
        setOwner: (state) => {
            state.ownersLoaded = false;
        },
        updateOwner: (state) => {
            state.ownerLoaded = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOwnersAsync.pending, (state) => {
            state.status = 'pendingFetchOwners';
        });
        builder.addCase(fetchOwnersAsync.fulfilled, (state, action) => {
            ownersAdapter.setAll(state, action.payload);
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
            ownersAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
            state.ownerLoaded = true;
        });
        builder.addCase(fetchOwnerAsync.rejected, (state) => {
            state.status = 'idle';
        });
    }
})

export const ownerSelectors = ownersAdapter.getSelectors((state: RootState) => state.owner);

export const {setOwner, updateOwner} = ownerSlice.actions;