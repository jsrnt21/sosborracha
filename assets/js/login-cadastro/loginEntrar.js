const form = document.querySelector(".form-login");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = form.querySelector('input[type="email"]').value.trim();
    const senha = document.getElementById("senha").value;

    if (!email || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (email === "teste@sos.com" && senha === "123456") {
        alert("Login realizado com sucesso!");
        form.reset();
    } else {
        alert("Email ou senha inválidos.");
    }
});