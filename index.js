//external modules
const inquirer = require("inquirer")
const chalk = require("chalk")

//internal modules
const fs = require("fs")

clearTerminal()
operation()

function operation(){
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: 
        [
            'Criar conta',
            'Consultar Saldo',
            'Depositar',
            'Sacar',
            'Sair',
        ]
    }
    ])
    .then((answer) => {
        const action = answer['action']
        clearTerminal()

        if(action === 'Criar conta'){
            createAccount()
        }else if(action === 'Criar conta'){

        }else if(action === 'Consultar saldo'){

        }else if(action === 'Depositar'){
            deposit()
        }else if(action === 'Sacar'){
        
        }else if(action === 'Sair'){
            console.log(chalk.bgBlue.black('Sessão finalizada, obrigado!'))
            process.exit()
        }else{
            console.log(chalk.bgRed(`Desculpe! A opção '${action}' ainda está sendo implementada`))
            operation()
        }
    })
    .catch((err) => console.log(err))
}

//create an account
function createAccount(){
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco'))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))

    buildAccount()
}

function buildAccount(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite um nome para a sua conta: ',
        }
    ])
    .then((answer)=>{
        const nameAccount = answer['accountName']
        console.info(nameAccount)

        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }
        if(fs.existsSync(`accounts/${nameAccount}.json`)){
            clearTerminal()
            console.log(chalk.bgYellow.black(`A conta com o nome ${chalk.bgRed(nameAccount)} já existe, escolha outro nome!`))
            buildAccount()
            return
        }

        fs.writeFileSync(`accounts/${nameAccount}.json`, '{"balance": 0}', function(err){
            console.log(err)
        })
        clearTerminal()
        console.log(chalk.green(`Parabéns, a conta ${nameAccount} foi criada!`))
        operation()
    })
    .catch((err)=>{console.log(err)})
};

//clear terminal
function clearTerminal(){
    console.clear()
}

//add an amount to user account
function deposit(){
    inquirer.prompt([
        {
            name: 'nameAccount',
            message: 'Qual o nome da sua conta?'
        }
    ])
    .then((answer)=>{
        const nameAccount = answer['nameAccount']

        if(!checkAccount(nameAccount)){
            return deposit()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quando você deseja depositar:'
            }
        ])
        .then((answer)=>{
            addAmount(nameAccount, answer['amount'])
        })
        .catch((err)=>{console.log(err)})

    })
    .catch((err)=>{console.log(err)})
}

function checkAccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        clearTerminal()
        console.log(chalk.bgYellow.black(`A conta com o nome ${chalk.bgRed(accountName)} está errada ou não existe, digite novamente!`))
        return false
    }
    return true
}

function addAmount(accountName, amount){
    const accountData = getAccount(accountName)

    if(!amount){
        clearTerminal()
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente!'))
        return deposit()
    }
    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), function(err){
        console.log(err)
    })

    clearTerminal()
    console.log(chalk.green(`Foi depositado o valor de R$${amount} na conta ${accountName}`))
    operation()
}

function getAccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`,{
        encoding: 'utf-8',
        flag: 'r'
    })

    return JSON.parse(accountJSON)
}