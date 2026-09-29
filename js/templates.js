// templates.js - monta o HTML de cada página (usa os dados de dados.js e storage.js)


// Recebe UM projeto e devolve o HTML do card dele.
function criarCardProjeto(projeto) {
  // começa vazio; só o projeto que tem "detalhes" recebe o botão e a janela
  let modal = "";

  if (projeto.detalhes) {
    modal = `<br>
      <input type="checkbox" id="modal-${projeto.id}" class="modal-toggle-input">
      <label for="modal-${projeto.id}" class="modal-trigger">Ver mais detalhes</label>
      <div class="modal-overlay">
        <div class="modal-box">
          <h3>${projeto.titulo}</h3>
          <p>${projeto.detalhes}</p>
          <label for="modal-${projeto.id}" class="modal-close">Fechar</label>
        </div>
      </div>`;
  }

  return `
    <article id="${projeto.id}">
      <h3>${projeto.titulo}</h3>
      <p>${projeto.descricao}</p>
      <span class="badge ${projeto.classeStatus}">${projeto.status}</span>
      ${modal}
    </article>`;
}

// Evita que texto digitado pelo usuário vire HTML (troca < por &lt;)
function limparTexto(texto) {
  return String(texto).replace(/</g, "&lt;");
}

// Monta o HTML da lista com os cadastros salvos
function criarListaCadastros() {
  const lista = lerCadastros(); // função do storage.js

  if (lista.length === 0) {
    return ""; // ainda não tem nada salvo
  }

  const itens = lista.map(function (cadastro) {
    return `<li>${limparTexto(cadastro.nome)} - ${limparTexto(cadastro.email)}
      (${limparTexto(cadastro.cidade)}/${limparTexto(cadastro.estado)})
      - enviado em ${cadastro.data}</li>`;
  }).join("");

  return `
    <section id="lista-cadastros">
      <h2>Cadastros enviados</h2>
      <ul>${itens}</ul>
      <button type="button" id="limpar-cadastros">Limpar lista</button>
    </section>`;
}

// Cada página tem: titulo, subtitulo e uma função html() que devolve o conteúdo
const TEMPLATES = {
  "/": {
    titulo: "Sobre a ONG",
    subtitulo: "Conheça nossa organização, nossa missão e nossos objetivos.",
    html: function () {
      return `
    <section class="section-primary">
      <h2>Quem somos</h2>
      <p>Nossa organização atua em iniciativas sociais e comunitárias, buscando incentivar a participação e a transformação social.</p>
      <picture>
        <source srcset="../imagens/ong.webp" type="image/webp">
        <img src="../imagens/ong.png" alt="Equipe da ONG reunida em uma atividade comunitária"
             width="1200" height="675" loading="lazy">
      </picture>
    </section>

    <section class="section-secondary">
      <h2>Contato</h2>
      <p>Entre em contato conosco para saber mais sobre nosso trabalho.</p>
      <address>
        E-mail: contato@ong.org<br>
        Telefone: (11) 0000-0000
      </address>
    </section>`;
    }
  },
  "/projetos": {
    titulo: "Projetos da ONG",
    subtitulo: "Conheça nossas iniciativas e descubra como participar.",
    html: function () {
      return `
    <section>
      <h2>Projetos sociais</h2>

      <div class="projetos-grid">
        ${PROJETOS.map(criarCardProjeto).join("")}
      </div>
    </section>

    <section>
      <h2>Como contribuir</h2>
      <p>Você pode conhecer nossos projetos, realizar uma doação ou cadastrar-se para participar como voluntário.</p>
      <p><a href="#/cadastro">Acessar formulário de cadastro</a></p>
    </section>`;
    }
  },
  "/cadastro": {
    titulo: "Cadastro",
    subtitulo: "Preencha seus dados para estabelecer contato com a ONG.",
    html: function () {
      return `
    <div class="alert alert-info">
      Preencha todos os campos abaixo. Os dados são usados só pra entrarmos em contato com você.
    </div>

    <div id="mensagem-form" aria-live="polite"></div>

    <form action="#" method="post" novalidate>
      <fieldset>
        <legend>Dados pessoais</legend>

        <div class="form-grid">
          <div class="field">
            <label for="nome">Nome completo:</label>
            <input type="text" id="nome" name="nome" required>
          </div>

          <div class="field field-half">
            <label for="email">E-mail:</label>
            <input type="email" id="email" name="email" required>
          </div>

          <div class="field field-half">
            <label for="nascimento">Data de nascimento:</label>
            <input type="date" id="nascimento" name="nascimento" required>
          </div>

          <div class="field">
            <label for="cpf">CPF:</label>
            <input type="text" id="cpf" name="cpf"
                   pattern="[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}"
                   placeholder="000.000.000-00" required>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Contato e endereço</legend>

        <div class="form-grid">
          <div class="field field-half">
            <label for="telefone">Telefone:</label>
            <input type="tel" id="telefone" name="telefone"
                   pattern="\\([0-9]{2}\\) [0-9]{5}-[0-9]{4}"
                   placeholder="(11) 99999-9999" required>
          </div>

          <div class="field field-half">
            <label for="cep">CEP:</label>
            <input type="text" id="cep" name="cep"
                   pattern="[0-9]{5}-[0-9]{3}"
                   placeholder="00000-000" required>
          </div>

          <div class="field field-half">
            <label for="endereco">Endereço:</label>
            <input type="text" id="endereco" name="endereco" required>
          </div>

          <div class="field field-half">
            <label for="cidade">Cidade:</label>
            <input type="text" id="cidade" name="cidade" required>
          </div>

          <div class="field field-half">
            <label for="estado">Estado:</label>
            <input type="text" id="estado" name="estado" maxlength="2" required>
          </div>
        </div>
      </fieldset>

      <div class="form-actions">
        <button type="submit">Enviar cadastro</button>
      </div>
    </form>

    ${criarListaCadastros()}`;
    }
  }
};
