
//leia um diretório e procure por arquivos, se encontrar outro diretório, entre nele e procure por arquivof
var fs = require('fs');

function isDirectory(path) {
    if (fs.lstatSync(path).isDirectory()) {
        return true;
    }
}


function LerDiretório(path) {
    var content = fs.readdirSync(path);
    var contentForEach = [];
    for (var i = 0; i < content.length; i++) {
        if (isDirectory(path + content[i])) {
            contentForEach.push(LerDiretório(path + content[i]));
        }
        else {  //se não for diretório, então é arquivo         
        contentForEach.push(readFileAndFind(path + content[i]));
    }
    return contentForEach;
}
};

console.log(LerDiretório("/Users/viniciussoares/Desktop/Algar_Telecom/LeituraDoCodigo/Content/"));
