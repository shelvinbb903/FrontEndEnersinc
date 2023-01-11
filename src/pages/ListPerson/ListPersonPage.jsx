import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Container } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, {useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AlertComponent } from '../../components/AlertComponent';

import './ListPersonPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { getPersons, createPerson, updatePerson, setBooleanDisable, setDataPerson, setlblTitle, setMesageErrors, setOpenDialog, setTypeRequest, deletePerson } from '../../store/slices/person';
import { constants } from '../../constants';

export const ListPersonPage = () => {
  const { 
    listPersons, 
    //responseObject,
    error, 
    mesageErrors,
    typeRequest,
    lblTitle,
    booleanDisable,
    openDialog,
    dataPerson 
  } = useSelector((state) => state.person)

  const dispatch = useDispatch()

  useEffect(() => { 
    getListPersons();    
  }, []);

  /**
   * 
   * @param {*} param0 
   * @param {*} type 
   */
  const onTxtValue = async ({target}, type) => {
    await dispatch(setDataPerson({type, value: target.value}))
  }

  /**
   * 
   * 
   */
  const getListPersons = async () => {
    await dispatch(getPersons());
    
    if(error) {
      return;
    }
  }   
  
  /**
   * 
   * @param {*} event 
   * @param {*} type 
   * @param {*} data 
   */
  const openViewDataPerson = async (event, type = "add", data = {}) => {
    await dispatch(setMesageErrors({message: ""}))
    await dispatch(setTypeRequest({type}))
    constants.mesageErrors = ''
    constants.error = false
    
    switch (type) {
      case "add":
        await dispatch(setlblTitle({title: "Crear Persona"}))
        await dispatch(setDataPerson({type: "name", value: ""}))
        await dispatch(setDataPerson({type: "last_name", value: ""}))
        await dispatch(setDataPerson({type: "document_type", value: ""}))
        await dispatch(setDataPerson({type: "document", value: ""}))
        await dispatch(setDataPerson({type: "hobbie", value: ""}))
        await dispatch(setBooleanDisable({disable: false}))
        break;
      case "edit":
        await dispatch(setlblTitle({title: "Editar Persona"}))
        await dispatch(setDataPerson({type: "id", value: data.id}))
        await dispatch(setDataPerson({type: "name", value: data.name}))
        await dispatch(setDataPerson({type: "last_name", value: data.last_name}))
        await dispatch(setDataPerson({type: "document_type", value: data.document_type.id}))
        await dispatch(setDataPerson({type: "document", value: data.document}))
        await dispatch(setDataPerson({type: "hobbie", value: data.hobbie}))
        await dispatch(setBooleanDisable({disable: false}))
        break;
      case "show":
        await dispatch(setlblTitle({title: "Datos Persona"}))
        await dispatch(setDataPerson({type: "name", value: data.name}))
        await dispatch(setDataPerson({type: "last_name", value: data.last_name}))
        await dispatch(setDataPerson({type: "document_type", value: data.document_type.id}))
        await dispatch(setDataPerson({type: "document", value: data.document}))
        await dispatch(setDataPerson({type: "hobbie", value: data.hobbie}))
        await dispatch(setBooleanDisable({disable: true}))
        break;
    }
    await dispatch(setOpenDialog({type: "openDataPerson", value: true}))
  };

  const closeViewDataPerson = async () => {
    await dispatch(setOpenDialog({type: "openDataPerson", value: false}))
  };

  const closeConfirm = async () => {
    await dispatch(setOpenDialog({type: "openConfirm", value: false}))
  };


  const openViewDeletePerson = async (event, id) => {
    await dispatch(setDataPerson({type: "idDelete", value: id}))
    await dispatch(setOpenDialog({type: "openConfirm", value: true}))
  }

  /**
   * 
   * @param {*} event 
   * @param {*} id 
   */
  const removePerson = async (event) => {
    await dispatch(deletePerson({ id: dataPerson.idDelete }))
    
    if(constants.error) {
      await dispatch(setMesageErrors({ message: `Se presentaron los siguientes errores: ${constants.mesageErrors}` }))
      return;
    }
    await getListPersons();    
    closeConfirm(); 
  }

  /**
   * 
   */
  const saveData = async () => {
    const { id, document, document_type, name, last_name, hobbie } = dataPerson;
    const request = { id, document, document_type, name, last_name, hobbie };

    const validateForm = await validateFormPerson();

    if(validateForm == '') {
      switch(typeRequest) {
        case "add":
          await dispatch(createPerson(request));
          break;
        case "edit":
          request.id = dataPerson.id;
          await dispatch(updatePerson(request))
          break;
      }
    } else {
      await dispatch(setMesageErrors({ message: validateForm }))
      return;
    }
    
    if(constants.error) {
      await dispatch(setMesageErrors({ message: `Se presentaron los siguientes errores: ${constants.mesageErrors}` }))
      return;
    }
    await getListPersons();    
    closeViewDataPerson(); 
  }

  /**
   * 
   */
  const validateFormPerson = () => {
    let message = [];

    if(dataPerson.name.trim().length == 0) {
      message.push("Nombres");
    }
    if(dataPerson.last_name.trim().length == 0) {
      message.push("Apellidos");
    }
    if(dataPerson.document.trim().length == 0) {
      message.push("Documento");
    }
    if(`${dataPerson.document_type}`.trim().length == 0) {
      message.push("Tipo Documento");
    }
    if(dataPerson.hobbie.trim().length == 0) {
      message.push("Hobbie");
    }

    if(message.length > 0) {
      return `
        Faltan campos por llenar:

        ${message.join(", ")}
      `
    } else {
      return '';
    }
    
  }  

  return (
    <>
      <Container >
        <div align="right">
          <Button variant="contained" color="success" onClick={openViewDataPerson}>
            Agregar
          </Button>
        </div><br/>        

        <Box sx={{ bgcolor: '#cfe8fc' }} >
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Documento</TableCell>
                  <TableCell align='center'>Nombres</TableCell>
                  <TableCell align='center'>Apellidos</TableCell>
                  <TableCell align='center'>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listPersons.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align='center' component="th" scope="row">{row.document}</TableCell>
                    <TableCell align='center'>{row.name}</TableCell>
                    <TableCell align='center'>{row.last_name}</TableCell>
                    <TableCell align='center'>
                      <VisibilityIcon onClick={(event) => openViewDataPerson(event, 'show', row)}/>
                      <EditIcon onClick={ (event) => openViewDataPerson(event, 'edit', row)}/>
                      <DeleteIcon onClick={ (event) => openViewDeletePerson(event, row.id)}/>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </Box>
      </Container>
      
      
      <Dialog
        open={openDialog.openDataPerson}
        onClose={closeViewDataPerson}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {lblTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText component={'span'} id="alert-dialog-description">

            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: "1%", width: '47%' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                  required
                  id="outlined-required"
                  label="Nombres"
                  defaultValue={dataPerson.name}
                  onChange={(event) => onTxtValue(event, 'name')}
                  disabled={booleanDisable}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Apellidos"
                  defaultValue={dataPerson.last_name}
                  onChange={(event) => onTxtValue(event, 'last_name')}
                  disabled={booleanDisable}
                />
                <FormControl style={{width: "47%", margin: "1%"}}>
                  <InputLabel id="demo-simple-select-label">Tipo Documento</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={dataPerson.document_type}
                    value={dataPerson.document_type}
                    label="Tipo Documento"
                    onChange={(event) => onTxtValue(event, 'document_type')}
                    disabled={booleanDisable}
                  >
                    <MenuItem value="1">CC</MenuItem>
                    <MenuItem value="2">CE</MenuItem>
                    <MenuItem value="3">TI</MenuItem>
                    <MenuItem value="4">NIT</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  required
                  id="outlined-required"
                  label="Documento"
                  defaultValue={dataPerson.document}
                  onChange={(event) => onTxtValue(event, 'document')}
                  disabled={booleanDisable}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Hobbie"
                  defaultValue={dataPerson.hobbie}
                  onChange={(event) => onTxtValue(event, 'hobbie')}
                  disabled={booleanDisable}
                />

                {mesageErrors != ''? <AlertComponent type="error" message={mesageErrors} />: null }               
                
            </Box>

          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={closeViewDataPerson}>Cancelar</Button>
          <Button variant="contained" onClick={saveData} disabled={booleanDisable}>Guardar</Button>
        </DialogActions>
      </Dialog>


      <Dialog
        open={openDialog.openConfirm}
        onClose={closeConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Ventana de confirmación"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Desea borrar los datos de esta persona?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={closeConfirm}>Cancelar</Button>
          <Button variant="contained" color="error" onClick={removePerson}>Aceptar</Button>
        </DialogActions>
      </Dialog>      

    </>
  )
}
