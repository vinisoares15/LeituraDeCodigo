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
var termo = "ManagedResource" || "ManagedAttribute" || "ApplicationProperty";
var filePath = "/Users/viniciussoares/Desktop/Algar_Telecom/LeituraDoCodigo/";
var dataProcurada = '2022'; // caso queira especificar a data, colocar no formato "yyyy-mm-dd"

var filePath1 = "/Users/viniciussoares/Desktop/Algar_Telecom/algarcrm/algarcrm/source/modules/sales/src/main/java/br/com/algartelecom/algarcrm/sales/service/impl/"

//variavel global blame onde será armazenado o resultado do comando shell
var blame = [];
// Para encontrar o termo lendo o arquivo
function readFileAndFind(file, lineini, linefim) {
    var content = fs.createReadStream(file);
    const line_counter = ((i = 0) => () => ++i)();
    const rl = readline.createInterface({
        input: content
    });
    rl.on("line", (line, lineno = line_counter()) => {
        //1...2...3...10...100...etc
        if (line.includes(termo)) {
            //criar uma função assincrona para executar o comando shell
            exec(`git blame ${file} -L ${lineno},${lineno}`, (err, stdout, stderr) => {
                if (err) {
                    // node couldn't execute the command
                    return;
                }
                // the *entire* stdout and stderr (buffered)
                //blame.push(stdout + " " + file);
                if (stdout.includes(dataProcurada)) {
                    console.log(stdout + " " + file);
                } else {
                    console.log(`Termo encontrado, porém, data diferente de ${dataProcurada}`);
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
 * Testando a função com data local e sem filtro (working)
 */
walk(filePath, function (err, results) {
    if (err) throw err;
    //console.log(results);
});

/**
 * Testando a função com data local e sem filtro (working)
 */
//  walk("/Users/viniciussoares/Desktop/Algar_Telecom/algarcrm/algarcrm/source/modules/phone/", function (err, results) {
//     if (err) throw err;
//     //console.log(results);
// });


/**
 * Testando a função com data local e com filtro (working)
 */

// walk("/Users/viniciussoares/Desktop/Algar_Telecom/LeituraDoCodigo/", function (err, results) {
//     if (err) throw err;
//  //mostrar apenas termos não nulos e não vazios
//     var filtered = results.filter(function (item) {
//     return item !== "";
//     }).join("\n");
//     console.log(filtered);
//     //console.log(results);
// });


/**
 * Testando a função com data do algarcrm e com filtro (working)
 *
 */

// walk("/Users/viniciussoares/Desktop/Algar_Telecom/algarcrm/algarcrm/source/modules/phone/", function (err, results) {
//     if (err) throw err;
//     //mostrar apenas termos não nulos e não vazios
//     var filtered = results.filter(function (item) {
//         return item !== "";
//     }).join("\n");
//     console.log(filtered);
//     //console.log(results);
// });