import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ContactT {
  id: number;
  name: string|undefined;
  contact: number|undefined;
}
interface ContactState {
  contacts: ContactT[];
  isInputFormOpen:boolean;
}

const initialState: ContactState = {
  contacts: [],
  isInputFormOpen:false

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
      action: PayloadAction<{ id: number; name: string|undefined; contact: number |undefined}>
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
    changeIsInputOpen:(state,action:PayloadAction<boolean>)=>{
      state.isInputFormOpen=action.payload;
      console.log(action.payload)
    }
  },
});

export const {addContact, editContact,changeIsInputOpen} = contactSlice.actions;
export default contactSlice.reducer;

