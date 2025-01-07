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