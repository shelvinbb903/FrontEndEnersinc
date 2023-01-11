import { PersonRest } from "../../../api/person-rest";
import { constants } from "../../../constants";
import { setListPersons } from "./personSlice";

const personApi = new PersonRest();

/**
 * Thunkspara obtener todos los datos de las personas
 */
export const getPersons = () => {
    return async (dispatch, getState) => {
        const resp = await personApi.listPerson(`${constants.URL_REST}/persons/`);
        
        if(resp.error) {
            let messages = [];
            for (const property in resp.data.errors) {
                messages.push(resp.data.errors[property])
            }
            
            constants.mesageErrors = messages.join(", ")
        } else {
            await dispatch(setListPersons({data: resp.data}));
        }
        constants.error = resp.error
        
    }
}

/**
 * Thunks para generar un registro en base de datos con los datos de la persona
 *
 * @param   {object}  request  Objeto request con los datos a enviar
 * 
 */
export const createPerson = (request) => {
    return async (dispatch, getState) => {
        const resp = await personApi.createPerson(`${constants.URL_REST}/persons/`, request);

        constants.responseObject = {...resp.data}

        if(resp.error) {
            let messages = [];
            for (const property in resp.data.errors) {
                messages.push(resp.data.errors[property])
            }
            
            constants.mesageErrors = messages.join(", ")
        }
        constants.error = resp.error
        
    }
}

/**
 * Thunks para actualizar un registro en base de datos con los datos de la persona
 *
 * @param   {object}  request  Objeto request con los datos a enviar
 * 
 */
export const updatePerson = (request) => {
    return async (dispatch, getState) => {
        const resp = await personApi.updatePerson(`${constants.URL_REST}/persons/`, request);
        
        constants.responseObject = {...resp.data}

        if(resp.error) {
            let messages = [];
            for (const property in resp.data.errors) {
                messages.push(resp.data.errors[property])
            }
            
            constants.mesageErrors = messages.join(", ")
        }
        constants.error = resp.error
        
    }
}

/**
 * Thunks para eliminar los datos de la persona
 *
 * @param   {object}  request  Objeto request con los datos a enviar
 * 
 */
export const deletePerson = (request) => {
    return async (dispatch, getState) => {        
        const resp = await personApi.deletePerson(`${constants.URL_REST}/persons/`, request);
        
        constants.responseObject = {...resp.data}

        if(resp.error) {
            let messages = [];
            for (const property in resp.data.errors) {
                messages.push(resp.data.errors[property])
            }
            
            constants.mesageErrors = messages.join(", ")
        }
        constants.error = resp.error
        
    }
}