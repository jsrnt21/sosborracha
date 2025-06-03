# Projeto S.O.S Borracha

## Descrição
Este projeto é uma aplicação web simples para gerenciamento de cadastro de usuários, login e controle de estoque de uma borracharia. Desenvolvido em Python usando Flask, com banco de dados SQL Server para persistência dos dados.

---

## Tecnologias Utilizadas
- Python 3.x
- Flask
- pyodbc (para conexão com SQL Server)
- SQL Server Express
- HTML, CSS, JavaScript (frontend)

---

## Estrutura do Projeto

- `app.py` — arquivo principal com a aplicação Flask.
- `templates/` — pasta com os arquivos HTML:
  - `criarconta.html` — página de cadastro.
  - `loginEntrar.html` — página de login.
  - `cadastrarPerfil.html` — página para cadastrar perfil (cliente).
  - `adicionarItem.html` — página para adicionar itens ao estoque.
- `static/` — pasta com arquivos estáticos (CSS, JS, imagens).
- `requirements.txt` — dependências Python.

## Por que os arquivos CSS, JS e imagens ficam na pasta static?

O Flask serve arquivos estáticos (como CSS, JavaScript, imagens, fontes, etc) a partir da pasta static por padrão.

Esses arquivos não são processados pelo Flask, são enviados direto para o navegador do usuário.

Ter uma pasta dedicada para esses arquivos facilita a organização, melhora a performance (pois são carregados diretamente) e permite o cache dos arquivos estáticos.

Exemplos:

-arquivos CSS para o estilo das páginas
-arquivos JS para scripts que rodam no navegador
-imagens usadas na interface

## Por que os arquivos HTML ficam na pasta templates?
Os arquivos HTML geralmente precisam ser renderizados pelo Flask para integrar dados dinâmicos do backend (Python) na página.

O Flask procura os arquivos de template HTML na pasta templates por padrão.

Esses arquivos são processados pelo mecanismo de template do Flask (Jinja2) para inserir variáveis, criar páginas dinâmicas, usar condicionais, laços, etc.

Exemplo:

- páginas que mostram dados do banco, mensagens, ou formulários que enviam dados para o backend


## Como configurar e rodar o projeto

### 1. Configurar o banco de dados SQL Server

- Crie um banco de dados chamado `sosborracha2`.
- Crie as tabelas necessárias (no arquivo codigobd.txt)

2. Instalar dependências Python
Crie e ative um ambiente virtual (opcional):
- python -m venv venv
- venv\Scripts\activate

Instale as dependências:
- pip install -r requirements.txt

3. Configurar a conexão com o banco de dados
No arquivo app.py, ajuste a string de conexão conn_str para o seu servidor SQL Server. Exemplo:

conn_str = (
    'DRIVER={ODBC Driver 17 for SQL Server};'
    'SERVER=localhost\\SQLEXPRESS;'
    'DATABASE=sosborracha2;'
    'Trusted_Connection=yes;'
)

4. Rodar a aplicação
- python app.py
Acesse no navegador: http://127.0.0.1:5000/criarconta para cadastro.

Acesse http://127.0.0.1:5000/criarconta para criarconta.

Acesse http://127.0.0.1:5000/login para fazer o login.

Acesse http://127.0.0.1:5000/adicionaritem para adicionar item
