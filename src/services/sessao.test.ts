import { describe, expect, it } from 'vitest';
import { sessaoExpirou } from './sessao';

describe('sessaoExpirou', () => {
    it('401 com token guardado encerra a sessão', () => {
        expect(sessaoExpirou(401, 'um-token')).toBe(true);
    });

    it('401 sem token é só login inválido', () => {
        expect(sessaoExpirou(401, null)).toBe(false);
        expect(sessaoExpirou(401, '')).toBe(false);
    });

    it('outros erros não mexem na sessão', () => {
        expect(sessaoExpirou(400, 'um-token')).toBe(false);
        expect(sessaoExpirou(500, 'um-token')).toBe(false);
        expect(sessaoExpirou(undefined, 'um-token')).toBe(false);
    });
});
