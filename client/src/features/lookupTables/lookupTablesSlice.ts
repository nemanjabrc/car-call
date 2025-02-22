import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Category } from "../../app/models/category";
import { VehicleManufacturer } from "../../app/models/vehicleManufacturer";
import { VehicleModel } from "../../app/models/vehicleModel";
import agent from "../../app/api/agent";

interface LookupTablesState {
    categories: Category[];
    manufacturers: VehicleManufacturer[];
    models: VehicleModel[];
    selectedCategory: number | null;
    selectedManufacturer: number | null;
    status: string;
};

const initialState: LookupTablesState = {
    categories: [],
    manufacturers: [],
    models: [],
    selectedCategory: null,
    selectedManufacturer: null,
    status: 'idle',
};

export const fetchCategories = createAsyncThunk<Category[]>(
  "lookupTables/fetchCategories",
  async (_, thunkAPI) => {
    try {
        const response = await agent.LookupTables.getCategories();
        return response;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({error: error.data});
    }
  }  
);

export const fetchManufacturers = createAsyncThunk<VehicleManufacturer[], number>(
    "lookupTables/fetchManufacturers",
    async(categoryId, thunkAPI) => {
        try {
            const response = await agent.LookupTables.getVehicleManufacturers(categoryId);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
);

export const fetchModels = createAsyncThunk<VehicleModel[], number>(
    "lookupTables/fetchModels",
    async(manufacturerId, thunkAPI) => {
        try {
            const response = agent.LookupTables.getVehicleModels(manufacturerId);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
);

export const lookupTablesSlice = createSlice({
    name: 'lookupTables',
    initialState,
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
            state.manufacturers = [];
            state.models = [];
        },
        setSelectedManufacturer: (state, action) => {
            state.selectedManufacturer = action.payload;
            state.models = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.status = 'pendingFetchCategories';
        });
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.status = 'idle';
        });
        builder.addCase(fetchCategories.rejected, (state) => {
            state.status = 'idle';
        });

        builder.addCase(fetchManufacturers.pending, (state) => {
            state.status = 'pendingFetchManufacturers';
        });
        builder.addCase(fetchManufacturers.fulfilled, (state, action) => {
            state.manufacturers = action.payload;
            state.status = 'idle';
        });
        builder.addCase(fetchManufacturers.rejected, (state) => {
            state.status = 'idle';
        });

        builder.addCase(fetchModels.pending, (state) => {
            state.status = 'pendingFetchModels';
        });
        builder.addCase(fetchModels.fulfilled, (state, action) => {
            state.models = action.payload;
            state.status = 'idle';
        });
        builder.addCase(fetchModels.rejected, (state) => {
            state.status = 'idle';
        });

    }
});

export const {setSelectedCategory, setSelectedManufacturer} = lookupTablesSlice.actions;



