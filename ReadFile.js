var fs = require('fs');

//read a path and return the content of the directory
function readFile(path) {
    var content = fs.readdirSync(path);
    return content;
}

//read the content inside the file and return it
function readFileContent(path) {
    var content = fs.readFileSync(path, 'utf8');
    return content;
}


//for each file in the directory, read the content and return it
function readFileContentForEach(path) {
    var content = fs.readdirSync(path);
    var contentForEach = [];
    content.forEach(function (file) {
        contentForEach.push(fs.readFileSync(path + file, 'utf8'));
    });
    return contentForEach;
}

//for each file in the directory, read the content and if it contains the word "ManagedResources", return it
function readFileContentForEachManagedResources(path) {
    var content = fs.readdirSync(path);
    var contentForEach = [];
    content.forEach(function (file) {
        if (file.includes("ManagedResources")) {
            contentForEach.push(fs.readFileSync(path + file, 'utf8'));
        }
        return contentForEach;
    });
}

console.log(readFileContentForEachManagedResources("/Users/viniciussoares/Desktop/Algar_Telecom/LeituraDoCodigo/Content/"));



//console.log(readFile("/Users/viniciussoares/Desktop/Algar_Telecom/LeituraDoCodigo/"));

//console.log(readFileContent("/Users/viniciussoares/Desktop/Algar_Telecom/LeituraDoCodigo/content.txt"));
