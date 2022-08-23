const { exec } = require("child_process");
var Blame = [];

function gitBlame(file, callback) {
    exec(`git blame ${file}`, (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            return;
        }
        //atribuir o resultado do git blame para o array Blame
        //Blame.push(stdout);
        console.log(`stderr: ${stderr}`);
        console.log(`stdout: ${stdout}`);
    }
    );
}
        // the *entire* stdout and stderr (buffered)
//console.log(gitBlame("/Users/viniciussoares/Desktop/Algar_Telecom/LeituraDoCodigo/ReadFile3.js"));
gitBlame("/Users/viniciussoares/Desktop/Algar_Telecom/algarcrm/algarcrm/source/modules/phone/src/main/java/br/com/algartelecom/algarcrm/phone/controller/PhoneControler.java");

//console.log(readDirContentAndReadFileAndFindManagedResource("/Users/viniciussoares/Desktop/Algar_Telecom/algarcrm/algarcrm/source/modules/phone"));

