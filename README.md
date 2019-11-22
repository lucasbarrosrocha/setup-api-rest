<h1 id="quick-start">1. Introdução</h1>
<p>Setup de uma API REST, configurada com o SAGBD mySql, em node.js.</p>

<h1 id="install">2. Instalar</h1>
<p>Para iniciar o projeto, é necessário instalar todas as aplicações e dependências a seguir.</p>

<h2>NodeJS</h2>
<p>Primeiramente é preciso que você tenha o Node e NPM instalados no seu computador, para isso siga os passos indicados abaixo, de acordo com o seu sistema operacional.<p>
<p>
    <i>Ubuntu</i> - <a href="https://github.com/nodesource/distributions/blob/master/README.md">https://github.com/nodesource/distributions/blob/master/README.md</a>
</p>
<p>
    <i>MacOS</i> - Executar no terminal: <code>brew install node</code>
</p>
<p>
    <i>Windows</i> - <a href="https://nodejs.org/en/download">https://nodejs.org/en/download</a>
</p>
<p>
    Ao final da instalação, cheque que você tem a versão correta (node: <i>10.16.0 ou acima</i> e npm: <i>6.9.0 ou acima</i>) rodando, no terminal, os comandos <code>node --version</code> e <code>npm --version</code>.
</p>

<h2>MySQL</h2>
<p>O projeto utiliza, como base de dados, o banco relaciona <i>MySQL</i>. Portanto, é necessário instalar também o servidor do MySQL e um editor de SQL.<p>
<p>
    <i>Ubuntu</i> - <a href="https://support.rackspace.com/how-to/installing-mysql-server-on-ubuntu">https://support.rackspace.com/how-to/installing-mysql-server-on-ubuntu</a>
</p>
<p>
    <i>MacOS</i> - Executar no terminal: <code>brew install mysql</code>
</p>
<p>
    <i>Windows</i> - <a href="https://dev.mysql.com/downloads/installer">https://dev.mysql.com/downloads/installer</a>
</p>
    <i>Observação</i> -  É recomendado que você não escolha a senha para o seu usuário root, pois nossos arquivos de configuração estão setados dessa forma. Caso contrário você deve mudar o nó "development" do arquivo database.js na pasta "config". Se optar por isso, lembre-se de <b>nunca commitar este arquivo</b>.
</p>

<h2>Sequelize CLI</h2>
<p>O Sequelize é um ORM para NodeJS, que tem suporte aos bancos de dados PostgreSQL, MariaDB, MySQL, SQLite e MSSQL, como ORM ele faz o mapeamento de dados relacionais (tabelas, colunas e linhas) para objetos Javascript.<p>

<p>
    <i>Ubuntu</i> - Executar no terminal: <code>sudo npm install -g sequelize-cli</code>
</p>
<p>
    <i>MacOS</i> - Executar no terminal: <code>npm install -g sequelize-cli</code>
</p>
<p>
    <i>Windows</i> - Executar no terminal: <code>npm install -g sequelize-cli</code>
</p>

<h1 id="running">3. Rodar</h1>
<p>Agora que todas as dependências foram instaladas e devidamente configuradas, o seu projeto deve estar a apenas um passo para ser rodado.</p>

<p>Como último passo, é necessário executar as <i>migrations</i> e <i>seeders</i>: </p>
<pre>
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
</pre>

<p>Pronto! Agora basta executar as seguintes linhas de comando no seu terminal:</p>
<pre>
npm run migrate
npm start
</pre>

<p>Feito isso, o projeto irá rodar na prota <code>3000</code> ou <code>3001</code> (caso já exista algo sendo executado na porta 3000).</p>

<p><i>Observação</i>: É necessário criar o hábito de verificar se existem novos seeders e/ou migrations, e executar o comando <code>npm run migrate</code>, pois constantemente são feitas modificações nesses dois quesitos. Caso seu banco de dados não esteja atualizado, poderá quebrar seu código.</p>

<h1 id="contributing">4. Contribuir</h1>
<p>Para realizar alterações nos modelos do código, é necessário não apenas criar o modelo, mas também criar <code>migrations</code> para cada modelo criado ou modificado e <code>seeders</code> caso queira alimentar o banco com valores pré definidos.</p>

<h2>Migration</h2>
<p>Neste momento, já existem migrations criadas no código. Caso não tenha muita experiência, é possível se basear nas migrations já criadas anteriormente, pois elas obedecem um certo padrão. Para saber mais sobre migrations, visite a documentação oficial do sequelize: <a href="https://sequelize.org/master/manual/migrations.html">https://sequelize.org/master/manual/migrations.html</a></p>

<p>Para iniciar uma migration, rode no terminal: <code>sequelize migration:generate --name { nome-da-migration }</code></p>

<p>
    <i>Observação</i> - A propriedade <code>nome-da-migration</code> pode ser qualquer frase ou nome, porém lembre-se de que o nome da migration deve ser facilmente reconhecivel e relacionada a modificação.
</p>

<p>Ao criar uma migration, ela irá aparecer no diretório de migrations do banco de dados. Veja o exemplo de esqueleto de um migration: </p>

<pre>
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
</pre>

<p>No <code>up</code> você deve escrever o que foi criado/mudado nessa versão do código. Por exemplo: 
uma criação de tabela, uma adição de coluna.</p>

<p>No <code>down</code> você deve escrever o que deve ser feito para voltar a versão anterior. Por exemplo: Se foi criada uma
tabela no <code>up</code>, no <code>down</code> você deve dropar essa tabela.</p>

<p>
    <i>Observação</i> - Você nunca deve alterar migrations que já estão em produção, pois as migrations só são executadas uma vez, e são salvas no registro de migrations do banco de dados. Não é recomendado apagar este registro para reexecutar uma migration.
</p>

<h2>Seeder</h2>
<p>Os seeders, como o nome já sugere, são <code>semeadores</code> de dados no banco. O que isto quer dizer? Em outras palavras, é possível abastecer o banco de dados com valores inicias sem que seja necessário inserir dados manuais no banco. Os dados serão inseridos assim que o código for executado.</p>

<p>Para criar um seed, é bem semelhante a criar uma migration, basta rodar no terminal: <code>npx sequelize-cli seed:generate --name { nome-do-seeder }</code>

<p>
    <i>Observação</i> - A propriedade <code>nome-do-seeder</code> pode ser qualquer frase ou nome, porém lembre-se de que o nome do seeder deve ser facilmente reconhecivel e relacionada a modificação.
</p>

<p>Ao criar uma seeder, ela irá aparecer no diretório de seeders do banco de dados. Veja o exemplo de esqueleto de um seeder: </p>

<pre>
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        firstName: 'John',
        lastName: 'Doe',
        email: 'demo@demo.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
</pre>

<p>O seeder sempre será parecido com um model definido, pois você está criando instruções para que o código alimente determinada tabela com as instruções pre definidas. No exemplo acima, está alimentando a tabela <code>User</code> com o usuário <code>John Doe</code>, de email <code>demo@demo.com</code>.</p>