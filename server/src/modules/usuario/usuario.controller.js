import RESPONSE from '../../shared/constants/response.js';

function criarControllerUsuario(service) {
    async function teste(req, res) {
        const data = await service.teste({
            suspeitos: [
                {
                    nome: 'João',
                    filtroRegra: celula => celula.valor !== 'bloqueada'
                },
                {
                    nome: 'Maria',
                    filtroRegra: celula => celula.valor !== 'proibida'
                }
            ],

            tabuleiro: {
                celulas: [
                    [
                        { linha: 0, coluna: 0 },
                        { linha: 0, coluna: 1 },
                        { linha: 0, coluna: 2 }
                    ],
                    [
                        { linha: 1, coluna: 0 },
                        { linha: 1, coluna: 1 },
                        { linha: 1, coluna: 2 }
                    ],
                    [
                        { linha: 2, coluna: 0 },
                        { linha: 2, coluna: 1 },
                        { linha: 2, coluna: 2 }
                    ]
                ]
            }
        });

        res.json({ ...RESPONSE.SUCESSO, payload: data })
    }

    return { teste }
}

export default criarControllerUsuario;