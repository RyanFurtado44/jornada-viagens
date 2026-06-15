// Pela minha vida, juro que tentei fazer aquele pop up ser simples, mas não deu 
const modal = document.getElementById("meuModal");
const modalTitulo = document.getElementById("modalTitulo");
const modalMensagem = document.getElementById("modalMensagem");
const btnFecharModal = document.getElementById("btnFecharModal");

let acaoAoclicarOk = null;

// Função para abrir o pop-up

function mostrarAviso(titulo, mensagem, acaoSucesso = null) {
  modalTitulo.innerText = titulo;
  modalMensagem.innerText = mensagem;
  acaoAoclicarOk = acaoSucesso;

  modal.style.setProperty("display", "flex", "important");
} //Fecha o pop-up ao clicar no botão
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
    }) // Abre o pop-up de sucesso caso tudo funcione corretamente (Tomara)
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
        } else // Se não mostra mensagem de erro ;-;
        {
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
        if (
          dados.sucesso
        ) //Abre o pop-up exibindo o nome recuperado do banco (sem nome estranho)
        {
          mostrarAviso(
            "Bem-vindo(a)!",
            `Olá, ${dados.nome}! Login efetuado com sucesso.`,
            function () {
              window.location.href = "index.html";
            },
          );
        } else //Se não exibe mensagem de erro
          {
          mostrarAviso("Erro", dados.mensagem);
        }
      })
      .catch(() =>
        mostrarAviso("Erro", "Não foi possível conectar ao servidor."),
      );
  });
}
