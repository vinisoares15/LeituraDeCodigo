var fs = require('fs');
var path = require('path');

// Para encontrar o termo lendo o arquivo
function readFileAndFind(file) {
    var content = fs.readFileSync(file, 'utf8');
    if (content.includes('ManagedResource')) {
        return "Possui Managed Resource e o pwd é:" + file;
    } else {
        return ".";
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



walk("/Users/viniciussoares/Desktop/Algar_Telecom/algarcrm/algarcrm/source/modules/sales/src/main/java/br/com/algartelecom/", function (err, results) {
    if (err) throw err;
    console.log(results);
});