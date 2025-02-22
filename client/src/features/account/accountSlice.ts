import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../app/models/user";
import { FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";
import { router } from "../../app/router/Routes";
import { UserProfile } from "../../app/models/userProfile";

interface AccountState {
    user: User | null;
    profileData: UserProfile | null; 
}

const initialState : AccountState = {
    user: null,
    profileData: null
}

export const logInUser = createAsyncThunk<User, FieldValues>(
    'account/logInUser',
    async (data, thunkAPI) => {
        try {
            const user = await agent.Account.login(data);
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response);
        }
    } 
)

export const fetchCurrentUser = createAsyncThunk<User>(
    'account/fetchCurrentUser',
    async(_, thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
        try {
            const user = await agent.Account.currentUser();
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    },
    {
        condition: () => {
            if(!localStorage.getItem('user'))
                return false;
        }
    }
)

 export const fetchCurrentOwnerProfileData = createAsyncThunk<UserProfile>(
    'account/fetchCurrentOwnerProfileData',
    async(_, thunkAPI) => {
        try {
            const profileData = await agent.Account.getCurrentOwnerProfile();
            return profileData;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
 )

 export const fetchCurrentOperatorProfileData = createAsyncThunk<UserProfile>(
    'account/fetchCurrentOperatorProfileData',
    async(_, thunkAPI) => {
        try {
            const profileData = await agent.Account.getCurrentOperatorProfile();
            return profileData;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
 )

 export const fetchCurrentAdminProfileData = createAsyncThunk<UserProfile>(
    'account/fetchCurrentAdminProfileData',
    async(_, thunkAPI) => {
        try {
            const profileData = await agent.Account.getCurrentAdminProfile();
            return profileData;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
 )

 export const fetchSuperadminProfileData = createAsyncThunk<UserProfile>(
    'account/fetchSuperadminProfileData',
    async(_, thunkAPI) => {
        try {
            const profileData = await agent.Account.getSuperadminProfile();
            return profileData;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
 )

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        logOut: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            router.navigate('/');
        },
        setUser: (state, action) => {
            const claims = JSON.parse(atob(action.payload.token.split('.')[1]));
            const role = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            state.user = {...action.payload, role: role};
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            state.user = null;
            localStorage.removeItem('user');
            router.navigate('/');
        });
        builder.addCase(logInUser.fulfilled, (state, action) => {
            const claims = JSON.parse(atob(action.payload.token.split('.')[1]));
            const role = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            const companyId = claims['CompanyId'];
            state.user = {...action.payload, role: role, companyId: companyId};
            router.navigate('/myaccount', { replace: true });
        })
        builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
            const claims = JSON.parse(atob(action.payload.token.split('.')[1]));
            const role = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            const companyId = claims['CompanyId'];
            state.user = {...action.payload, role: role, companyId: companyId};
        });
        builder.addCase(logInUser.rejected, (_state, action) => {
            throw action.payload;
        });

        builder.addCase(fetchCurrentOwnerProfileData.fulfilled, (state, action) => {
            state.profileData = action.payload;
        });
        builder.addCase(fetchCurrentOperatorProfileData.fulfilled, (state, action) => {
            state.profileData = action.payload;
        });
        builder.addCase(fetchCurrentAdminProfileData.fulfilled, (state, action) => {
            state.profileData = action.payload;
        });
        builder.addCase(fetchSuperadminProfileData.fulfilled, (state, action) => {
            state.profileData = action.payload;
        });
    })
})

export const {logOut, setUser} = accountSlice.actions;