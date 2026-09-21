import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'https://esm.sh/react@19.1.0';
import { createRoot } from 'https://esm.sh/react-dom@19.1.0/client';

const h = React.createElement;
// Cada maison concentra sua direção artística aqui. Assets serão adicionados na última etapa.
const brands = [
  { id: 'victoria', name: 'Victoria’s Secret', chapter: 'The art of fantasy', subtitle: 'Entre o sonho e o espetáculo.', note: 'Seda. Luz. Liberdade.', collection: '01 — Fantasia', pieces: ['Seda em suspensão', 'Um gesto de luz', 'Anatomia de uma asa'] },
  { id: 'dior', name: 'Dior', chapter: 'The architecture of grace', subtitle: 'A delicadeza tem sua própria arquitetura.', note: 'Forma. Jardim. Silêncio.', collection: '02 — Essência', pieces: ['Arquitetura do tecido', 'Jardim suspenso', 'Um estudo em ouro'] },
  { id: 'chanel', name: 'Channel', chapter: 'Beyond the timeless', subtitle: 'O tempo passa. A linguagem permanece.', note: 'Pérola. Ritmo. Contraste.', collection: '03 — Permanência', pieces: ['Geometria do tweed', 'Ritmo de pérolas', 'Camélia abstrata'] },
  { id: 'mcqueen', name: 'Alexander McQueen', chapter: 'A beautiful darkness', subtitle: 'Na fronteira entre beleza e vertigem.', note: 'Espinho. Metal. Instinto.', collection: '04 — Metamorfose', pieces: ['Natureza indomável', 'Memória de uma asa', 'A forma do instinto'] },
];
const garments = {
  chanel: [
  {
    "id": "channel-02",
    "brand": "Channel",
    "title": "Trama em vermelho",
    "image": "./assets/roupachannel2.png",
    "alt": "Modelo com conjunto vermelho de textura entrelaçada, acabamentos claros, chapéu, luvas e bolsa coordenados.",
    "category": "Conjunto · Look 02",
    "description": "A textura vermelha pontuada por fios claros percorre o conjunto e seus acessórios. Bordas claras destacam bolsos e contornos, enquanto os botões desenham um ritmo vertical.",
    "details": [
      [
        "Cores",
        "Vermelho, marfim e detalhes escuros"
      ],
      [
        "Silhueta",
        "Casaco reto e sobreposições alongadas"
      ],
      [
        "Detalhes visuais",
        "Textura entrelaçada, bolsos e bordas contrastantes"
      ],
      [
        "Styling",
        "Chapéu, luvas, bolsa e botas coordenados"
      ]
    ],
    "note": "Descrição visual da imagem fornecida. Coleção, ano e composição têxtil não informados."
  },
  {
    "id": "channel-01",
    "brand": "Channel",
    "title": "Traços em movimento",
    "image": "./assets/roupachannel1.png",
    "alt": "Modelo com blusa clara de mangas longas e linhas verticais, acompanhada de saia longa estampada em vermelho, preto e tons claros.",
    "category": "Look fluido · Look 01",
    "description": "As linhas verticais da parte superior clara encontram uma saia longa de estampa gestual. Vermelho, preto e tons suaves percorrem as dobras amplas e dão movimento à silhueta.",
    "details": [
      [
        "Cores",
        "Marfim, vermelho, preto e rosa suave"
      ],
      [
        "Silhueta",
        "Parte superior alongada e saia longa ampla"
      ],
      [
        "Detalhes visuais",
        "Linhas finas, bordas onduladas e estampa abstrata"
      ],
      [
        "Contraste",
        "Textura linear acima e desenho livre na saia"
      ]
    ],
    "note": "Descrição visual da imagem fornecida. Coleção, ano e composição têxtil não informados."
  },
  {
    "id": "channel-03",
    "brand": "Channel",
    "title": "Ritmo em rosa",
    "image": "./assets/roupachannel3.png",
    "alt": "Modelo com conjunto rosa de textura multicolorida, casaco de bolsos, saia longa com botões e botas pretas.",
    "category": "Conjunto · Look 03",
    "description": "Linhas claras e escuras cruzam a superfície rosa do conjunto. Os contornos rosados enquadram o casaco e seus bolsos, enquanto uma sequência de botões claros acompanha a saia alongada.",
    "details": [
      [
        "Cores",
        "Rosa, marfim, cinza e preto"
      ],
      [
        "Silhueta",
        "Casaco ajustado e saia alongada"
      ],
      [
        "Detalhes visuais",
        "Textura entrelaçada, bolsos e botões claros"
      ],
      [
        "Styling",
        "Botas pretas"
      ]
    ],
    "note": "Descrição visual da imagem fornecida. Coleção, ano e composição têxtil não informados."
  }
],
  dior: {
    0: {
      id: 'dior-02', brand: 'Dior', title: 'Geometria em verde', image: './assets/roupadior2.png',
      alt: 'Modelo com conjunto xadrez verde, laço no pescoço, chapéu preto escultural e bolsa preta.',
      category: 'Conjunto · Look 02',
      description: 'O xadrez verde percorre a camisa e a minissaia em uma composição de linhas precisas. O laço no pescoço traz volume delicado, enquanto o chapéu preto de grandes dobras transforma a silhueta em um gesto escultural.',
      details: [['Cores', 'Verde escuro, branco e preto'], ['Silhueta', 'Camisa de mangas longas e minissaia'], ['Detalhes visuais', 'Xadrez miúdo, botões claros e laço no pescoço'], ['Styling', 'Chapéu escultural, bolsa preta e sapatos em tons pastel']],
      note: 'Descrição visual da imagem fornecida. Coleção, ano e composição têxtil não informados.',
    },
    2: {
      id: 'dior-03', brand: 'Dior', title: 'Arquitetura em coral', image: './assets/roupadior3.png',
      alt: 'Modelo com parte superior coral de ombros esculturais, cintura marcada e saia branca ampla com pregas.',
      category: 'Look escultural · Look 03',
      description: 'Os ombros elevados e o recorte em V dão força à parte superior coral. A cintura marcada por uma faixa clara conduz o olhar à saia branca de grande amplitude, cujas pregas desenham uma silhueta teatral.',
      details: [['Cores', 'Coral, branco e detalhes escuros'], ['Silhueta', 'Ombros ampliados, cintura marcada e saia volumosa'], ['Detalhes visuais', 'Pregas, linhas contrastantes e faixa clara na cintura'], ['Styling', 'Luvas escuras e sandálias de tom prateado']],
      note: 'Descrição visual da imagem fornecida. Coleção, ano e composição têxtil não informados.',
    },
    1: {
      id: 'dior-01', brand: 'Dior', title: 'Estudo em rosa', image: './assets/roupadior1.png',
      alt: 'Modelo com vestido rosa-claro plissado, volume escultural no busto e sandálias azuis.',
      category: 'Vestido · Look 01',
      description: 'O rosa delicado encontra uma silhueta escultural. O volume em leque no busto contrasta com as linhas verticais do plissado, enquanto a barra irregular dá leveza ao conjunto.',
      details: [['Cor', 'Rosa-claro'], ['Silhueta', 'Volume no busto e caimento fluido'], ['Detalhes visuais', 'Plissados, drapeados e barra irregular'], ['Styling', 'Sandálias em azul intenso']],
      note: 'Descrição visual da imagem fornecida. Coleção, ano e composição têxtil não informados.',
    },
  },
};
// Amostras gráficas representam aparência, não composição têxtil certificada.
const fabricStudies = {
  victoria: [
    { name: 'Luz rosada', texture: 'satin', color: '#b96987', observation: 'Referência gráfica de brilho e dobras em rosa. Ainda não há fotografia ou ficha técnica vinculada.' },
    { name: 'Trama noturna', texture: 'mesh', color: '#392029', observation: 'Referência gráfica de uma trama aberta em tom escuro; não representa um tecido identificado.' },
    { name: 'Reflexos rubi', texture: 'sparkle', color: '#8c263e', observation: 'Estudo gráfico de reflexos rubi inspirado na atmosfera da cena.' },
  ],
  dior: [
    { name: 'Xadrez verde', texture: 'check', color: '#31473d', observation: 'Na fotografia do conjunto, observa-se um padrão xadrez miúdo em verde escuro e linhas claras. A fibra e o ligamento não podem ser determinados pela imagem.' },
    { name: 'Plissado rosa', texture: 'pleat', color: '#dcb2bb', observation: 'Na fotografia do vestido, observam-se pregas finas, drapeados e volume no busto, em rosa-claro. O aspecto visual não confirma a composição do tecido.' },
    { name: 'Coral e marfim', texture: 'contrast', color: '#bd6349', observation: 'A fotografia mostra uma parte superior coral estruturada e uma saia clara ampla com pregas. Os materiais das duas partes não foram informados.' },
  ],
  chanel: [
  {
    "name": "Trama vermelha",
    "texture": "channel-red",
    "color": "#a64450",
    "observation": "O conjunto apresenta uma textura entrelaçada vermelha com linhas claras e contornos em marfim. A fotografia não confirma as fibras nem o ligamento."
  },
  {
    "name": "Marfim e gestos",
    "texture": "channel-print",
    "color": "#e7e0d6",
    "observation": "A parte superior clara apresenta linhas verticais finas. A saia combina manchas e traços em vermelho, preto e rosa sobre fundo claro. Os materiais de cada parte não foram informados."
  },
  {
    "name": "Trama rosada",
    "texture": "channel-pink",
    "color": "#dea9b8",
    "observation": "O conjunto rosa apresenta uma textura entrelaçada com linhas claras e escuras, bordas rosadas e botões claros. A composição têxtil não pode ser confirmada pela fotografia."
  }
],
  mcqueen: [
    { name: 'Sombra orgânica', texture: 'mesh', color: '#252329', observation: 'Trama gráfica escura inspirada nas formas orgânicas da cena, sem tecido real associado.' },
    { name: 'Reflexo mineral', texture: 'metal', color: '#9397a0', observation: 'Referência gráfica de reflexos metálicos; não indica a presença de fibras ou fios metálicos em uma roupa.' },
    { name: 'Vermelho profundo', texture: 'pleat', color: '#702c39', observation: 'Estudo de dobras e cor inspirado na direção artística da cena.' },
  ],
};
const textileFields = ['Composição / fibras', 'Estrutura / ligamento', 'Gramatura (g/m²)', 'Espessura', 'Elasticidade', 'Acabamento / tratamento', 'Forro', 'Fabricante / origem', 'Cuidados de conservação'];

function FabricSwatch({ sample }) {
  return h('span', { className: 'fabric-swatch texture-' + sample.texture, style: { '--sample-color': sample.color }, 'aria-hidden': true });
}

function FabricRail({ brand, phase, onOpen }) {
  return h('aside', { className: 'fabric-rail', 'aria-label': 'Amostras e fichas têxteis de ' + brand.name },
    h('p', { className: 'fabric-rail-title' }, 'Matéria & forma'),
    h('div', { className: 'fabric-options' }, ...fabricStudies[brand.id].map((sample,index) => {
      const garment = garments[brand.id]?.[index];
      return h('button', { key: brand.id + index, className: 'fabric-chip', disabled: phase !== 'idle', style: { '--sample-index': index },
        'aria-haspopup': 'dialog', 'aria-label': 'Ficha têxtil: ' + (garment?.title ?? brand.pieces[index]),
        onPointerDown: (event) => event.stopPropagation(),
        onPointerUp: (event) => event.stopPropagation(),
        onClick: (event) => onOpen({ sample, garment, brand, index },event.currentTarget),
      }, h(FabricSwatch,{sample}), h('span', { className: 'fabric-chip-number' }, number(index + 1)), h('span', { className: 'fabric-chip-name' }, sample.name));
    })),
    h('p', { className: 'fabric-rail-hint' }, 'Explore os detalhes ↗'));
}

function FabricDialog({ selection, onDismiss }) {
  const ref=useRef(null), timer=useRef(null), closing=useRef(false);
  const [exit,setExit]=useState(false);
  const { item, source: trigger }=selection;
  const { sample,garment,brand,index }=item;
  useLayoutEffect(()=>{
    const dialog=ref.current;dialog.showModal();document.documentElement.classList.add('fabric-open');
    return ()=>{clearTimeout(timer.current);dialog.close();document.documentElement.classList.remove('fabric-open');queueMicrotask(()=>{if(trigger.isConnected)trigger.focus({preventScroll:true});});};
  },[]);
  const close=()=>{
    if(closing.current)return;closing.current=true;setExit(true);
    if(matchMedia('(prefers-reduced-motion: reduce)').matches)onDismiss();
    else timer.current=setTimeout(onDismiss,300);
  };
  return h('dialog',{ref,className:'fabric-dialog'+(exit?' fabric-closing':''),'aria-labelledby':'fabric-title','aria-describedby':'fabric-disclaimer',
    onCancel:(event)=>{event.preventDefault();close();},onClick:(event)=>{if(event.target===event.currentTarget)close();}},
    h('article',{className:'fabric-sheet'},
      h('button',{className:'fabric-close',onClick:close,'aria-label':'Fechar ficha têxtil',autoFocus:true},'×'),
      h('p',{className:'eyebrow'},brand.name+' / Matéria & forma'),
      h('div',{className:'fabric-sheet-heading'},h(FabricSwatch,{sample}),h('div',null,
        h('p',{className:'fabric-kind'},garment?'Observação da fotografia':'Estudo conceitual'),
        h('h2',{id:'fabric-title'},sample.name),h('p',{className:'fabric-associated'},garment?.title ?? brand.pieces[index]))),
      h('p',{className:'fabric-observation'},sample.observation),
      h('p',{id:'fabric-disclaimer',className:'fabric-disclaimer'},'A amostra é uma ilustração. A ficha técnica original não foi fornecida; os dados abaixo aguardam confirmação.'),
      h('h3',null,'Especificações do tecido'),
      h('dl',{className:'fabric-specifications'},...textileFields.map((label)=>h('div',{key:label},h('dt',null,label),h('dd',null,garment?.textile?.[label] ?? 'Não informado')))),
      h('button',{className:'fabric-return',onClick:close},'Voltar à galeria ↗')));
}

const number = (value) => String(value).padStart(2, '0');

const transitionProfiles = {
  victoria: { exit: 900, enter: 1500, name: 'silk' },
  dior: { exit: 1000, enter: 1600, name: 'portal' },
  chanel: { exit: 850, enter: 1400, name: 'shutter' },
  mcqueen: { exit: 1050, enter: 1650, name: 'vortex' },
};

function useLoadingScreen() {
  const [fonts, setFonts] = useState(false);
  const [world, setWorld] = useState('pending');
  const [phase, setPhase] = useState('loading');
  const started = useRef(performance.now());
  const settleWorld = useCallback((ready) => setWorld((previous) => previous === 'pending' ? (ready ? 'webgl' : 'fallback') : previous), []);
  useEffect(() => {
    document.getElementById('boot-loader')?.remove();
    let live = true;
    const settle = () => { if (live) setFonts(true); };
    const timeout = setTimeout(settle, 3500);
    Promise.resolve(document.fonts?.ready).then(settle, settle);
    return () => { live = false; clearTimeout(timeout); };
  }, []);
  useEffect(() => {
    if (!fonts || world === 'pending') return;
    const delay = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : Math.max(0, 1100 - (performance.now() - started.current));
    const timer = setTimeout(() => setPhase('leaving'), delay);
    return () => clearTimeout(timer);
  }, [fonts, world]);
  useEffect(() => {
    if (phase !== 'leaving') return;
    const timer = setTimeout(() => { setPhase('done'); document.documentElement.classList.remove('is-loading'); }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 850);
    return () => clearTimeout(timer);
  }, [phase]);
  return { phase, fonts, world, settleWorld, completed: 1 + Number(fonts) + Number(world !== 'pending') };
}

function LoadingScreen({ loading }) {
  if (loading.phase === 'done') return null;
  const label = loading.world === 'pending' ? 'Preparando o primeiro universo' : !loading.fonts ? 'Compondo a tipografia' : 'O ateliê está pronto';
  return h('div', { className: 'loading-screen loading-' + loading.phase, role: 'status', 'aria-live': 'polite', 'aria-label': label },
    h('div', { className: 'loader-curtain curtain-left', 'aria-hidden': true }),
    h('div', { className: 'loader-curtain curtain-right', 'aria-hidden': true }),
    h('div', { className: 'loader-content' },
      h('p', { className: 'loader-eyebrow' }, 'Fashion in another dimension'),
      h('div', { className: 'loader-sigil', 'aria-hidden': true }, h('i'), h('i'), h('i'), h('span', null, 'S')),
      h('div', { className: 'loader-wordmark', 'aria-hidden': true }, ...Array.from('sphare').map((letter, i) => h('span', { key: i, style: { '--letter': i } }, letter))),
      h('p', { className: 'loader-status' }, label),
      h('div', { className: 'loader-progress', 'aria-label': loading.completed + ' de 3 etapas concluídas' },
        ...[true, loading.fonts, loading.world !== 'pending'].map((done, i) => h('span', { key: i, className: done ? 'is-complete' : '' }))),
      h('p', { className: 'loader-count', 'aria-hidden': true }, number(loading.completed) + ' / 03')),
    h('p', { className: 'loader-footnote' }, 'Um estudo sobre forma, luz e movimento.'));
}

function EditorialTitle({ name }) {
  let letterIndex = 0;
  const words = name.split(' ');
  return h('h1', { id: 'brand-title', 'aria-label': name }, ...words.flatMap((word, index) => [
    h('span', { className: 'title-word', key: word + index, 'aria-hidden': true }, ...Array.from(word).map((letter) => h('span', { className: 'title-letter', key: letterIndex, style: { '--letter': letterIndex++ } }, letter))),
    index < words.length - 1 ? ' ' : null,
  ]));
}

function TransitionVeil({ brand, phase }) {
  if (phase !== 'exit' && phase !== 'enter') return null;
  return h('div', { key: brand.id + phase, className: 'transition-veil veil-' + transitionProfiles[brand.id].name + ' veil-' + phase, 'aria-hidden': true },
    ...[0, 1, 2].map((index) => h('span', { key: index, style: { '--band': index } })));
}

function Arrow({ direction }) {
  return h('svg', { viewBox: '0 0 32 16', fill: 'none', 'aria-hidden': true },
    h('path', { d: direction === 'left' ? 'M30 8H2m0 0 7-6M2 8l7 6' : 'M2 8h28m0 0-7-6m7 6-7 6', stroke: 'currentColor', strokeWidth: 1 }));
}

function GarmentStudy({ title, index, garment, phase, onOpen }) {
  const ref = useRef(null);
  const gesture = useRef({ x: 0, y: 0, dragged: false });
  const [imageFailed, setImageFailed] = useState(false);
  const [imageReady, setImageReady] = useState(false);
  const move = (event) => {
    if (event.pointerType === 'touch' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    ref.current.style.setProperty('--rx', `${-(event.clientY - rect.top - rect.height / 2) / 28}deg`);
    ref.current.style.setProperty('--ry', `${(event.clientX - rect.left - rect.width / 2) / 24}deg`);
  };
  const reset = () => {
    ref.current.style.setProperty('--rx', '0deg');
    ref.current.style.setProperty('--ry', '0deg');
  };
  return h('figure', { ref, className: `study study-${index + 1}${garment ? " study-garment" : ""}`, tabIndex: garment ? undefined : 0, style: { '--piece': index }, 'data-study': index, onPointerMove: move, onPointerLeave: reset, onBlur: reset },
    garment ? h('div', { className: 'garment-frame' },
      h('span', { className: 'garment-pedestal', 'aria-hidden': true }),
      h('button', {
        className: 'garment-trigger', disabled: phase !== 'idle' || imageFailed || !imageReady,
        'aria-label': 'Ver detalhes de ' + garment.title, 'aria-haspopup': 'dialog',
        onPointerDown: (event) => {
          gesture.current = { x: event.clientX, y: event.clientY, dragged: false };
          event.currentTarget.setPointerCapture(event.pointerId);
        },
        onPointerUp: (event) => { gesture.current.dragged = Math.hypot(event.clientX - gesture.current.x, event.clientY - gesture.current.y) > 12; },
        onPointerCancel: () => { gesture.current.dragged = true; },
        onClick: (event) => { if (event.detail !== 0 && gesture.current.dragged) return; onOpen(garment, event.currentTarget); },
      }, h('img', { className: 'garment-image', src: garment.image, alt: garment.alt, width: 1414, height: 2000, loading: 'lazy', decoding: 'async', draggable: false, onLoad: () => setImageReady(true), onError: () => setImageFailed(true) })),
      imageFailed && h('span', { className: 'garment-error', role: 'status' }, 'Imagem indisponível')
    ) : h('div', { className: 'study-frame', 'aria-hidden': true },
      h('span', { className: 'study-axis' }),
      h('span', { className: 'study-shape' }),
      h('span', { className: 'study-orbit' })),
    h('figcaption', null, h('span', { className: 'study-number' }, `FIG. ${number(index + 1)}`), h('span', { className: 'study-title' }, garment?.title ?? title), h('small', null, garment ? 'Clique na peça para descobrir ↗' : 'Estudo de composição')));
}

function Scene({ brand, phase, direction, paused, onSettled, onOpen, onFabric }) {
  const [ready, setReady] = useState(false);
  const handleReady = useCallback((value) => { setReady(value); onSettled(value); }, [onSettled]);
  return h('section', { className: 'scene phase-' + phase, 'aria-labelledby': 'brand-title', style: { '--exit-duration': transitionProfiles[brand.id].exit + 'ms', '--enter-duration': transitionProfiles[brand.id].enter + 'ms', '--direction': direction } },
    h(TransitionVeil, { brand, phase }),
    h('div', { className: 'scene-heading' },
      h('p', { className: 'eyebrow' }, brand.chapter),
      h(EditorialTitle, { key: brand.id, name: brand.name }),
      h('p', { className: 'scene-subtitle' }, brand.subtitle)),
    h('div', { className: 'gallery' + (ready ? ' webgl-ready' : ''), 'aria-label': 'Peças e estudos de composição da maison ' + brand.name },
      h(WorldCanvas, { id: brand.id, phase, direction, paused, onReady: handleReady }),
      ...brand.pieces.map((title, index) => h(GarmentStudy, { key: title, title, index, garment: garments[brand.id]?.[index], phase, onOpen }))),
    h(FabricRail, { brand, phase, onOpen: onFabric }),
    h('div', { className: 'scene-bottom' },
      h('p', { className: 'material-note' }, brand.note),
      h('p', { className: 'interaction-hint' }, h('span', { 'aria-hidden': true }, '↔'), ' Arraste para explorar')));
}

function Navigation({ active, select, navigate, busy }) {
  return h('footer', { className: 'navigation' },
    h('div', { className: 'position', 'aria-label': `Universo ${active + 1} de 4` }, h('span', { key: active, className: 'position-current' }, number(active + 1)), h('span', { className: 'position-line' }), h('span', null, '04')),
    h('nav', { className: 'brand-nav', 'aria-label': 'Universos da galeria', 'aria-busy': busy }, ...brands.map((brand, index) =>
      h('button', { key: brand.id, style: { '--nav': index }, 'aria-disabled': busy, onClick: () => select(index), 'aria-current': active === index ? 'page' : undefined }, h('span', { className: 'nav-index' }, number(index + 1)), brand.name))),
    h('div', { className: 'arrows' },
      h('button', { 'aria-disabled': busy, onClick: () => navigate(-1), 'aria-label': 'Marca anterior' }, h(Arrow, { direction: 'left' })),
      h('button', { 'aria-disabled': busy, onClick: () => navigate(1), 'aria-label': 'Próxima marca' }, h(Arrow, { direction: 'right' }))));
}

function LookDialog({ selection, onDismiss }) {
  const dialog = useRef(null), expandedImage = useRef(null);
  const animation = useRef(null), closing = useRef(false), timer = useRef(null);
  const [isClosing, setIsClosing] = useState(false);
  const { item, source: trigger } = selection;
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const originTransform = () => {
    const from = trigger.querySelector('img').getBoundingClientRect();
    const to = expandedImage.current.getBoundingClientRect();
    return 'translate(' + (from.left - to.left) + 'px,' + (from.top - to.top) + 'px) scale(' + (from.width / Math.max(1,to.width)) + ',' + (from.height / Math.max(1,to.height)) + ')';
  };
  useLayoutEffect(() => {
    const element = dialog.current;
    element.showModal();
    document.documentElement.classList.add('look-open');
    if (!reduced()) animation.current = expandedImage.current.animate([
      { transform: originTransform(), opacity: .75 },
      { transform: 'none', opacity: 1 },
    ], { duration: 850, easing: 'cubic-bezier(.16,1,.3,1)' });
    return () => {
      clearTimeout(timer.current);
      animation.current?.cancel();
      element.close();
      document.documentElement.classList.remove('look-open');
      if (trigger.isConnected) trigger.focus({ preventScroll: true });
    };
  }, []);
  const close = () => {
    if (closing.current) return;
    closing.current = true;setIsClosing(true);
    if (reduced()) { onDismiss();return; }
    animation.current?.cancel();
    animation.current = expandedImage.current.animate([
      { transform: 'none', opacity: 1 },
      { transform: originTransform(), opacity: .3 },
    ], { duration: 420, easing: 'cubic-bezier(.6,0,.3,1)', fill: 'forwards' });
    timer.current = setTimeout(onDismiss, 430);
  };
  return h('dialog', {
    ref: dialog, className: 'look-dialog' + (isClosing ? ' look-closing' : ''),
    'aria-labelledby': 'look-title', 'aria-describedby': 'look-description',
    onCancel: (event) => { event.preventDefault();close(); },
    onClick: (event) => { if (event.target === event.currentTarget) close(); },
  }, h('article', { className: 'look-panel' },
    h('button', { className: 'look-close', 'aria-label': 'Fechar detalhes da peça', onClick: close, autoFocus: true }, h('span', { 'aria-hidden': true }, '×')),
    h('div', { className: 'look-visual' },
      h('span', { className: 'look-arch', 'aria-hidden': true }),
      h('img', { ref: expandedImage, className: 'look-image', src: item.image, alt: item.alt, width: 1414, height: 2000, draggable: false }),
      h('span', { className: 'look-image-label' }, item.brand.toUpperCase() + ' / ' + item.id.split('-').at(-1))),
    h('div', { className: 'look-information' },
      h('p', { className: 'eyebrow' }, item.brand + ' — Um olhar de perto'),
      h('p', { className: 'look-category' }, item.category),
      h('h2', { id: 'look-title' }, item.title),
      h('p', { id: 'look-description' }, item.description),
      h('dl', { className: 'look-details' }, ...item.details.map(([label,value]) => h('div', { key: label }, h('dt', null, label), h('dd', null, value)))),
      h('p', { className: 'look-note' }, item.note),
      h('button', { className: 'look-return', onClick: close }, 'Voltar à galeria', h('span', { 'aria-hidden': true }, '↗')))));
}

function App() {
  const loading = useLoadingScreen();
  const { active, phase, direction, select, navigate } = useGalleryTransition(loading.phase !== 'loading');
  const [about, setAbout] = useState(false);
  const [look, setLook] = useState(null);
  const openLook = useCallback((item, source) => setLook({ item, source }), []);
  const dismissLook = useCallback(() => setLook(null), []);
  const [fabric, setFabric] = useState(null);
  const openFabric = useCallback((item, source) => setFabric({ item, source }), []);
  const dismissFabric = useCallback(() => setFabric(null), []);
  const paused = about || Boolean(look) || Boolean(fabric);
  const start = useRef(null);
  const dialog = useRef(null);
  const brand = brands[active];

  useEffect(() => {
    const keydown = (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey || document.querySelector('dialog[open]') || event.target.closest('input, textarea, select, [contenteditable]')) return;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        navigate(event.key === 'ArrowRight' ? 1 : -1);
      }
    };
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  }, []);
  useEffect(() => {
    if (about) dialog.current.showModal();
    else if (dialog.current.open) dialog.current.close();
  }, [about]);
  return h(React.Fragment, null, h(LoadingScreen, { loading }), h('main', { inert: loading.phase !== 'done', className: `experience theme-${brand.id}${loading.phase !== 'loading' ? ' ui-ready' : ''}${paused ? ' is-paused' : ''}` },
    h('div', { className: 'ambient', 'aria-hidden': true }),
    h(BackgroundCanvas, { id: brand.id, phase, paused }),
    h('header', { className: 'header' },
      h('a', { className: 'wordmark', href: './', 'aria-label': 'Sphare, início' }, 'sphare', h('span', null, '®')),
      h('p', { className: 'header-caption' }, 'An independent fashion study'),
      h('button', { className: 'about-button', onClick: () => setAbout(true) }, 'Sobre o projeto', h('span', { 'aria-hidden': true }, '↗'))),
    h('div', { className: 'exhibition-line' }, h('span', null, 'Digital couture gallery'), h('span', null, 'Volume 001 — Além da forma')),
    h('div', { className: 'scene-stage', onPointerDown: (event) => { if (!event.isPrimary || event.button !== 0) return; if (!event.target.closest('.garment-trigger')) event.currentTarget.setPointerCapture(event.pointerId); start.current = { x: event.clientX, y: event.clientY }; }, onPointerCancel: () => { start.current = null; }, onPointerUp: (event) => {
      if (!start.current) return;
      const dx = event.clientX - start.current.x;
      const dy = event.clientY - start.current.y;
      start.current = null;
      if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.5) navigate(dx < 0 ? 1 : -1);
    } }, h(Scene, { brand, phase, direction, paused, onSettled: loading.settleWorld, onOpen: openLook, onFabric: openFabric })),
    h('p', { className: 'sr-only', role: 'status', 'aria-live': 'polite' }, `${brand.name}. Universo ${active + 1} de 4.`),
    h(Navigation, { active, select, navigate, busy: phase !== 'idle' }),
    look && h(LookDialog, { selection: look, onDismiss: dismissLook }),
    fabric && h(FabricDialog, { selection: fabric, onDismiss: dismissFabric }),
    h('dialog', { ref: dialog, className: 'about-dialog', 'aria-labelledby': 'about-title', onClose: () => setAbout(false), onClick: (event) => { if (event.target === event.currentTarget) setAbout(false); } },
      h('div', { className: 'about-content' },
        h('p', { className: 'eyebrow' }, 'Sobre Sphare'),
        h('h2', { id: 'about-title' }, 'A moda como espaço.'),
        h('p', null, 'Uma galeria experimental que investiga forma, movimento e a linguagem de quatro maisons. Um encontro entre editorial de moda e instalação digital.'),
        h('p', { className: 'project-note' }, 'Projeto independente, sem afiliação às marcas. Esculturas digitais exploram a identidade de cada universo e marcam o espaço das futuras fotografias.'),
        h('button', { className: 'close-button', onClick: () => setAbout(false) }, 'Voltar à galeria ↗')))));
}



// Three.js é carregado sob demanda: uma falha no WebGL não impede a galeria em CSS.
const worldPalettes = {
  victoria: { accent: 0xe4a0b3, secondary: 0x892c55, light: 0xffb4ca, fog: 0x241218 },
  dior: { accent: 0xd5bd84, secondary: 0xeae2cd, light: 0xfff3d6, fog: 0xe5e1d6 },
  chanel: { accent: 0xe7d5ad, secondary: 0xeee9df, light: 0xffedd0, fog: 0x171819 },
  mcqueen: { accent: 0x9c283f, secondary: 0xbfc5d0, light: 0xc9d6ff, fog: 0x141416 },
};

function disposeWorld(group) {
  const geometries = new Set();
  const materials = new Set();
  group.traverse((object) => {
    if (object.geometry) geometries.add(object.geometry);
    if (object.material) (Array.isArray(object.material) ? object.material : [object.material]).forEach((material) => materials.add(material));
  });
  geometries.forEach((geometry) => geometry.dispose());
  materials.forEach((material) => material.dispose());
  group.removeFromParent();
}

function createWorld(THREE, id, compact) {
  const palette = worldPalettes[id];
  const group = new THREE.Group();
  const sculptures = [];
  const metal = new THREE.MeshStandardMaterial({ color: palette.accent, metalness: .72, roughness: .28, side: THREE.DoubleSide });
  const pearl = new THREE.MeshStandardMaterial({ color: palette.secondary, metalness: .22, roughness: .24, side: THREE.DoubleSide });
  const lineMaterial = new THREE.LineBasicMaterial({ color: palette.accent, transparent: true, opacity: .28 });
  const mesh = (parent, geometry, material = metal) => {
    const object = new THREE.Mesh(geometry, material);
    parent.add(object);
    return object;
  };
  const ring = (parent, radius, tilt = 0) => {
    const points = Array.from({ length: 81 }, (_, i) => {
      const angle = i / 80 * Math.PI * 2;
      return new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
    });
    const object = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), lineMaterial);
    object.rotation.set(.35, tilt, -.35);
    object.userData.motion = 'orbit';
    parent.add(object);
    return object;
  };
  for (let index = 0; index < 3; index++) {
    const sculpture = new THREE.Group();
    sculpture.userData.index = index;
    sculpture.userData.hover = 0;
    sculpture.userData.travel = { value: -1, velocity: 0 };
    if (id === 'victoria') {
      // Superficie ondulada, calculada sem texturas ou fotografias.
      const geometry = new THREE.PlaneGeometry(1.25, 2.8, compact ? 12 : 26, compact ? 24 : 48);
      const position = geometry.attributes.position;
      for (let vertex = 0; vertex < position.count; vertex++) {
        const x = position.getX(vertex);
        const y = position.getY(vertex);
        const twist = y * .85 + index * .6;
        const width = x * (1 + .22 * Math.sin(y * 2));
        position.setXYZ(vertex, width * Math.cos(twist), y, width * Math.sin(twist) + .15 * Math.sin(y * 4 + x * 5));
      }
      geometry.computeVertexNormals();
      const silk = mesh(sculpture, geometry);
      silk.userData.motion = 'silk';
      silk.rotation.z = index === 1 ? -.15 : .22;
      ring(sculpture, 1.45, .8);
      for (let i = 0; i < 5; i++) {
        const crystal = mesh(sculpture, new THREE.OctahedronGeometry(.06 + i * .012), pearl);
        crystal.userData.motion = 'crystal';
        crystal.position.set(Math.sin(i * 2 + index) * 1.1, Math.cos(i * 1.7) * 1.55, -.2);
      }
    } else if (id === 'dior') {
      const arch = mesh(sculpture, new THREE.TorusGeometry(.9, .035, 8, 48, Math.PI));
      arch.position.y = .4;
      [-.9, .9].forEach((x) => {
        const column = mesh(sculpture, new THREE.CylinderGeometry(.035, .035, 1.75, 8));
        column.position.set(x, -.475, 0);
      });
      for (let i = 0; i < (garments[id]?.[index] ? 0 : 5); i++) {
        const petal = mesh(sculpture, new THREE.SphereGeometry(.48, compact ? 12 : 24, 12), pearl);
        const angle = i / 5 * Math.PI * 2;
        petal.userData.motion = 'petal';
        petal.scale.set(.6, 1.1, .1);
        petal.position.set(Math.sin(angle) * .32, Math.cos(angle) * .32, .12 + i * .035);
        petal.rotation.set(.35, angle * .3, -angle);
      }
      if (!garments[id]?.[index]) mesh(sculpture, new THREE.IcosahedronGeometry(.13, 1));
      ring(sculpture, 1.22, 1.1);
    } else if (id === 'chanel') {
      const frameGeometry = new THREE.BoxGeometry(1.5, 2.1, .22);
      const frame = new THREE.LineSegments(new THREE.EdgesGeometry(frameGeometry), lineMaterial);
      frameGeometry.dispose();
      frame.userData.motion = 'frame';
      sculpture.add(frame);
      frame.rotation.z = -.18 + index * .18;
      const beadGeometry = new THREE.SphereGeometry(.095, compact ? 10 : 16, 10);
      for (let i = 0; i < (garments[id]?.[index] ? 0 : 22); i++) {
        const angle = i / 22 * Math.PI * 2;
        const bead = mesh(sculpture, beadGeometry, pearl);
        bead.userData.motion = 'pearl';
        bead.position.set(Math.cos(angle) * .77, Math.sin(angle) * 1.13, Math.sin(angle * 2) * .25);
      }
      if (!garments[id]?.[index]) {
      const seal = mesh(sculpture, new THREE.TorusGeometry(.36, .075, 10, 36));
      seal.userData.motion = 'seal';
      seal.rotation.x = .35;
      }
      ring(sculpture, 1.43, .6);
    } else {
      const bone = mesh(sculpture, new THREE.TorusKnotGeometry(.55, .055, compact ? 56 : 100, 8, 2, 3), pearl);
      bone.userData.motion = 'bone';
      bone.scale.y = 1.65;
      for (let i = 0; i < 11; i++) {
        const angle = i / 11 * Math.PI * 2;
        const thorn = mesh(sculpture, new THREE.ConeGeometry(.085, .45 + (i % 3) * .14, 5), i % 2 ? pearl : metal);
        thorn.userData.motion = 'thorn';
        thorn.position.set(Math.sin(angle) * .87, Math.cos(angle) * 1.15, Math.sin(angle * 3) * .22);
        thorn.rotation.z = -angle;
      }
      ring(sculpture, 1.45, 1.2);
    }
    sculpture.children.forEach((child, part) => {
      child.userData.rest = { position: child.position.clone(), rotation: child.rotation.clone(), scale: child.scale.clone(), seed: index * 2.7 + part * .61 };
    });
    group.add(sculpture);
    sculptures.push(sculpture);
  }
  const count = compact ? 45 : 130;
  const particles = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Distribuição determinística evita saltos aleatórios ao revisitar uma maison.
    particles[i * 3] = Math.sin(i * 127.1) * 6;
    particles[i * 3 + 1] = Math.cos(i * 311.7) * 2.8;
    particles[i * 3 + 2] = -1 - (i % 19) * .3;
  }
  const dustGeometry = new THREE.BufferGeometry();
  dustGeometry.setAttribute('position', new THREE.BufferAttribute(particles, 3));
  const dust = new THREE.Points(dustGeometry, new THREE.PointsMaterial({ color: palette.accent, size: compact ? .022 : .018, transparent: true, opacity: .5, depthWrite: false }));
  group.add(dust);
  return { group, sculptures, dust, palette };
}

// Trajetórias distintas, reutilizadas na saída e na entrada com direção reversível.
function transitionPose(id, travel, index, direction) {
  const distance = Math.abs(travel), side = index - 1;
  if (id === 'victoria') return { x: side * distance * 1.9, y: travel * (2 + index * .4), z: -distance * 4.5, rx: travel * .35, ry: direction * travel * 1.2, rz: direction * travel * (side * .6 + .3), scale: 1 - distance * .3 };
  if (id === 'dior') return { x: side * distance * 2.5, y: Math.sin(distance * Math.PI) * .35, z: -distance * (7 + index), rx: 0, ry: side * travel * Math.PI / 2, rz: 0, scale: 1 - distance * .15 };
  if (id === 'chanel') return { x: direction * travel * (1 + side * .3), y: side * travel * .65, z: -distance * (3 + index * 1.4), rx: travel * Math.PI * .25, ry: direction * travel * Math.PI, rz: direction * travel * Math.PI * .25, scale: 1 - distance * .25 };
  const angle = travel * direction * Math.PI;
  return { x: Math.sin(angle) * (1.4 + index * .4), y: (Math.cos(angle) - 1) * (side || .5) * .8, z: -distance * 6.5, rx: travel * .7, ry: angle * .7, rz: angle, scale: 1 - distance * .5 };
}

function animateDetail(child, drift, hover, travel, reduced) {
  const rest = child.userData.rest;
  if (!rest) return;
  child.position.copy(rest.position);
  child.rotation.copy(rest.rotation);
  child.scale.copy(rest.scale);
  if (reduced) return;
  const wave = Math.sin(drift * .8 + rest.seed);
  const motion = child.userData.motion;
  if (motion === 'silk') {
    child.rotation.x += wave * .16;
    child.rotation.y += Math.cos(drift * .48 + rest.seed) * .23;
    child.scale.x *= 1 + wave * .045 + hover * .06;
  } else if (motion === 'crystal') {
    child.position.y += wave * .17;
    child.rotation.y += drift * .32 + rest.seed;
    child.rotation.z += drift * .13;
  } else if (motion === 'petal') {
    child.rotation.x += wave * .2 + hover * .35;
    child.position.multiplyScalar(1 + hover * .27 + Math.abs(travel) * .4);
  } else if (motion === 'pearl') {
    child.position.z += wave * .13 + hover * Math.cos(rest.seed) * .18;
    child.scale.multiplyScalar(1 + wave * .055);
  } else if (motion === 'thorn') {
    child.position.multiplyScalar(1 + wave * .04 + hover * .13 + Math.abs(travel) * .5);
    child.rotation.y += wave * .17;
  } else if (motion === 'bone') {
    child.rotation.y += Math.sin(drift * .3 + rest.seed) * .24;
    child.rotation.z += wave * .09;
  } else if (motion === 'orbit') {
    child.rotation.z += drift * .045 + hover * .2;
    child.rotation.y += wave * .15;
  } else if (motion === 'frame' || motion === 'seal') {
    child.rotation.z += wave * .07 + hover * .13;
    child.rotation.y += Math.sin(drift * .4 + rest.seed) * .13;
  } else {
    child.position.y += wave * .015;
  }
}

function createStage(THREE, host, getState, onReady) {
  const compact = matchMedia('(max-width: 600px)').matches;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !compact, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, compact ? 1.25 : 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.4;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, .1, 60);
  camera.position.z = 8;
  scene.add(new THREE.HemisphereLight(0xfff1e3, 0x342b40, 2.1));
  const key = new THREE.DirectionalLight(0xffecdc, 4);
  key.position.set(-3, 5, 6);
  scene.add(key);
  const rim = new THREE.PointLight(0xffb4ca, 35, 18, 2);
  rim.position.set(3, 1, 3);
  scene.add(rim);
  const fill = new THREE.DirectionalLight(0xcbd9ff, 1.6);
  fill.position.set(3, -2, -3);
  scene.add(fill);
  const hoverLight = new THREE.PointLight(0xffeedb, 0, 5, 2);
  hoverLight.position.z = 2.5;
  scene.add(hoverLight);
  const pointer = { x: 0, y: 0, index: -1 };
  const spring = { value: motion.matches ? 0 : 1, velocity: 0 };
  const gallery = host.parentElement;
  let world;
  let currentId;
  let width = 1;
  let height = 1;
  let frame = 0;
  let previous = 0;
  let elapsed = 0;
  let disposed = false;
  let failed = false;
  let visible = true;
  let dirty = true;
  let rendered = false;
  let previousPhase;
  let phaseAge = 0;
  let centers = [];
  const measure = () => { centers = Array.from(gallery.querySelectorAll("[data-study]"), (figure) => (figure.offsetLeft + figure.offsetWidth / 2) / width - .5); };
  const resize = () => {
    width = Math.max(1, host.clientWidth);
    height = Math.max(1, host.clientHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, width < 600 ? 1.25 : 1.75));
    renderer.setSize(width, height, false);
    measure();
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    dirty = true;
    schedule();
  };
  const move = (event) => {
    if (event.pointerType === 'touch' || motion.matches) return;
    const rect = gallery.getBoundingClientRect();
    pointer.x = (event.clientX - rect.left) / rect.width * 2 - 1;
    pointer.y = (event.clientY - rect.top) / rect.height * 2 - 1;
    pointer.index = Math.min(2, Math.max(0, Math.floor((pointer.x + 1) * 1.5)));
  };
  const leave = () => { pointer.x = 0; pointer.y = 0; pointer.index = -1; };
  const focus = (event) => { pointer.index = Number(event.target.closest('[data-study]')?.dataset.study ?? -1); dirty = true; schedule(); };
  function schedule() {
    if (!frame && !disposed && !failed && visible && !document.hidden) frame = requestAnimationFrame(render);
  }
  function render(now) {
    frame = 0;
    if (disposed || failed) return;
    const state = getState();
    const dt = Math.min((now - (previous || now)) / 1000, .033);
    previous = now;
    if (!motion.matches && !state.paused) elapsed += dt;
    if (currentId !== state.id) {
      if (world) disposeWorld(world.group);
      world = createWorld(THREE, state.id, compact);
      currentId = state.id;
      measure();
      scene.add(world.group);
      scene.fog = new THREE.FogExp2(world.palette.fog, .035);
      rim.color.setHex(world.palette.light);
      spring.value = motion.matches ? 0 : -1;
      spring.velocity = 0;
      dirty = true;
    }
    if (previousPhase !== state.phase) { previousPhase = state.phase; phaseAge = 0; }
    if (!state.paused) phaseAge += dt;
    const target = state.phase === 'exit' ? 1 : state.phase === 'loading' ? -1 : 0;
    if (motion.matches) { spring.value = 0; spring.velocity = 0; }
    else {
      spring.velocity += ((target - spring.value) * 76 - spring.velocity * 18) * dt;
      spring.value += spring.velocity * dt;
    }
    const travel = Math.max(-1, Math.min(1, spring.value));
    const drift = motion.matches ? 0 : elapsed;
    const smoothing = 1 - Math.exp(-dt * 4.5);
    const parallaxX = motion.matches || state.paused ? 0 : pointer.x;
    const parallaxY = motion.matches || state.paused ? 0 : pointer.y;
    camera.position.x += (parallaxX * .2 - camera.position.x) * smoothing;
    camera.position.y += (-parallaxY * .1 - camera.position.y) * smoothing;
    camera.position.z = 8 - Math.abs(travel) * (state.id === 'dior' ? 1.2 : .65);
    camera.lookAt(0, 0, 0);
    camera.rotation.z = state.id === 'mcqueen' ? travel * state.direction * .09 : 0;
    // As posições acompanham os centros das figuras HTML, inclusive após redimensionamento.
    const span = 2 * Math.tan(THREE.MathUtils.degToRad(18)) * 8;
    const mobile = width < 600;
    const size = mobile ? Math.min(.78, width / height * .65) : 1;
    world.sculptures.forEach((sculpture, index) => {
      const center = centers[index] ?? (index - 1) * .33;
      const hovered = pointer.index === index && !state.paused && state.phase === 'idle';
      sculpture.userData.hover += ((hovered ? 1 : 0) - sculpture.userData.hover) * (motion.matches ? 1 : smoothing);
      const hover = sculpture.userData.hover;
      const local = sculpture.userData.travel;
      const stagger = (state.direction > 0 ? index : 2 - index) * .065;
      const localTarget = state.phase === 'loading' ? -1 : state.phase === 'exit' ? (phaseAge > stagger ? 1 : 0) : (phaseAge > stagger ? 0 : -1);
      if (motion.matches) { local.value = 0; local.velocity = 0; }
      else if (!state.paused) {
        local.velocity += ((localTarget - local.value) * 72 - local.velocity * 17) * dt;
        local.value += local.velocity * dt;
      }
      const localTravel = Math.max(-1, Math.min(1, local.value));
      const pose = transitionPose(state.id, localTravel, index, state.direction);
      const idle = motion.matches ? 0 : Math.sin(drift * (.42 + index * .09) + index * 2);
      sculpture.position.x = center * span * camera.aspect + pose.x;
      sculpture.position.y = (index === 1 ? .16 : -.15) + idle * .1 + pose.y;
      sculpture.position.z = pose.z + (motion.matches ? 0 : hover * .35);
      const targetY = pose.ry + parallaxX * (.09 + hover * .25) + (motion.matches ? 0 : Math.sin(drift * .18 + index) * .13);
      sculpture.rotation.y += (targetY - sculpture.rotation.y) * (motion.matches ? 1 : smoothing);
      sculpture.rotation.x += (pose.rx - parallaxY * .16 - sculpture.rotation.x) * (motion.matches ? 1 : smoothing);
      sculpture.rotation.z = pose.rz + idle * .025;
      sculpture.scale.setScalar(size * (index === 1 ? 1.09 : .91) * pose.scale * (1 + (motion.matches ? 0 : hover * .035)));
      sculpture.children.forEach((child) => animateDetail(child, drift, hover, localTravel, motion.matches));
    });
    const selected = world.sculptures[pointer.index];
    hoverLight.intensity += ((selected && state.phase === 'idle' ? 5 : 0) - hoverLight.intensity) * smoothing;
    if (selected) {
      hoverLight.position.x += (selected.position.x - hoverLight.position.x) * smoothing;
      hoverLight.position.y += (selected.position.y + .8 - hoverLight.position.y) * smoothing;
    }
    rim.position.x = 3 + Math.sin(drift * .25) * .45;
    world.dust.rotation.y = drift * .025 + travel * state.direction * (state.id === 'mcqueen' ? 2 : .6);
    world.dust.rotation.z = state.id === 'mcqueen' ? travel * state.direction * .8 : Math.sin(drift * .08) * .04;
    host.style.opacity = String(1 - Math.min(1, Math.abs(travel)));


    if (!motion.matches || dirty) {
      renderer.render(scene, camera);
      dirty = false;
      if (!rendered) { rendered = true; onReady(true); }
    }
    if (!motion.matches && !state.paused) schedule();
  }
  const visibility = () => {
    previous = 0;
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
    else schedule();
  };
  const changeMotion = () => { leave(); dirty = true; schedule(); };
  const lost = (event) => {
    event.preventDefault();
    failed = true;
    cancelAnimationFrame(frame);
    frame = 0;
    host.style.opacity = '0';
    onReady(false);
  };
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    previous = 0;
    if (visible) schedule();
    else { cancelAnimationFrame(frame); frame = 0; }
  });
  intersection.observe(host);
  gallery.addEventListener('pointermove', move);
  gallery.addEventListener('pointerleave', leave);
  gallery.addEventListener('focusin', focus);
  gallery.addEventListener('focusout', leave);
  document.addEventListener('visibilitychange', visibility);
  motion.addEventListener('change', changeMotion);
  renderer.domElement.addEventListener('webglcontextlost', lost);
  resize();
  return {
    update() { dirty = true; schedule(); },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      gallery.removeEventListener('pointermove', move);
      gallery.removeEventListener('pointerleave', leave);
      gallery.removeEventListener('focusin', focus);
      gallery.removeEventListener('focusout', leave);
      document.removeEventListener('visibilitychange', visibility);
      motion.removeEventListener('change', changeMotion);
      renderer.domElement.removeEventListener('webglcontextlost', lost);
      if (world) disposeWorld(world.group);
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
}

function WorldCanvas({ id, phase, direction, paused, onReady }) {
  const host = useRef(null);
  const engine = useRef(null);
  const state = useRef({ id, phase, direction, paused });
  state.current = { id, phase, direction, paused };
  useEffect(() => {
    let cancelled = false;
    let settled = false;
    const ready = (value) => { settled = true; clearTimeout(deadline); if (!cancelled) onReady(value); };
    const deadline = setTimeout(() => {
      if (settled || cancelled) return;
      cancelled = true;
      engine.current?.dispose();
      engine.current = null;
      onReady(false);
    }, 8500);
    import('https://esm.sh/three@0.180.0').then((THREE) => {
      if (!cancelled) engine.current = createStage(THREE, host.current, () => state.current, ready);
    }).catch((error) => {
      ready(false);
      console.warn('Sphare: versão CSS ativa; WebGL indisponível.', error);
    });
    return () => { cancelled = true; clearTimeout(deadline); engine.current?.dispose(); engine.current = null; };
  }, [onReady]);
  useEffect(() => { engine.current?.update(); }, [id, phase, direction, paused]);
  return h('div', { ref: host, className: 'world-canvas', 'aria-hidden': true });
}

function useGalleryTransition(ready) {
  const [view, setView] = useState({ active: 0, phase: 'loading', direction: 1 });
  const current = useRef(view);
  const timers = useRef([]);
  const pending = useRef(null);
  const commit = (next) => { current.current = next; setView(next); };
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => {
    if (!ready || current.current.phase !== 'loading') return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    commit({ ...current.current, phase: reduced ? 'idle' : 'intro' });
    if (!reduced) timers.current.push(setTimeout(() => commit({ ...current.current, phase: 'idle' }), 1750));
  }, [ready]);
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const settle = () => {
      if (preference.matches && current.current.phase !== 'loading') {
        clear();
        commit({ ...current.current, active: pending.current ?? current.current.active, phase: 'idle' });
        pending.current = null;
      }
    };
    preference.addEventListener('change', settle);
    return () => { clear(); preference.removeEventListener('change', settle); };
  }, []);
  const select = (index, direction = index > current.current.active ? 1 : -1) => {
    if (current.current.phase !== 'idle' || index === current.current.active) return;
    clear();
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      commit({ active: index, phase: 'idle', direction });
      return;
    }
    pending.current = index;
    const outgoing = brands[current.current.active].id;
    commit({ ...current.current, phase: 'exit', direction });
    timers.current.push(setTimeout(() => {
      commit({ active: index, phase: 'enter', direction });
      timers.current.push(setTimeout(() => {
        pending.current = null;
        commit({ active: index, phase: 'idle', direction });
      }, transitionProfiles[brands[index].id].enter));
    }, transitionProfiles[outgoing].exit));
  };
  return { ...view, select, navigate: (delta) => select((current.current.active + delta + brands.length) % brands.length, Math.sign(delta)) };
}



// Um único canvas de fundo, independente do WebGL das esculturas.
const backgroundPainters = {
  victoria(ctx, env) {
    const { w, h, time, mouse, energy, compact } = env;
    for (const side of [-1, 1]) {
      const edge = side < 0 ? 0 : w;
      for (let i = 0; i < (compact ? 3 : 5); i++) {
        const sway = Math.sin(time * .22 + i * .7) * w * .045 + mouse.x * 15;
        const reach = (w * (.12 + i * .025) + sway) * -side;
        const shift = energy * h * .2 * (i % 2 ? 1 : -1);
        const sheen = ctx.createLinearGradient(edge, 0, edge + reach, h);
        sheen.addColorStop(0, 'rgba(236,130,174,0)');
        sheen.addColorStop(.35, 'rgba(218,112,152,.065)');
        sheen.addColorStop(.7, 'rgba(250,184,210,.14)');
        sheen.addColorStop(1, 'rgba(176,62,113,0)');
        ctx.fillStyle = sheen;
        ctx.beginPath();
        ctx.moveTo(edge + side * 40, h * .08 + shift);
        ctx.bezierCurveTo(edge + reach * 1.7, h * .25, edge - reach * .4, h * .62, edge + reach, h * 1.08 + shift);
        ctx.bezierCurveTo(edge + reach * .3, h * .64, edge + reach * 2.25, h * .27, edge + side * 80, h * .06 + shift);
        ctx.fill();
        ctx.strokeStyle = 'rgba(249,183,209,.08)';
        ctx.lineWidth = .7;
        ctx.stroke();
      }
      const glow = ctx.createRadialGradient(edge + -side * w * .1, h * .3, 0, edge, h * .4, w * .55);
      glow.addColorStop(0, 'rgba(219,94,145,.13)');
      glow.addColorStop(1, 'rgba(219,94,145,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);
    }
    for (let i = 0; i < (compact ? 28 : 65); i++) {
      const depth = .3 + seeded(i + 80) * .7;
      const x = (seeded(i) * w + Math.sin(time * .17 + i) * 18 + mouse.x * depth * 16);
      const y = ((seeded(i + 9) * h - time * (3 + depth * 5)) % h + h) % h;
      const light = .13 + Math.pow((Math.sin(time * .7 + i) + 1) / 2, 4) * .45;
      ctx.strokeStyle = `rgba(255,209,222,${light})`;
      ctx.lineWidth = .65;
      const radius = (i % 7 === 0 ? 3 : 1) * depth;
      ctx.beginPath(); ctx.moveTo(x - radius, y); ctx.lineTo(x + radius, y);
      ctx.moveTo(x, y - radius); ctx.lineTo(x, y + radius); ctx.stroke();
    }
  },
  dior(ctx, env) {
    const { w, h, time, mouse, energy, compact, project } = env;
    // Arcos em perspectiva: os mais distantes ficam menores e mais delicados.
    for (let i = 0; i < (compact ? 5 : 8); i++) {
      const z = .5 + i * 1.45 - Math.sin(time * .15) * .22 + energy * 2;
      const point = (x, y) => project(x, y, z);
      ctx.strokeStyle = `rgba(119,98,57,${.19 - i * .014})`;
      ctx.lineWidth = i === 0 ? 1.2 : .8;
      const base = point(-2.3, 1.6);
      ctx.beginPath(); ctx.moveTo(base.x, base.y);
      const start = point(-2.3, -.25); ctx.lineTo(start.x, start.y);
      for (let step = 0; step <= 36; step++) {
        const angle = Math.PI - step / 36 * Math.PI;
        const p = point(Math.cos(angle) * 2.3, -.25 - Math.sin(angle) * 2);
        ctx.lineTo(p.x, p.y);
      }
      const end = point(2.3, 1.6); ctx.lineTo(end.x, end.y); ctx.stroke();
      if (i < 5) {
        const left = point(-2.3, 1.6), right = point(2.3, 1.6);
        ctx.strokeStyle = 'rgba(130,111,77,.07)';
        ctx.beginPath();ctx.moveTo(left.x,left.y);ctx.lineTo(right.x,right.y);ctx.stroke();
      }
    }
    const light = ctx.createRadialGradient(w * .5, h * .37, 0, w * .5, h * .5, w * .55);
    light.addColorStop(0, 'rgba(255,252,231,.25)'); light.addColorStop(1, 'rgba(255,252,231,0)');
    ctx.fillStyle = light;ctx.fillRect(0,0,w,h);
    for (let i = 0; i < (compact ? 12 : 25); i++) {
      const side = i % 2 ? .86 : .14;
      const x = w * side + Math.sin(time * .18 + i * 2) * w * .075 + mouse.x * 8;
      const y = ((seeded(i + 20) * h + time * (4 + i % 4)) % (h * 1.1)) - h * .05;
      ctx.save();ctx.translate(x,y);ctx.rotate(time * .17 + i);
      ctx.scale(.5 + Math.abs(Math.sin(time * .23 + i)) * .5,1);
      ctx.fillStyle = 'rgba(179,156,109,.12)';ctx.strokeStyle = 'rgba(138,111,62,.16)';ctx.lineWidth = .7;
      ctx.beginPath();ctx.ellipse(0,0,4 + i % 3,9 + i % 5,.4,0,Math.PI * 2);ctx.fill();ctx.stroke();ctx.restore();
    }
  },
  chanel(ctx, env) {
    const { w, h, time, mouse, energy, compact, project } = env;
    ctx.save();ctx.translate(w / 2 + mouse.x * 10,h * .52 + mouse.y * 7);
    ctx.rotate(Math.PI / 4 + Math.sin(time * .12) * .035 + energy * .2);
    const spacing = compact ? 70 : 108;
    const extent = Math.hypot(w,h);
    ctx.lineWidth = .6;ctx.strokeStyle = 'rgba(209,194,164,.075)';
    ctx.beginPath();
    for(let p = -extent; p <= extent; p += spacing) {
      ctx.moveTo(p,-extent);ctx.lineTo(p,extent);
      ctx.moveTo(-extent,p);ctx.lineTo(extent,p);
    }
    ctx.stroke();ctx.restore();
    for(let strand = 0; strand < 2; strand++) {
      const count = compact ? 30 : 58;
      for(let i = 0; i < count; i++) {
        const angle = i / count * Math.PI * 2 + time * (strand ? -.035 : .025);
        const tilt = strand ? -.55 : .5;
        const x = Math.cos(angle) * (3.6 + strand * .7);
        const y = Math.sin(angle) * 2.5;
        const p = project(x * Math.cos(tilt) - y * Math.sin(tilt),x * Math.sin(tilt) + y * Math.cos(tilt),1.8 + Math.sin(angle) * .9 + energy * 2);
        const radius = Math.max(.8,Math.min(3.4,p.scale * .018));
        const pearl = ctx.createRadialGradient(p.x - radius * .3,p.y - radius * .4,0,p.x,p.y,radius);
        pearl.addColorStop(0,i === 9 && strand === 0 ? 'rgba(172,55,67,.65)' : 'rgba(245,235,210,.5)');
        pearl.addColorStop(.65,'rgba(182,165,131,.2)');pearl.addColorStop(1,'rgba(127,113,90,0)');
        ctx.fillStyle = pearl;ctx.beginPath();ctx.arc(p.x,p.y,radius,0,Math.PI * 2);ctx.fill();
      }
    }
  },
  mcqueen(ctx, env) {
    const { w, h, time, mouse, energy, compact } = env;
    for(let side = -1;side <= 1;side += 2) {
      const edge = side < 0 ? w * -.025 : w * 1.025;
      for(let rib = 0;rib < (compact ? 4 : 7);rib++) {
        const curve = (u) => ({
          x: edge - side * (Math.sin(u * Math.PI) * w * (.095 + rib * .017) + Math.sin(u * 5 + time * .2 + rib) * 8) + mouse.x * (rib + 2),
          y: h * (.09 + u * .88) + Math.cos(u * 3 + rib + time * .12) * 11,
        });
        const first = curve(0);
        ctx.strokeStyle = `rgba(173,169,183,${.15 - rib * .013})`;ctx.lineWidth = .7 + (rib === 0 ? .4 : 0);
        ctx.beginPath();ctx.moveTo(first.x,first.y);
        for(let s = 1;s <= 44;s++) { const p = curve(s / 44);ctx.lineTo(p.x,p.y); }
        ctx.stroke();
        for(let thorn = 1;thorn < 8;thorn++) {
          const p = curve(thorn / 9), q = curve(thorn / 9 + .026);
          ctx.fillStyle = `rgba(153,71,89,${.16 + energy * .1})`;
          ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x - side * (12 + rib * 2),p.y - 21 - Math.sin(time * .3 + rib) * 4);ctx.lineTo(q.x,q.y);ctx.closePath();ctx.fill();
        }
      }
    }
    for(let i = 0;i < 3;i++) {
      const x = w * (.2 + i * .3) + Math.sin(time * .15 + i * 2) * w * .1;
      const y = h * (.72 + Math.sin(time * .1 + i) * .1);
      const mist = ctx.createRadialGradient(x,y,0,x,y,Math.max(w,h) * .42);
      mist.addColorStop(0,i === 1 ? 'rgba(136,39,66,.1)' : 'rgba(133,144,161,.065)');mist.addColorStop(1,'rgba(24,20,30,0)');
      ctx.fillStyle = mist;ctx.fillRect(0,0,w,h);
    }
    for(let i = 0;i < (compact ? 25 : 60);i++) {
      const x = seeded(i + 55) * w + Math.sin(time * .25 + i) * 25 + mouse.x * 9;
      const y = ((seeded(i + 15) * h - time * (5 + i % 7) * (1 + energy)) % h + h) % h;
      ctx.fillStyle = i % 5 ? 'rgba(170,175,186,.2)' : 'rgba(163,61,79,.4)';
      ctx.fillRect(x,y,i % 3 ? 1 : 1.6,i % 3 ? 1 : 2.3);
    }
  },
};

function seeded(value) {
  const result = Math.sin(value * 127.1 + 43.7) * 43758.5453;
  return result - Math.floor(result);
}

function createBackground(canvas, getState) {
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return { update() {}, dispose() {} };
  const host = canvas.parentElement;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = { x: 0, y: 0 }, mouse = { x: 0, y: 0 };
  let w = 1, h = 1, ratio = 1, compact = false;
  let raf = 0, last = 0, time = 0, energy = 0, blend = 1;
  let current = getState().id, outgoing = null;
  let visible = true, disposed = false, dirty = true, lost = false;
  function schedule() {
    if (!raf && !disposed && !lost && visible && !document.hidden) raf = requestAnimationFrame(draw);
  }
  function draw(now) {
    raf = 0;
    if (disposed || lost) return;
    const state = getState();
    const stationary = motion.matches || state.paused || state.phase === 'loading';
    if (!dirty && last && now - last < (compact ? 1000 / 24 : 1000 / 30)) { schedule(); return; }
    const dt = Math.min((now - (last || now)) / 1000,.08);last = now;
    if (!stationary) time += dt;
    if (current !== state.id) { outgoing = current;current = state.id;blend = motion.matches ? 1 : 0; }
    if (motion.matches) { energy = 0;blend = 1;mouse.x = 0;mouse.y = 0; }
    else if (!state.paused) {
      blend = Math.min(1,blend + dt / .85);
      energy += ((state.phase === 'exit' ? 1 : 0) - energy) * (1 - Math.exp(-dt * 4));
      mouse.x += (pointer.x - mouse.x) * (1 - Math.exp(-dt * 2.5));
      mouse.y += (pointer.y - mouse.y) * (1 - Math.exp(-dt * 2.5));
    }
    ctx.setTransform(ratio,0,0,ratio,0,0);ctx.clearRect(0,0,w,h);
    const env = { w,h,time:motion.matches ? 0 : time,mouse,energy,compact,
      project(x,y,z) {
        const scale = Math.min(w * .7,h * .9) / (3 + z);
        return { x:w * .5 + (x + mouse.x * .1) * scale,y:h * .52 + (y + mouse.y * .08) * scale,scale };
      },
    };
    if(outgoing && blend < 1) {
      ctx.save();ctx.globalAlpha = (1 - blend) * .35;
      backgroundPainters[outgoing](ctx,env);ctx.restore();
    } else outgoing = null;
    ctx.save();ctx.globalAlpha = blend * (1 - energy * .45);
    backgroundPainters[current](ctx,env);ctx.restore();
    // Abre espaço visual no centro, preservando título, peças e legendas.
    const quiet = ctx.createRadialGradient(w * .5,h * .5,0,w * .5,h * .5,Math.max(w,h) * .55);
    quiet.addColorStop(0,'rgba(0,0,0,.7)');quiet.addColorStop(.55,'rgba(0,0,0,.3)');quiet.addColorStop(1,'rgba(0,0,0,0)');
    ctx.globalCompositeOperation = 'destination-out';ctx.fillStyle = quiet;ctx.fillRect(0,0,w,h);ctx.globalCompositeOperation = 'source-over';
    dirty = false;
    if (!stationary) schedule();
  }
  function resize() {
    w = Math.max(1,host.clientWidth);h = Math.max(1,host.clientHeight);compact = w <= 600;
    ratio = Math.min(devicePixelRatio || 1,compact ? 1 : 1.5);
    canvas.width = Math.round(w * ratio);canvas.height = Math.round(h * ratio);
    dirty = true;schedule();
  }
  function move(event) {
    if (event.pointerType === 'touch' || motion.matches) return;
    const rect = host.getBoundingClientRect();
    pointer.x = Math.max(-1,Math.min(1,(event.clientX - rect.left) / w * 2 - 1));
    pointer.y = Math.max(-1,Math.min(1,(event.clientY - rect.top) / h * 2 - 1));
  }
  function leave() { pointer.x = 0;pointer.y = 0; }
  function stop() { cancelAnimationFrame(raf);raf = 0;last = 0; }
  function visibility() { if (document.hidden) stop();else { dirty = true;schedule(); } }
  function preference() { leave();dirty = true;schedule(); }
  function contextLost(event) { event.preventDefault();lost = true;stop(); }
  function contextRestored() { lost = false;resize(); }
  const resizeObserver = new ResizeObserver(resize);resizeObserver.observe(host);
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting;if(visible){dirty = true;schedule();}else stop(); });observer.observe(canvas);
  host.addEventListener('pointermove',move);host.addEventListener('pointerleave',leave);
  document.addEventListener('visibilitychange',visibility);motion.addEventListener('change',preference);
  canvas.addEventListener('contextlost',contextLost);canvas.addEventListener('contextrestored',contextRestored);
  resize();
  return {
    update() { dirty = true;schedule(); },
    dispose() {
      disposed = true;stop();resizeObserver.disconnect();observer.disconnect();
      host.removeEventListener('pointermove',move);host.removeEventListener('pointerleave',leave);
      document.removeEventListener('visibilitychange',visibility);motion.removeEventListener('change',preference);
      canvas.removeEventListener('contextlost',contextLost);canvas.removeEventListener('contextrestored',contextRestored);
      canvas.width = 1;canvas.height = 1;
    },
  };
}

function BackgroundCanvas({ id, phase, paused }) {
  const canvas = useRef(null), engine = useRef(null);
  const state = useRef({ id,phase,paused });state.current = { id,phase,paused };
  useEffect(() => {
    engine.current = createBackground(canvas.current,() => state.current);
    return () => { engine.current?.dispose();engine.current = null; };
  }, []);
  useEffect(() => { engine.current?.update(); }, [id,phase,paused]);
  return h('canvas', { ref:canvas,className:'background-canvas','data-universe':id,'aria-hidden':true });
}

createRoot(document.getElementById('root')).render(h(App));




