const CHAVES = ['email', 'token', '_id', 'nome', 'avatar'];

export function encerrarSessao() {
    CHAVES.forEach((chave) => localStorage.removeItem(chave));
}

// Decide o que fazer com um erro da API: 401 com sessão ativa significa token
// expirado ou inválido, e a sessão precisa ser encerrada.
export function sessaoExpirou(status: number | undefined, token: string | null): boolean {
    return status === 401 && Boolean(token);
}
