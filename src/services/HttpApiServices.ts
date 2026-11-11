import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { encerrarSessao, sessaoExpirou } from './sessao';

export class HttpApiServices {
    axios : AxiosInstance

    constructor() {
        this.axios = axios.create({
            baseURL : import.meta.env.VITE_VUE_PUBLIC_API_URL + '/api'
        });

        this.axios.interceptors.request.use((config : any) => {
            const token = localStorage.getItem('token');
            if(token){
                config.headers.Authorization = 'Bearer ' + token;
            }

            return config;
        })

        this.axios.interceptors.response.use(
            (response) => response,
            (erro) => {
                if (sessaoExpirou(erro?.response?.status, localStorage.getItem('token'))) {
                    encerrarSessao();
                    window.location.href = '/';
                }
                return Promise.reject(erro);
            }
        );
    }

    post(url : string, data : any) {
        return this.axios.post(url, data);
    }
    
    put(url : string, data? : any) {
        return this.axios.put(url, data);
    }

    get(url : string) {
        return this.axios.get(url);
    }
}