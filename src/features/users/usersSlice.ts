import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { onValue, ref, off } from "firebase/database";
import { db } from "../../services/firebase";

interface UserInterface {
  email: string;
  roles: Record<string, boolean>[];
}

interface UserState {
  users: UserInterface[]
}

const initialState: UserState = {
  users: []
}

export const fetchUsers = createAsyncThunk("menu/fetchItems", async (_, { rejectWithValue }) => {
  return new Promise<UserInterface[]>((resolve, reject) => {
    const itemsRef = ref(db, "users");

    onValue(
      itemsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          //const formattedData = formatMenuItems(data);
          resolve(Object.values(data));
        } else {
          reject(new Error("No hay datos disponibles"));
        }

        off(itemsRef);
      },
      (error) => {
        console.error("Error en Firebase:", error);
        rejectWithValue(error);
      }
    );
  }).catch((error) => rejectWithValue(error));
});


export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UserInterface[]>) => {
        state.users = action.payload;
      })
  }
});

export default menuSlice.reducer;