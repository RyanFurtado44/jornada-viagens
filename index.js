const modal = document.getElementById("meuModal");
const modalTitulo = document.getElementById("modalTitulo");
const modalMensagem = document.getElementById("modalMensagem");
const btnFecharModal = document.getElementById("btnFecharModal");

let acaoAoclicarOk = null;

// Altere apenas a função mostrarAviso no seu index.js para ficar assim:
function mostrarAviso(titulo, mensagem, acaoSucesso = null) {
  modalTitulo.innerText = titulo;
  modalMensagem.innerText = mensagem;
  acaoAoclicarOk = acaoSucesso;

  // Força o display a virar flex sobrepondo o !important do CSS inicial
  modal.style.setProperty("display", "flex", "important");
}

// Garanta que o botão de fechar reverta para none !important:
btnFecharModal.addEventListener("click", function () {
  modal.style.setProperty("display", "none", "important");
  if (acaoAoclicarOk) {
    acaoAoclicarOk();
  }
});
// cadastro
const formCadastro = document.getElementById("formCadastro");
if (formCadastro) {
  formCadastro.addEventListener("submit", function (event) {
    event.preventDefault();
    const dadosFormulario = new FormData(this);

    fetch("register.php", {
      method: "POST",
      body: dadosFormulario,
    })
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (dados.sucesso) {
          mostrarAviso(
            "Sucesso!",
            "Cadastro efetuado com sucesso!",
            function () {
              formCadastro.reset();
              window.location.href = "index.html";
            },
          );
        } else {
          mostrarAviso("Erro", dados.mensagem);
        }
      })
      .catch(() =>
        mostrarAviso("Erro", "Não foi possível conectar ao servidor."),
      );
  });
}
//login
const formLogin = document.getElementById("meuFormulario");
if (formLogin) {
  formLogin.addEventListener("submit", function (event) {
    event.preventDefault();
    const dadosFormulario = new FormData(this);

    fetch("login.php", {
      method: "POST",
      body: dadosFormulario,
    })
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (dados.sucesso) {
          mostrarAviso(
            "Bem-vindo(a)!",
            `Olá, ${dados.nome}! Login efetuado com sucesso.`,
            function () {
              window.location.href = "index.html";
            },
          );
        } else {
          mostrarAviso("Erro", dados.mensagem);
        }
      })
      .catch(() =>
        mostrarAviso("Erro", "Não foi possível conectar ao servidor."),
      );
  });
}
