
//read a path and return the content of the file
function readFile(path) {
    var fs = require('fs');
    var content = fs.readFileSync(path, 'utf8');
    return content;
}

readFile("/Users/viniciussoares/Desktop/Algar_Telecom/LeituraDoCodigo/content.txt");

console.log(content);

