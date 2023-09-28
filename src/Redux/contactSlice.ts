import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ContactT {
  id: number;
  name: string|undefined;
  contact: number|undefined;
}
interface ContactState {
  contacts: ContactT[];
}

const initialState: ContactState = {
  contacts: [],
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<ContactT>) => {
      state.contacts.push(action.payload);
    },
    editContact: (
      state,
      action: PayloadAction<{ id: number; name: string; contact: number }>
    ) => {
      const { id, name, contact } = action.payload;
      const contactExist = state.contacts.find(
        (value: ContactT) => value.id === id
      );
      if (contactExist) {
        contactExist.name = name;
        contactExist.contact = contact;
      }
    },
  },
});

export const {addContact, editContact} = contactSlice.actions;
export default contactSlice.reducer;

