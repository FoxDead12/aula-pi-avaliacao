Na realização deste projeto utilizei as seguintes tecnologias:
	.Node JS
	.Nest JS (FrameWork de Node JS, Back END)
	.TypeOrm (Tecnologia para trabalhar com base de dados)
	.MySql (Base de Dados)
	
Para CORRER ESTE PROJETO necessita de:
	
	1º Passo:
		No <<DIRETORIO>> do projeto escrever o seguinte comando no terminal "npm install", para instalar todas as 	dependencias necessaria do projeto.

	2º Passo:
		Criar uma base de dados com o nome "pi-avaliacao" e para mudar o utilizador da base de dadosdo projeto tem de aceder ao ficheiro "typeorm.config.ts" no diretorio do projeto e trocar todos os campos necessarios para adicionar os dados do seu servidor MYSQL.
		
	3º Passo:
		No <<DIRETORIO>> do projeto escrever o seguinte comando no terminal "npm run migration:run", para criar todas as tabelas na sua base de dados "pi-avaliacao".
	
	4º Passo:
		No <<DIRETORIO>> do projeto escrever o seguinte comando no terminal "npm run start" ou "npm run start:dev", para comecar a correr o programa.
	
	5ºPasso:
		Realizar um pedido "HTTP" do metodo "POST" para o seguind URL "localhost:3000/horarios", para executar o codigo criado.
	
	6º Passo:
		Se tudo correu bem, vai ter os dados na base de dados 😁.
		
	7º Passo (ERRO): 
		Caso algo de errado, envime mensagem. Estou pronto para ajudar 😁.
