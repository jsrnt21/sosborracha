const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
    event.preventDefault(); // bloqueia por padrão

    const empresa = document.getElementById("empresa").value.trim();
    const email = document.getElementById("email").value.trim();
    const confirmaEmail = document.getElementById("confirma-email").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmaSenha = document.getElementById("confirme-senha").value;
    const termosAceitos = document.getElementById("termos").checked;

    if (!empresa || !email || !confirmaEmail || !senha || !confirmaSenha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (email !== confirmaEmail) {
        alert("Os emails não coincidem.");
        return;
    }

    if (senha !== confirmaSenha) {
        alert("As senhas não coincidem.");
        return;
    }

    if (!termosAceitos) {
        alert("Você deve aceitar os termos de uso.");
        return;
    }

    // Exibe mensagem e envia o formulário de forma natural
    alert("Conta criada com sucesso!");
    form.submit(); // <--- Agora envia ao backend Flask normalmente
});
