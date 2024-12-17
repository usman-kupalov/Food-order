import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadState } from "@store/storage.ts";
import axios, { AxiosError } from "axios";
import { RootState } from "@store/store.ts";
import { LoginResponse, Profile } from "@src/interface.ts";
import { JWT_PERSISTENT_STATE, PREFIX } from "@src/constants.ts";

interface UserPersistentState {
  jwt: string | null;
}

interface UserState {
  jwt: string | null;
  loginErrorMessage?: string;
  profile?: Profile;
  registerErrorMessage?: string;
}

const initialState: UserState = {
  jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
};

export const login = createAsyncThunk(
  "user/login",
  async (params: { email: string; password: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
        email: params.email,
        password: params.password,
      });

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  },
);

export const register = createAsyncThunk(
  "user/register",
  async (params: { email: string; password: string; name: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>(
        `${PREFIX}/auth/register`,
        {
          email: params.email,
          password: params.password,
          name: params.name,
        },
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  },
);

export const getProfile = createAsyncThunk<Profile, void, { state: RootState }>(
  "user/profile",
  async (_, thunkAPI) => {
    const jwt = thunkAPI.getState().user.jwt;
    const { data } = await axios.get<Profile>(`${PREFIX}/user/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return data;
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null;
    },
    clearLoginError: (state) => {
      state.loginErrorMessage = undefined;
    },
    clearRegisterError: (state) => {
      state.registerErrorMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.jwt = action.payload.access_token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginErrorMessage = action.error.message;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.jwt = action.payload.access_token;
    });

    builder.addCase(register.rejected, (state, action) => {
      state.registerErrorMessage = action.error.message;
    });
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
