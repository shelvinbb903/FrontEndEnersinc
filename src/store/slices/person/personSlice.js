import { createSlice } from '@reduxjs/toolkit'

export const personSlice = createSlice({
  name: 'personSlice',
  initialState: {
    listPersons: [],
    responseObject: {},
    mesageErrors: "",
    typeRequest: "",
    lblTitle: "",
    booleanDisable: false,
    dataPerson: {
      id: "" ,
      name: "" ,
      last_name: "" ,
      document_type: "" ,
      document: "" ,
      hobbie: "" ,
      idDelete: "" ,
    },
    openDialog: {
      openDataPerson: false,
      openConfirm: false
    }
  },
  reducers: {
    setListPersons: (state, action) => {
      state.listPersons = [...action.payload.data];
    },
    setResponseObject: (state, action) => {
      state.responseObject = action.payload.data;
    },
    setMesageErrors: (state, action) => {
      state.mesageErrors = action.payload.message;
    },

    setTypeRequest: (state, action) => {
      state.typeRequest = action.payload.type;
    },
    setlblTitle: (state, action) => {
      state.lblTitle = action.payload.title;
    },
    setBooleanDisable: (state, action) => {
      state.booleanDisable = action.payload.disable;
    },

    setDataPerson: (state, action) => {
      state.dataPerson[action.payload.type] = action.payload.value;
    },
    
    setOpenDialog: (state, action) => {
      state.openDialog[action.payload.type] = action.payload.value;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setListPersons, setResponseObject, setOpenDialog, setDataPerson, setMesageErrors, setTypeRequest, setlblTitle, setBooleanDisable } = personSlice.actions