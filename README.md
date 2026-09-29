# Site da ONG

Site feito para uma ONG, como atividade da faculdade (disciplina de Desenvolvimento front-end). É uma SPA (Single Page Application): o site troca de página sem recarregar.

## Tecnologias usadas

- HTML5
- CSS3
- JavaScript puro (sem framework)
- [IMask](https://imask.js.org/) — biblioteca para as máscaras de CPF, telefone e CEP
- localStorage do navegador, para guardar os cadastros

## Como abrir o projeto

1. Baixe ou clone este repositório.
2. Abra a pasta `html` e clique duas vezes no arquivo `index.html`.
3. O site abre direto no navegador. Não precisa instalar nada.

Para as máscaras dos campos funcionarem, é preciso estar conectado à internet, porque a biblioteca IMask é carregada de um CDN.

## Estrutura de pastas

```
projeto_ong_final/
├── html/
│   └── index.html      -> página única do site (SPA)
├── css/
│   └── styles.css      -> todo o estilo visual
├── imagens/
│   └── ong.png
└── js/
    ├── dados.js         -> lista dos projetos da ONG
    ├── storage.js       -> salva e lê os cadastros no localStorage
    ├── validacao.js     -> confere os campos do formulário
    ├── mascaras.js      -> liga a biblioteca IMask nos campos
    ├── templates.js     -> monta o HTML de cada página
    ├── router.js        -> troca de página pelo hash do endereço
    └── main.js          -> liga os eventos (clique, digitação, envio)
```

## Páginas do site

- **Início**: apresentação da ONG.
- **Projetos**: lista de projetos (voluntariado, doações, ações comunitárias), gerada a partir de uma lista de dados.
- **Cadastro**: formulário com verificação dos campos e lista dos cadastros já enviados.

## Sobre o versionamento (Git)

O projeto usa o modelo GitFlow:
- `main`: versão pronta do site.
- `develop`: onde as partes iam sendo juntadas.
- `feature/...`: um branch para cada parte nova (estrutura de pastas, SPA, formulário).

## Autor

Projeto feito por um estudante da faculdade, como atividade da disciplina de Desenvolvimento front-end.
