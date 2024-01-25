# Desafio01-Rocketseat
<h1>Desafio: API de Tasks</h1>

<p>Neste desafio, você será responsável por desenvolver uma API para gerenciar suas tasks (tarefas). A API deve oferecer funcionalidades de CRUD (Create, Read, Update, Delete) para manipular as tasks, além de permitir a importação em massa por meio de um arquivo CSV.</p>

<h2>Estrutura da Task</h2>

<p>Cada task deve possuir as seguintes propriedades:</p>

<ul>
  <li><strong>id:</strong> Identificador único da task.</li>
  <li><strong>title:</strong> Título da task.</li>
  <li><strong>description:</strong> Descrição detalhada da task.</li>
  <li><strong>completed_at:</strong> Data de conclusão da task. O valor inicial deve ser null.</li>
  <li><strong>created_at:</strong> Data de criação da task.</li>
  <li><strong>updated_at:</strong> Data da última atualização da task.</li>
</ul>

<h2>Rotas e Regras de Negócio</h2>

<p>A API deve oferecer as seguintes rotas e funcionalidades:</p>

<ul>
  <li><strong>POST - /tasks:</strong> Criação de uma nova task.</li>
  <li><strong>GET - /tasks:</strong> Listagem de todas as tasks.</li>
  <li><strong>PUT - /tasks/:id:</strong> Atualização de uma task pelo seu id.</li>
  <li><strong>DELETE - /tasks/:id:</strong> Remoção de uma task pelo seu id.</li>
  <li><strong>PATCH - /tasks/:id/complete:</strong> Marcação de uma task como completa pelo seu id.</li>
  <li><strong>Importação de Tasks em Massa:</strong> A API deve suportar a importação de tasks a partir de um arquivo CSV.</li>
</ul>

<h2>Como Executar a API</h2>

<ol>
  <li>Execute a aplicação: <code>npm run dev</code> ou <code>yarn dev</code>.</li>
</ol>