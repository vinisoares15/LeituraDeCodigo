
/**
 * Autor: Vinicius Soares de Figueiredo - Estagiário de TI - 2022 - Algar Telecom
 * 
 * ============================================== Funcionalidades: ===============================================
 * Este código tem como objetivo varrer/ler um diretório recursivamente e procurar um termo dentro
 * de todos os arquivos de texto (scripts, .txt, .js, .java, etc) presentes. Caso encontre o termo,
 * ele executa um comando shell (git blame) para encontrar a data de criação do arquivo, a linha em
 * que está presente, o autor e o pwd. O resultado é impresso no terminal.
 * 
 * ============================================== Pré-requisitos: =================================================
 * > NodeJS
 * > Login no Git
 * > O diretório deve estar versionado no Git (só assim poderá ser usado o comando git blame)
 * 
 * ============================================== Como rodar a aplicação: ======================================== 
 * O arquivo ReadFile.js deverá estar dentro do repositório que deseja fazer a busca.
 * Alterar os valores das variáveis termo, dataProcurada e filePath de acordo com o que deseja buscar.
 * Rodar o comando no terminal: node ReadFile.js
 * Após a execução, o resultado será impresso no terminal.
 */

const {
    exec
} = require('child_process');
var fs = require('fs');
var path = require('path');
const {
    stdout
} = require('process');
var readline = require('readline');

//Parâmetros de entrada: ano, termo e diretório
var termo = "ManagedResource" || "ManagedAttribute" || "ApplicationProperty" || "AtomicBoolean"; //Termo a ser procurado nas linhas do arquivo
var filePath = "/Users/"; //especificar o diretório que deseja varrer.
var dataProcurada = '2020'; // caso queira especificar a data, colocar no formato "yyyy-mm-dd"


//variavel global blame onde será armazenado o resultado do comando shell
var blame = [];
// A função readFileAndFind serve para encontrar o termo lendo o arquivo
function readFileAndFind(file, lineini, linefim) { 
    var content = fs.createReadStream(file);
    const line_counter = ((i = 0) => () => ++i)();
    const rl = readline.createInterface({
        input: content
    });
    rl.on("line", (line, lineno = line_counter()) => {
        //1...2...3...10...100...etc
        if (line.includes(termo)) {
            //comando shell para encontrar a data de criação do arquivo, a linha em que está presente, o autor e o pwd
            exec(
                `cd ${filePath} && git blame -L ${lineno},${lineno} ${file}`, (err, stdout, stderr) => {
                if (err) {
                    console.log(err);
                    return;
                }
                // the *entire* stdout and stderr (buffered)
                if (stdout.includes(dataProcurada)) { //filtro para encontrar a data especificada
                    console.log("\033[42;1;37m Data procurada: " + `${dataProcurada}` + "\u001b[0m "+ stdout + " \033[44;1;37m " + file + "\u001b[0m ");
                                  //essas notações de cores são para imprimir no terminal com cores diferentes  
                } else {
                    return
                }
            });
        } else {
            return "";
        }
    });
}

// Função que vai varrer o diretório e chamar a função readFileAndFind
var walk = function (dir, done) {
    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) return done(null, results);
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(readFileAndFind(file));
                    next();
                }
            });
        })();
    });
};

/**
 *  Execução da função walk
 */
walk(filePath, function (err, results) {
    if (err) throw err;
});



