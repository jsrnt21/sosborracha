document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const inputNome = document.querySelector('#input-nome');
  const inputQuantidade = document.querySelector('#input-quantidade');
  const inputPreco = document.querySelector('#input-preco');
  const selectSecao = document.querySelector('.formulario select');
  const tabelaCorpo = document.querySelector('tbody');
  const inputPesquisar = document.querySelector('.input-pesquisar');
  let linhaEditando = null;

  function formatarPreco(valor) {
    return 'R$' + Number(valor).toFixed(2).replace('.', ',');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = inputNome.value.trim();
    const quantidade = parseInt(inputQuantidade.value);
    const preco = parseFloat(inputPreco.value.replace(',', '.'));
    const secao = selectSecao.value;

    if (!nome || isNaN(quantidade) || quantidade <= 0 || isNaN(preco) || preco <= 0 || secao === 'Seção') {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    // Enviar para o backend via fetch POST
    fetch('/adicionaritem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, quantidade, preco_unitario: preco, secao })
    })
    .then(response => {
      if (!response.ok) throw new Error('Erro ao adicionar item no servidor');
      return response.json();
    })
    .then(data => {
      // Atualizar tabela na página
      const precoTotal = quantidade * preco;

      if (linhaEditando) {
        linhaEditando.cells[0].textContent = nome;
        linhaEditando.cells[1].textContent = quantidade;
        linhaEditando.cells[2].textContent = formatarPreco(preco);
        linhaEditando.cells[3].textContent = formatarPreco(precoTotal);
        linhaEditando.cells[4].textContent = secao;

        linhaEditando = null;
      } else {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${nome}</td>
          <td>${quantidade}</td>
          <td>${formatarPreco(preco)}</td>
          <td>${formatarPreco(precoTotal)}</td>
          <td>${secao}</td>
          <td>
            <img src="../../img/icones/icon-botao-editar.png" alt="Editar" class="btn-editar" style="cursor:pointer" />
            <img src="../../img/icones/icon-lixeira-de-reciclagem.png" alt="Excluir" class="btn-excluir" style="cursor:pointer" />
          </td>
        `;
        tabelaCorpo.appendChild(tr);
      }

      inputNome.value = '';
      inputQuantidade.value = '';
      inputPreco.value = '';
      selectSecao.value = 'Seção';
    })
    .catch(err => {
      alert(err.message);
    });
  });

  // resto do seu código de busca, editar, excluir permanece igual
  // ...
});
