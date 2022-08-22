const { exec } = require('child_process');
var fs = require('fs');
var path = require('path');
const { stdout } = require('process');

var Blame = [];
// Para encontrar o termo lendo o arquivo
function readFileAndFind(file) {
    var content = fs.readFileSync(file, 'utf8');
    if (content.includes('ManagedResource' || 'ManagedAttribute')) {
        //executar comando shell para pegar o pwd do arquivo
        
        exec(`git blame ${file}`, (err, stdout, stderr) => {
            if (err) {
                // node couldn't execute the command
                return;
            }
            // the *entire* stdout and stderr (buffered)
            //console.log(`stdout: ${stdout}`);
            //console.log(`stderr: ${stderr}`);
            Blame.push(stdout);
        }
        );
        //fim da função exec shell

        return "Possui notação e o pwd é:" + file + Blame;
    } else {
        return "";
    }
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
//Usage

walk("/Users/viniciussoares/Desktop/Algar_Telecom/LeituraDoCodigo", function (err, results) {
    if (err) throw err;
    console.log(results);
});