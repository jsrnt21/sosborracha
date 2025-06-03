document.addEventListener('DOMContentLoaded', () => {
  const btnAdicionar = document.querySelector('.botao-adicionar');
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

  btnAdicionar.addEventListener('click', (e) => {
    e.preventDefault();

    const nome = inputNome.value.trim();
    const quantidade = parseInt(inputQuantidade.value);
    const preco = parseFloat(inputPreco.value.replace(',', '.'));
    const secao = selectSecao.value;

    if (!nome || isNaN(quantidade) || quantidade <= 0 || isNaN(preco) || preco <= 0 || secao === 'Seção') {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    const precoTotal = quantidade * preco;

    if (linhaEditando) {
        linhaEditando.cells[0].textContent = nome;
        linhaEditando.cells[1].textContent = quantidade;
        linhaEditando.cells[2].textContent = `R$${parseFloat(preco).toFixed(2).replace('.', ',')}`;
        linhaEditando.cells[3].textContent = `R$${precoTotal}`;
        linhaEditando.cells[4].textContent = secao;

        linhaEditando = null;
    } else{
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
        btnAdicionar.textContent = 'Adicionar';

        tabelaCorpo.appendChild(tr);
    }
    

    inputNome.value = '';
    inputQuantidade.value = '';
    inputPreco.value = '';
    selectSecao.value = 'Seção';
  });

  inputPesquisar.addEventListener('input', () => {
    const filtro = inputPesquisar.value.toLowerCase();

    const linhas = tabelaCorpo.querySelectorAll('tr');

    linhas.forEach((linha) => {
      const nomeProduto = linha.cells[0].textContent.toLowerCase();
      if (nomeProduto.includes(filtro)) {
        linha.style.display = '';
      } else {
        linha.style.display = 'none';
      }
    });
  });

  tabelaCorpo.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-excluir')) {
      if (confirm('Tem certeza que deseja excluir este produto?')) {
        const linha = e.target.closest('tr');
        linha.remove();
      }
    }

    if (e.target.classList.contains('btn-editar')) {
        const linha = e.target.closest('tr');
        linhaEditando = linha;

    
        inputNome.value = linha.cells[0].textContent;
        inputQuantidade.value = linha.cells[1].textContent;
        inputPreco.value = linha.cells[2].textContent.replace('R$', '').trim().replace(',', '.');
        selectSecao.value = linha.cells[4].textContent;

        btnAdicionar.textContent = 'Salvar edição';
    }
  });
});