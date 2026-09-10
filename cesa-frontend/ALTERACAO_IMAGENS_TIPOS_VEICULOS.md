# Imagens por tipo de veículo no Dashboard

## Alteração realizada

As imagens enviadas foram adicionadas em `public/veiculos-tipos/` e agora o Dashboard escolhe automaticamente a imagem do card de acordo com o tipo cadastrado para a placa da locação.

Mapeamento:

- Hatch -> `/veiculos-tipos/hatch.png`
- Sedan -> `/veiculos-tipos/sedan.png`
- Pickup -> `/veiculos-tipos/pickup.png`
- SUV -> `/veiculos-tipos/suv.png`
- Van -> `/veiculos-tipos/van.png`
- Micro-ônibus -> `/veiculos-tipos/micro-onibus.png`
- Ônibus -> `/veiculos-tipos/onibus.png`

A locação possui `veiculo_placa_fk`. O Dashboard procura essa placa na lista retornada por `/veiculos`, obtém o campo `tipo` e seleciona a imagem correspondente.

O tipo é normalizado antes da comparação, portanto diferenças de acentos e letras maiúsculas/minúsculas não impedem o reconhecimento.

Quando o veículo possui um tipo personalizado cadastrado pela opção `Outro`, ou quando um registro antigo não possui um tipo reconhecido, a imagem genérica anterior é usada como fallback.

As alterações no código estão marcadas com `// MELHORIA FRONT-END:`.
