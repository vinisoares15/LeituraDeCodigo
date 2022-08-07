var fs = require('fs');


// Para encontrar o termo lendo o arquivo
function readFileAndFind(file) {
    var content = fs.readFileSync(file, 'utf8');
    if (content.includes('ManagedResource')) {
        return "Possui Managed Resource e o pwd é:" + file;
    } else {
        return ".";
    }
}

//check if it is a directory
function isDirectory(path) {
    if (fs.lstatSync(path).isDirectory()) {
        return true;
    }
}

// Para ler cada arquivo e chamar a função readFileAndFind
function readDirContentAndReadFileAndFindTerm(path) {
    content = fs.readdirSync(path);
    var contentForEach = [];
    for (var i = 0; i < content.length; i++) {
        contentForEach.push(readFileAndFind(path + content[i]));
    }
    
    return contentForEach;
    
}


//console.log(readDirContentAndReadFileAndFindTerm("/Users/viniciussoares/Desktop/Algar_Telecom/LeituraDoCodigo/Content2/"));
//console.log(readDirContentAndReadFileAndFindManagedResource("/Users/viniciussoares/Desktop/Algar_Telecom/algarcrm/algarcrm/source/modules/phone"));
console.log(readDirContentAndReadFileAndFindTerm("/Users/viniciussoares/Desktop/Algar_Telecom/algarcrm/algarcrm/source/modules/sales/src/main/java/br/com/algartelecom/algarcrm/sales/service/impl/"));

console.log(isDirectory("/Users/viniciussoares/Desktop/Algar_Telecom/LeituraDoCodigo/Content2/"));