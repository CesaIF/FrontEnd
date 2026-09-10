# Alterações no Front-End - filtros, exportação e dropdowns

As novas partes do código foram comentadas principalmente com `MELHORIA FRONT-END:`.

## Filtros ligados ao back-end

- Motoristas: `GET /motoristas?nome=...`
- Veículos: `GET /veiculos?placa=...`
- Abastecimentos: `GET /combustivel?q=...&tipoCombustivel=...`
- Manutenções: `GET /manutencao?q=...&tipoManutencao=...`
- Histórico de locações: `GET /locacoes/allhist?q=...`

A pesquisa usa debounce de 300 ms para evitar excesso de chamadas enquanto o usuário digita.

## Exportação

Foi criado `src/app/utils/exportCsv.js`, que usa a rota:

`POST /relatorio/exportar/:entidade`

Nas páginas de abastecimento, manutenção e histórico estão disponíveis:
- Toda a relação
- Filtro atual
- Período

Em motoristas e veículos, o botão exporta toda a relação quando não há pesquisa e o filtro atual quando existe uma pesquisa. Não há período porque essas tabelas não possuem data de cadastro no modelo atual.

## Dropdown - manutenção

Opções:
- Corretiva
- Preventiva
- Outros

Ao escolher `Outros`, aparece um campo de texto para digitar outro tipo.

## Dropdown - combustível

Opções:
- Álcool
- Gasolina
- Diesel S500
- S10
- Biodiesel
- Outros

Ao escolher `Outros`, aparece um campo de texto para digitar outro combustível.

## Correção adicional encontrada

Nos cadastros de abastecimento e manutenção existia uma chamada para `setVeiculos`, mas essa função não existia nessas páginas. Foi corrigida para atualizar, respectivamente, as listas de abastecimentos e manutenções.
