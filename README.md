# Encurtador de Links (Shortener Links)

Uma API RESTful de alta performance para encurtamento e gerenciamento de URLs. O projeto utiliza **NestJS** para uma arquitetura de backend escalável, **PostgreSQL** para persistência de dados e **autenticação JWT** para proteger os endpoints.

A aplicação é totalmente containerizada com **Docker** e **Docker Compose**, permitindo que qualquer desenvolvedor execute o projeto com um único comando.

---

## 📖 Índice

* [✨ Funcionalidades](#funcionalidades)
* [🛠️ Tecnologias Utilizadas](#️tecnologias-utilizadas)
* [🏁 Pré-requisitos](#pré-requisitos)
* [🚀 Começando (Setup Local)](#começando-setup-local)
* [🐳 Rodando o Projeto com Docker](#rodando-o-projeto-com-docker)
* [🧪 Testando a API (Swagger)](#testando-a-api-swagger)
* [📈 Pontos de Melhoria e Escalabilidade Futura](#pontos-de-melhoria-e-escalabilidade-futura)

---

## Funcionalidades

* **Autenticação e Autorização:** Sistema seguro usando JSON Web Tokens (JWT).
* **API RESTful:** Endpoints padronizados para [Listar os principais recursos, ex: Gerenciamento de Links de usuários, criações de usuários, etc.].
* **Containerização:** Configuração completa com `docker-compose` para os ambientes de desenvolvimento e produção.
* **Documentação de API:** Documentação interativa e automatizada com Swagger (OpenAPI).

---

## Tecnologias Utilizadas

* **Backend:** [NestJS](https://nestjs.com/)
* **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
* **Autenticação:** [JWT (JSON Web Tokens)](https://jwt.io/)
* **Containerização:** [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Documentação:** [Swagger (OpenAPI)](https://swagger.io/)

---

## Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:

* [Git](https://git-scm.com)
* [Docker](https://www.docker.com/get-started)
* [Docker Compose](https://docs.docker.com/compose/install/)

> **Nota sobre o Node.js / NestJS:**
> Você **não** precisa ter o Node.js, `npm` ou o NestJS CLI instalados localmente na sua máquina. O ambiente Docker (definido no `Dockerfile` e `docker-compose.yml`) é responsável por baixar a imagem correta do Node, instalar as dependências do NestJS e executar a aplicação dentro do container.

---

## Começando (Setup Local)

Siga os passos abaixo para configurar o projeto localmente.

### 1. Clone o Repositório

```bash
$ git clone https://github.com/StanleyBack-dev/shortener-links.git
```

#### Acesse a pasta do projeto
```bash
$ cd seu-repositorio
```

### 2. Configure as Variáveis de Ambiente

O projeto utiliza arquivos `.env` separados para gerenciar as variáveis de cada ambiente (ex: `.env.development`, `.env.production`). O Docker Compose é configurado para ler o arquivo apropriado e injetar essas variáveis nos containers.

Para o setup de desenvolvimento local, copie o arquivo de exemplo:

```bash
# Copia o arquivo de exemplo de desenvolvimento
$ cp .env.example.development .env.development
```

>(Opcional: Você pode fazer o mesmo para o arquivo de produção, se necessário, que será usado em um deploy futuro: `cp .env.example.production` `.env.production`)

```bash
# .env.development

NODE_ENV=development
PORT=4000 # Porta que a API irá rodar DENTRO do container

# === DATABASE CONFIG ===
# O DB_HOST DEVE ser o nome do serviço do banco no docker-compose.yml
DB_HOST=db
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=shortener
TYPEORM_SYNC=true # Sincroniza entidades com o banco (Use 'false' em produção)

# === SECURITY ===
# ❗ Importante: Para produção, altere estes valores para segredos únicos e fortes!
JWT_SECRET="Y!mGz7pK^3wqT9r@N4jLx&Z2hC*fbgr"
JWT_REFRESH_SECRET="wX!4$k9p@zB8^tU6#cR2nYqHjE*Lbbgrbr"
```

> **Nota Importante**: O **DB_HOST** deve ser o nome do serviço do PostgreSQL definido no seu arquivo docker-compose.yml (ex: `db_postgres`, `db`, `postgres`), e não `localhost`.

---

## Rodando o Projeto com Docker
Com o Docker e o Docker Compose instalados e o arquivo `.env.development` configurado, você pode iniciar toda a aplicação (API NestJS e Banco de Dados PostgreSQL) com um único comando:

### Sobe os containers
```bash
$ docker-compose up --build
```

### O Docker Compose irá:

- Baixar as imagens necessárias (PostgreSQL e Node).

- Construir o container da sua aplicação NestJS.

- Criar uma rede interna para os containers se comunicarem.

- Iniciar o container do banco de dados e o container da API.

- Executar migrações do banco de dados.

### Verificando os Logs

Para verificar se tudo subiu corretamente ou para depurar erros, você pode ver os logs:

```bash
# Ver logs de todos os serviços
$ docker-compose logs

# Ver logs em tempo real (follow)
$ docker-compose logs -f

# Ver logs de um serviço específico (ex: a api)
$ docker-compose logs -f api
```

### Parando a Aplicação

Para parar e remover os containers, redes e volumes criados:

```bash
$ docker-compose down
```

---

## Testando a API (Swagger)

Assim que os containers estiverem em execução, a API estará disponível e a documentação do Swagger poderá ser acessada no seu navegador.

> **Acesse:** http://localhost:4000/documentacao

> A porta 4000 é um exemplo, ajuste se você a mapeou de forma diferente no `docker-compose.yml`.

### No Swagger, você pode:

- Visualizar todos os endpoints disponíveis.

- Ver os schemas (DTOs) de requisição e resposta.

- Testar o endpoint de autenticação (auth) para obter um token JWT.

- Clicar no botão "Authorize" e colar seu token JWT para testar os endpoints protegidos.

---

## Pontos de Melhoria e Escalabilidade Futura

Este projeto foi construído como um monólito, o que é excelente para um technical challenge e para muitas aplicações de produção. No entanto, se o sistema precisar crescer para suportar uma carga massiva de usuários (escalar horizontalmente), a arquitetura precisará evoluir.

Abaixo estão os pontos de melhoria e os desafios associados a essa evolução.

### **1. Quebra para Microserviços:**
O primeiro passo para a escalabilidade horizontal é quebrar o monólito.

**O que fazer:** Dividir a aplicação NestJS atual em serviços menores e independentes (Microserviços). Por exemplo:

- Serviço de Autenticação (Auth): Responsável apenas por login, registro e validação de JWT.

- Serviço de Usuários (Users): Responsável pelo CRUD de usuários.

- Serviço de Encurtamentos: Responsável pelo encurtamentos e gerenciamento dos links.

**Benefício:** Cada serviço pode ser escalado independentemente. Se o "Serviço de Auth" estiver sobrecarregado, podemos rodar 10 instâncias dele sem precisar rodar 10 instâncias do "Serviço de Usuários".

### **2. Replicação de Servidores e Load Balancing (Aplicação):**

Uma vez que temos serviços menores (ou mesmo se quisermos escalar o monólito atual), não podemos depender de uma única instância da aplicação.

**O que fazer:**

- **Replicação de Servidores (Containers):** Em vez de rodar docker-compose up com 1 container da api, usamos uma ferramenta de orquestração (como Kubernetes ou Docker Swarm) para rodar múltiplas instâncias (Réplicas) do mesmo container.

- **Load Balancer:** Colocar um Load Balancer (como Nginx, HAProxy, ou um serviço de nuvem como AWS ALB/ELB) na frente dessas réplicas.

**Benefício:** O Load Balancer distribui o tráfego de entrada (requisições HTTP) entre as várias instâncias da aplicação. Isso proporciona Alta Disponibilidade (se um container falhar, os outros assumem) e Escalabilidade Horizontal (para mais tráfego, basta adicionar mais containers).

### **3. Replicação do Banco de Dados (Banco de Dados):**

O gargalo mais comum em aplicações escaláveis é o banco de dados.

**O que fazer:** Implementar Replicação de Banco de Dados (Database Replication) no PostgreSQL.

Modelo Primário-Réplica (`Master-Slave`):

- Temos um banco de dados Primário (`Master`) que lida com todas as operações de escrita (`INSERT`, `UPDATE`, `DELETE`).

- Temos um ou mais bancos de dados Réplica (`Slaves`) que recebem uma cópia dos dados do Master (via streaming replication) e lidam apenas com operações de leitura (`SELECT`).

**Na Aplicação:** A API NestJS precisaria ser configurada para direcionar escritas para o Master e leituras (que são geralmente 90% do tráfego) para as Réplicas.

**Benefício:** Reduz drasticamente a carga no banco de dados principal, melhorando a performance de leitura em todo o sistema.

### **4. Desafios na Escalabilidade Horizontal:**

Evoluir para essa arquitetura não é trivial e introduz novos desafios:

**Complexidade de Orquestração:** Gerenciar dezenas ou centenas de containers (microserviços) requer ferramentas robustas. Este é o domínio do Kubernetes (K8s), que automatiza a implantação, o escalonamento e a recuperação de falhas, mas tem uma curva de aprendizado íngreme.

**Comunicação Inter-serviços:** Como os microserviços se comunicam?

- **Síncrona (ex: HTTP/gRPC):** Um serviço chama o outro e espera a resposta. Cria acoplamento e pode causar falhas em cascata (se o Serviço B parar, o Serviço A que depende dele também para).

- **Assíncrona (ex: Filas/Mensageria - RabbitMQ, Kafka):** Um serviço publica um evento (ex: "UsuárioCriado") e outros serviços reagem a esse evento. É muito mais resiliente e escalável, mas aumenta a complexidade de rastreamento.

**Consistência de Dados (Sagas):** Em um monólito, usamos transações de banco de dados para garantir que múltiplas operações ocorram com sucesso (ou falhem juntas). Em microserviços, cada serviço tem seu próprio banco de dados. Não podemos ter uma transação que englobe dois bancos diferentes. O desafio é manter a consistência dos dados, geralmente usando padrões como **Saga** para orquestrar transações distribuídas.

**Monitoramento e Observabilidade:** Em um monólito, o log de erro está em um lugar. Em 10 microserviços, um erro pode atravessar 5 serviços diferentes. É crucial implementar rastreamento distribuído (Distributed Tracing, ex: Jaeger) e centralização de logs (ex: ELK Stack/Elasticsearch) para entender o que está acontecendo no sistema.