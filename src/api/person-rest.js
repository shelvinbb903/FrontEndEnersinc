import { Rest } from './rest';

export class PersonRest {
    restApi = new Rest();

    constructor() {}

    /**
     * Servicio Rest para listar todos las persona mediante una peticion get
     *
     * @param   {string}  url  URL del servicio
     *
     * @return  {object}       Retorna todos los datos del servicio
     */
    listPerson = async (url) => {
        return await this.restApi.getData(url);
    }

    /**
     * Servicio Rest para borrar una persona mediante una peticion delete
     *
     * @param   {string}  url   URL del servicio
     * @param   {object}  data  Objeto request con los datos a enviar al servicio
     *
     * @return  {object}        Retorna la respuesta del servicio
     */
    deletePerson = async (url, data) => {
        return await this.restApi.deleteData(url, data);
    }

    /**
     * Servicio Rest para crear una persona mediante una peticion post
     *
     * @param   {string}  url   URL del servicio
     * @param   {object}  data  Objeto request con los datos a enviar al servicio
     *
     * @return  {object}        Retorna la respuesta del servicio
     */
    createPerson = async (url, data) => {
        return await this.restApi.postData(url, data);
    }

    /**
     * Servicio Rest para actualizar los datos de una persona mediante una peticion post
     *
     * @param   {string}  url   URL del servicio
     * @param   {object}  data  Objeto request con los datos a enviar al servicio
     *
     * @return  {object}        Retorna la respuesta del servicio
     */
    updatePerson = async (url, data) => {
        return await this.restApi.updateData(url, data);
    }
}

