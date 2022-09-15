import { HttpApiServices } from './HttpApiServices';

export class CadastroServices extends HttpApiServices{
    async cadastrar(body : any){
        await this.post('/cadastro', body);
    }
}