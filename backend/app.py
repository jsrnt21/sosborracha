from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
import pyodbc

app = Flask(__name__)
app.secret_key = 'sua-chave-secreta-aqui'  # obrigatório para flash funcionar

# Configuração da conexão com o SQL Server
conn_str = (
    'DRIVER={ODBC Driver 17 for SQL Server};'
    'SERVER=localhost\\SQLEXPRESS;'
    'DATABASE=sosborracha2;'
    'Trusted_Connection=yes;'
)

@app.route('/cadastro', methods=['GET', 'POST'])
def cadastro():
    if request.method == 'POST':
        nome = request.form.get('nome')
        celular = request.form.get('celular')
        cnpj = request.form.get('cnpj')
        cep = request.form.get('cep')
        bairro = request.form.get('bairro')
        rua_num = request.form.get('rua_num')
        complemento = request.form.get('complemento')

        try:
            conn = pyodbc.connect(conn_str)
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO Cliente (nome, celular, cnpj, cep, bairro, rua_num, complemento)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (nome, celular, cnpj, cep, bairro, rua_num, complemento))
            conn.commit()
            cursor.close()
            conn.close()
        except Exception as e:
            return f"Erro ao salvar no banco: {e}"

        return redirect(url_for('sucesso'))

    return render_template('cadastrarPerfil.html')


@app.route('/criarconta', methods=['GET', 'POST'])
def criarconta():
    if request.method == 'POST':
        empresa = request.form.get('empresa')
        email = request.form.get('email')
        confirma_email = request.form.get('confirma-email')
        senha = request.form.get('senha')
        confirma_senha = request.form.get('confirme-senha')
        termos = request.form.get('termos')

        # Validações simples
        if not empresa or not email or not senha:
            flash('Preencha todos os campos obrigatórios.')
            return redirect(url_for('criarconta'))

        if email != confirma_email:
            flash('Os emails não conferem.')
            return redirect(url_for('criarconta'))

        if senha != confirma_senha:
            flash('As senhas não conferem.')
            return redirect(url_for('criarconta'))

        if not termos:
            flash('Você precisa aceitar os termos de uso.')
            return redirect(url_for('criarconta'))

        try:
            conn = pyodbc.connect(conn_str)
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO Usuarios (empresa, email, senha)
                VALUES (?, ?, ?)
            """, (empresa, email, senha))
            conn.commit()
            cursor.close()
            conn.close()
            return redirect(url_for('sucesso'))
        except Exception as e:
            flash(f'Erro ao salvar no banco: {e}')
            return redirect(url_for('criarconta'))

    return render_template('criarconta.html')


@app.route('/sucesso')
def sucesso():
    return "Cadastro realizado com sucesso!"


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        senha = request.form.get('senha')

        try:
            conn = pyodbc.connect(conn_str)
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM Usuarios WHERE email = ? AND senha = ?", (email, senha))
            usuario = cursor.fetchone()
            cursor.close()
            conn.close()

            if usuario:
                return redirect(url_for('sucesso'))  # ou redirecione para a página inicial/logado
            else:
                return "Credenciais inválidas", 401
        except Exception as e:
            return f"Erro ao conectar ao banco: {e}"

    return render_template('loginEntrar.html')

@app.route('/adicionaritem', methods=['GET', 'POST'])
def adicionaritem():
    if request.method == 'POST':
        dados = request.get_json()
        nome = dados.get('nome')
        quantidade = dados.get('quantidade')
        preco_unitario = dados.get('preco_unitario')
        secao = dados.get('secao')

        if not nome or not quantidade or not preco_unitario or not secao:
            return jsonify({'error': 'Campos obrigatórios faltando'}), 400

        try:
            quantidade = int(quantidade)
            preco_unitario = float(preco_unitario)
        except ValueError:
            return jsonify({'error': 'Quantidade e preço inválidos'}), 400

        try:
            conn = pyodbc.connect(conn_str)
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO Estoque (nome, quantidade, preco_unitario, secao)
                VALUES (?, ?, ?, ?)
            """, (nome, quantidade, preco_unitario, secao))
            conn.commit()
            cursor.close()
            conn.close()
            return jsonify({'message': 'Item adicionado com sucesso'})
        except Exception as e:
            return jsonify({'error': f'Erro no banco: {e}'}), 500

    # GET apenas renderiza a página
    return render_template('adicionarItem.html')



if __name__ == '__main__':
    app.run(debug=True)
