# Sphare

Galeria editorial experimental de moda, em React e Three.js.

## Executar

Abra `index.html` com um servidor HTTP local, como Live Server no VS Code. Não é necessário instalar dependências. A primeira carga requer internet para React, Three.js (esm.sh) e fontes (Google Fonts).

A estrutura original foi preservada: `index.html`, `style.css` e `sript.js` (grafia original). Os componentes e as funções de cena estão separados dentro do JavaScript, sem etapa de build.

## Etapa 2 — universos 3D

- Victoria’s Secret: superfícies de seda ondulada, órbitas e cristais.
- Dior: arcos, pétalas e iluminação dourada.
- Chanel: estruturas geométricas e colares de pérolas.
- Alexander McQueen: formas entrelaçadas e espinhos metálicos.
- Um canvas persistente, iluminação, partículas e câmera em perspectiva.
- Saída em profundidade, rotação e entrada amortecida do novo universo. Navegação bloqueada durante a introdução e as transições para evitar sobreposição.
- Mouse com parallax, inclinação e foco por peça; teclado e arraste horizontal para navegar. Figuras também recebem foco com Tab.
- Menor resolução e complexidade no mobile; pausa ao ocultar a aba, sair da área visível ou abrir o diálogo. Movimento reduzido usa renderização sob demanda.
- Carregamento sob demanda de Three.js; composição CSS preservada se a biblioteca ou o contexto WebGL falhar. Geometrias e materiais são liberados na troca de cena.

As esculturas são estudos abstratos, não reproduções de roupas. Fotografias e recortes das peças ficam para a última etapa. O efeito de desfoque atual é aplicado aos textos na transição, sem pós-processamento de profundidade de campo ou motion blur em WebGL.

Projeto independente, sem afiliação às marcas citadas.

## Etapa 3 — movimento e carregamento

Cada letra do título, legenda, item de navegação, controle e detalhe das esculturas tem entrada ou movimento independente. Hovers e foco por teclado revelam informações; as peças recebem inclinação, aproximação amortecida e luz local. Seda, cristais, pétalas, pérolas, órbitas e espinhos possuem movimentos próprios.

As transições combinam trajetórias 3D com uma camada gráfica: seda ascendente em Victoria’s Secret, abertura de portal em Dior, planos giratórios em Chanel e espiral fragmentada em McQueen. A direção acompanha a navegação; entradas e saídas têm tempos distintos por marca.

A tela de carregamento aparece antes do React e acompanha três etapas reais: interface, fontes e primeira renderização (ou alternativa CSS). A contagem representa etapas, não porcentagem de download. Fontes têm limite de espera de 3,5 segundos e o 3D de 8,5 segundos. Se o React não carregar em 15 segundos, surge uma opção de tentar novamente. A navegação fica indisponível até a abertura cinematográfica terminar.

Todas as animações respeitam a preferência de movimento reduzido do sistema. As imagens continuam reservadas para a última etapa.

## Etapa 4 — fundos em canvas

Um único Canvas 2D persistente desenha fundos procedurais atrás da galeria, sem imagens ou bibliotecas adicionais:

- Victoria’s Secret: véus de luz rosada, reflexos e pequenos brilhos ascendentes.
- Dior: arcos em perspectiva, luz suave e pétalas nas laterais.
- Chanel: trama diagonal e dois fios de pérolas com profundidade simulada.
- Alexander McQueen: ramificações orgânicas, espinhos, névoa e cinzas ascendentes.

Os fundos reagem suavemente ao mouse e se misturam durante as trocas de marca. O centro recebe menos contraste para preservar a leitura e as peças. O canvas limita resolução e frequência de desenho (30 fps no desktop; 24 fps e menos elementos no mobile). Há pausa com aba oculta, galeria fora da tela, diálogo aberto ou carregamento; movimento reduzido produz um quadro estático por atualização. Se o Canvas 2D não estiver disponível, o fundo CSS continua presente.

## Peça Dior e visualização de detalhes

`assets/roupadior1.png` ocupa o pedestal central da Dior. A imagem original é preservada, com flutuação, inclinação, sombra, hover e transição de entrada/saída. Os dados editoriais ficam em `garments`, separados da composição da cena.

Somente o botão da imagem abre o diálogo: o hover revela a indicação de clique, sem abrir o painel. A fotografia se desloca e amplia para o painel lateral, com a galeria desfocada e pausada atrás. O diálogo pode ser fechado por botão, clique fora ou Escape; o foco retorna à peça. Arrastar sobre a imagem continua navegando e não abre o detalhe. No mobile, imagem e texto se organizam verticalmente, com rolagem dentro do modal.

A descrição é baseada apenas no que é visível na imagem. Coleção, ano e composição têxtil não foram identificados. Movimento reduzido usa abertura e fechamento imediatos.

As três posições da Dior agora usam as imagens locais: `roupadior2.png` à esquerda, `roupadior1.png` ao centro e `roupadior3.png` à direita. Todas compartilham o popup acessível e têm descrição, identificação e ritmo de flutuação próprios. As imagens originais foram preservadas.

## Ajuste de composição

No desktop, o título fica à esquerda do conjunto. A galeria ganha altura e as colunas ficam mais próximas: a peça central permanece maior e as laterais aumentam com uma diferença menor de altura. As imagens preservam sua proporção e podem usar o espaço transparente do PNG além da coluna, sem ampliar a área clicável. Tablet e mobile mantêm o título alinhado à esquerda, acima das peças.

## Amostras e fichas têxteis

No desktop, colunas laterais simétricas deixam a galeria centralizada na tela, com o título à esquerda e três amostras à direita. Cada marca tem três texturas gráficas próprias. No mobile, elas aparecem abaixo das peças.

O clique abre uma ficha acessível, com pausa do cenário, desfoque, fechamento por Escape/botão e restauração de foco. Na Dior, cada ficha corresponde à fotografia na mesma posição. Nas demais marcas, as amostras são estudos conceituais claramente identificados.

As fichas separam observações visuais de dados técnicos. Composição, ligamento, gramatura, espessura, elasticidade, acabamento, forro, origem e cuidados ficam como “Não informado” até o fornecimento da ficha original. Dados confirmados podem ser preenchidos em `garments[marca][posição].textile`, usando os rótulos de `textileFields` como chaves. Nenhuma composição é inferida a partir das imagens.
