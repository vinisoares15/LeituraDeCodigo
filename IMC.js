//aceleração de um carro
var aceleracao = function (velocidade, tempo) {
    return velocidade / tempo;
}



if (content.includes('ManagedResource' || 'ManagedAttribute' || 'ApplicationProperty')) {
    //mostrar a linha onde foi encontrado o termo
     lineini = content.indexOf('ManagedResource');
     linefim = lineini;
     rl.on("line", (line, lineno = line_counter()) => {
     //1...2...3...10...100...etc
        if (line.includes('ManagedResource')) {
            console.log(lineno + " " + file);
        }
      });
    //var payload = [];
    //executar comando shell para pegar o blame do arquivo, usar o parâmetro "-L ${line}"" para mostrar a linha
    exec(`git blame ${file} -L ${lineini},${linefim}`, (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            return;
        }
        // the *entire* stdout and stderr (buffered)
        //console.log(`stdout: ${stdout}`);
        //console.log(`stderr: ${stderr}`);
        blame.push(stdout)
        //payload.push(stdout);
        console.log(blame);
        //PERGUNTAR PARA O PANTERA COMO FAZ PARA RETORNAR O VALOR DESSA FUNÇÃO NO CONSOLE (RETURN)
    }
    );
}