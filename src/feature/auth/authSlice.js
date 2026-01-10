import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* -------------------- LOAD FROM STORAGE -------------------- */
const storedUser = JSON.parse(localStorage.getItem("user"));
const storedAccessToken = localStorage.getItem("accessToken");
const storedRefreshToken = localStorage.getItem("refreshToken");


/* -------------------- LOGIN API ------------------- */
export const loginUser = createAsyncThunk('auth/loginUser',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await fetch('https://dummyjson.com/auth/login',
                {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify
                        ({
                            username,
                            password,
                        }),
                });
            const data = await response.json()
            if (!response.ok) {
                return rejectWithValue(data.message)
            }

            return data
        }
        catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

/* -------------------- INITIAL STATE -------------------- */
const initialState = {
    user: storedUser || null,
    accessToken: storedAccessToken || null,
    refreshToken: storedRefreshToken || null, 
    isAuthenticated: !!storedAccessToken,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
            localStorage.setItem("user", JSON.stringify(action.payload))
            
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem("user") 
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        },
        setError: (state, action) => {
            state.error = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            const {
                accessToken,
                refreshToken,
                ...userData
            } = action.payload;

            state.user = userData;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.isAuthenticated = true;

            // Store access refresh token
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("user", JSON.stringify(userData));
        }),
            builder.addCase(loginUser.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            }),
            builder.addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const { login, logout, setError } = authSlice.actions
export default authSlice.reducer;