import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Company } from "../../app/models/company";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

interface CompanyState {
    companiesLoaded: boolean;
    status: string;
}


const companiesAdapter = createEntityAdapter<Company>();

export const fetchCompaniesAsync = createAsyncThunk<Company[], void, {state: RootState}>(
    'company/fetchCompaniesAsync',
    async (_, thunkAPI) => {
        try {
            const response = await agent.Company.getAll();
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const companySlice = createSlice({
    name: 'company',
    initialState: companiesAdapter.getInitialState<CompanyState>({
        companiesLoaded: false,
        status: 'idle'
    }),
    reducers: {
        setCompany: (state) => {
            state.companiesLoaded = false;
        },
    },
    extraReducers: (builder => {
        builder.addCase(fetchCompaniesAsync.pending, (state) => {
            state.status = 'pendingFetchCompanies';
        });
        builder.addCase(fetchCompaniesAsync.fulfilled, (state, action) => {
            companiesAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.companiesLoaded = true;
        });
        builder.addCase(fetchCompaniesAsync.rejected, (state) => {
            state.status = 'idle';
        });
    })
})

export const companySelectors = companiesAdapter.getSelectors((state: RootState) => state.company);

export const {setCompany} = companySlice.actions;