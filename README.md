# OSemp

# Sobre o projeto

A aplicação consiste em realizar cadastros de clientes e de Ordens de Serviço (OS).

Na aba de Clientes, é possível cadastrar informações detalhadas como rua, bairro, email, número e CEP. Após o cadastro, o sistema permite editar ou deletar essas informações conforme necessário.

Na aba de Cadastro de OS, é possível fornecer uma descrição do serviço, selecionar o cliente para o qual o serviço será realizado, informar o custo do serviço, definir o estado do serviço (em aberto, em andamento ou concluído) e adicionar observações. Esse fluxo permite uma gestão completa das ordens de serviço.

## Layout 
- Home 

![HOME](https://github.com/Elson-JR/osemp/assets/112088705/1a89e503-0196-424a-a269-5a786cdad883)

- Aba Cadastro de Ordem de Serviço(OS)

![OS](https://github.com/Elson-JR/osemp/assets/112088705/bae2ac31-9cc3-4de1-a392-e4d6e9cea0b4)

- Aba Cadastro de Clientes

![CLIENT](https://github.com/Elson-JR/osemp/assets/112088705/55e5ee52-f3a9-47b1-bc94-8764c544f72a)


# Tecnologias utilizadas
## Back end
- "Next API"
- "Tedious"

## Front end
- "Shadcn.iu"
- "Tailwind"

## Implantação em produção

- Banco de dados: SQL SERVER

# Como executar o API do projeto 

Terminal:  

    npm run dev 
    #ou 
    yarn dev 
    
# No Navegador da sua Maquina
Abra o http://localhost:3000 com seu navegador para ver o resultado.  

### Pré-requisitos: NODE v20.13.1

## Instrução de Criação de Tabelas no SQL Server 
      CREATE TABLE Client (
              id INT IDENTITY(1,1) PRIMARY KEY,
              name NVARCHAR(255) NOT NULL,
              road NVARCHAR(255) NOT NULL,
              number NVARCHAR(50) NOT NULL,
              neighborhood NVARCHAR(255) NOT NULL,
              cep NVARCHAR(20) NOT NULL,
              phone NVARCHAR(20) NOT NULL,
              email NVARCHAR(255) NOT NULL
          );
      GO
      
      CREATE TABLE WorkOrder (
              id INT IDENTITY(1,1) PRIMARY KEY,
              cliid INT,
              description VARCHAR(255),
              status VARCHAR(50),
              date DATETIME,
              cost DECIMAL(10, 2),
              observations TEXT,
              CONSTRAINT FK_WorkOrder_Client FOREIGN KEY (cliid) REFERENCES Client(id)
          );

## Como Clonar o Repositório Usando Git

Para clonar este repositório em seu computador, siga estas etapas:

- . Abra o terminal (ou prompt de comando) no seu computador.
- . Navegue até o diretório onde você deseja clonar o repositório usando o comando `cd` (por exemplo, `cd /caminho/do/diretorio`).
- . Execute o seguinte comando para clonar o repositório:

        git clone https://github.com/Elson-JR/osemp.git

# Autor

Elson Perira da Silva Junior
Matricula:01613599

