const { exec } = require("child_process");

function gitBlame(file, callback) {
    exec(`git blame ${file}`, (err, stdout, stderr) => {
        var Blame = [];
        if (err) {
            // node couldn't execute the command
            return;
        }
        //atribuir o resultado do git blame para o array Blame
        Blame.push(stdout);
    }
    );
}
        // the *entire* stdout and stderr (buffered)
//        console.log(`stdout: ${stdout}`);
//        console.log(`stderr: ${stderr}`);


gitBlame("/Users/viniciussoares/Desktop/Algar_Telecom/LeituraDoCodigo/ReadFile3.js")

console.log(Blame);


