var fs = require('fs');

function readFileAndFind(file) {
    var content = fs.readFileSync(file, 'utf8');
    if (content.includes('ManagedResource')) {
        return "Possui Managed Resource e o pwd é:" + file;
    } else {
        return "Não possui Managed Resource e o pwd é" + file;
    }
}

//check if it is a directory
function isDirectory(path) {
    if (fs.lstatSync(path).isDirectory()) {
        return true;
    }
}



function readDirContentAndReadFileAndFindManagedResource(path) {
    content = fs.readdirSync(path);
    var contentForEach = [];
    for (var i = 0; i < content.length; i++) {
        contentForEach.push(readFileAndFind(path + content[i]));
    }
    
    return contentForEach;
    
}






//console.log(readDirContentAndReadFileAndFindManagedResource("/Users/viniciussoares/Desktop/Algar_Telecom/LeituraDoCodigo/Content/"));
//console.log(readDirContentAndReadFileAndFindManagedResource("/Users/viniciussoares/Desktop/Algar_Telecom/algarcrm/algarcrm/source/modules/phone"));


console.log(isDirectory("/Users/viniciussoares/Desktop/Algar_Telecom/LeituraDoCodigo/Content/"));