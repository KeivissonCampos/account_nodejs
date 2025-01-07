# Gerenciador de Contas Bancárias - CLI

Este projeto é um sistema de gerenciamento de contas bancárias para interface de linha de comando (CLI), utilizando Node.js. Ele permite que o usuário crie contas, consulte saldo, realize depósitos, saques e mais.

---

## **Funcionalidades**
- **Criar conta**: Cria um arquivo JSON para armazenar informações da conta e saldo inicial.
- **Consultar saldo**: Exibe o saldo atual da conta.
- **Depositar**: Adiciona um valor ao saldo da conta.
- **Sacar**: Subtrai um valor do saldo da conta, se houver saldo suficiente.
- **Sair**: Finaliza a execução do programa.

---

## **Pré-requisitos**
- Node.js instalado na máquina.
- Bibliotecas necessárias:
  - `inquirer`: Para criar prompts interativos no terminal.
  - `chalk`: Para estilizar mensagens no console.
  - `fs`: Para manipulação de arquivos.

---

## **Instalação**
1. Clone este repositório:
2. Instale as dependências

   ```bash
   npm install inquirer chalk


## **Estrutura do Código**
- operation(): Gerencia o menu principal e navega entre as opções.
- createAccount(): Cria uma nova conta e salva as informações em um arquivo JSON.
- getAccountBalance(): Exibe o saldo de uma conta específica.
- deposit(): Adiciona um valor ao saldo da conta.
- withdraw(): Retira um valor do saldo, verificando se há saldo suficiente.
- checkAccount(): Verifica se uma conta existe.
- clearTerminal(): Limpa o terminal.
- getAccount(): Lê e retorna os dados de uma conta.
- addAmount() e removeAmount(): Atualizam o saldo da conta.

## **Exemplo de Uso**

   ```bash
    O que você deseja fazer?
    > Criar conta
    Consultar saldo
    Depositar
    Sacar
    Sair

    # Após criar uma conta:
    Digite um nome para a sua conta:
    > MinhaConta

    # Mensagem de sucesso:
    Parabéns, a conta MinhaConta foi criada!