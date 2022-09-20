//função que lê um arquivo e retorna o número da linha de um termo
// */

var fs = require('fs');

function findLine(file, term) {
    var content = fs.readFileSync(file, 'utf8');
    if (content.includes(term)) {
        return content.lastIndexOf(term);
    } else {
        return "";
    }
}

console.log(findLine("/Users/viniciussoares/Desktop/Algar_Telecom/LeituraDoCodigo/Content/content4.txt", "\n"));


