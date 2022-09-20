const { exec } = require("child_process");
blame = [];
var lineini = 1;
var linefim = 4;

function gitBlame(file, lineini, linefim) {
    exec(`git blame ${file} -L ${lineini},${linefim}`, (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            return;
        }
        //atribuir o resultado do git blame para o array Blame
        //Blame.push(stdout);
        // console.log(`stderr: ${stderr}`);
        // console.log(`stdout: ${stdout}`);
        
        blame.push(stdout);
        console.log(blame);

    }
    );
}
// the *entire* stdout and stderr (buffered)
console.log(gitBlame("/Users/viniciussoares/Desktop/Algar_Telecom/LeituraDoCodigo/Content/content4.txt", lineini, linefim));
//gitBlame("/Users/viniciussoares/Desktop/Algar_Telecom/algarcrm/algarcrm/source/modules/phone/src/main/java/br/com/algartelecom/algarcrm/phone/controller/PhoneControler.java");
//console.log(blame());
//console.log(readDirContentAndReadFileAndFindManagedResource("/Users/viniciussoares/Desktop/Algar_Telecom/algarcrm/algarcrm/source/modules/phone"));
