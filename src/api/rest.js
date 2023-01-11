import axios from 'axios';

export class Rest {
    
    constructor() {}

    /**
     * Consumir un servicio rest mediante una peticion tipo get
     *
     * @param   {string}  url  URL del servicio
     *
     * @return  {object}       Retorna todos los datos del servicio en un objeto con atributos
     */
    getData = (url) => {
        return new Promise(async (resolve) => {
            const resp = axios.get(url).then(({data}) => {
                resolve({
                    error: false,
                    data: data.data
                });
            }).catch(({response}) => {
                resolve({
                    error: true,
                    data: response.data
                })
            });
            
        })
    }
    
    /**
     * Consumir un servicio rest mediante una peticion tipo post
     *
     * @param   {string}  url   URL del servicio
     * @param   {object}  data  Objeto request con los datos a enviar al servicio
     *
     * @return  {object}        Retorna todos los datos del servicio en un objeto con atributos
     */
    postData = (url, data) => {
        return new Promise(async (resolve) => {
            const resp = axios.post(url, data).then(({data}) => {
                resolve({
                    error: false,
                    data: data.data
                });
            }).catch(({response}) => {
                resolve({
                    error: true,
                    data: response.data
                })
            });
            
        })
    }

    /**
     * Consumir un servicio rest mediante una peticion tipo patch
     *
     * @param   {string}  url   URL del servicio
     * @param   {object}  data  Objeto request con los datos a enviar al servicio
     *
     * @return  {object}        Retorna todos los datos del servicio en un objeto con atributos
     */
    updateData = (url, data) => {
        return new Promise(async (resolve) => {
            const resp = axios.patch(url, data).then(({data}) => {
                resolve({
                    error: false,
                    data: data.data
                });
            }).catch(({response}) => {
                resolve({
                    error: true,
                    data: response.data
                })
            });
            
        })
    }

    /**
     * Consumir un servicio rest mediante una peticion tipo delete
     *
     * @param   {string}  url   URL del servicio
     * @param   {object}  data  Objeto request con los datos a enviar al servicio
     *
     * @return  {object}        Retorna todos los datos del servicio en un objeto con atributos
     */
    deleteData = (url, data) => {
        return new Promise(async (resolve) => {
            const resp = axios.delete(url, { data }).then(({data}) => {
                resolve({
                    error: false,
                    data: data.data
                });
            }).catch(({response}) => {
                resolve({
                    error: true,
                    data: response.data
                })
            });
            
        })
    }
}