// Velho Testamento
var livros =document.querySelectorAll("li>div>a")



var arrLivros = Array.from(aLivros);

var SQL_STATEMENTES = '';



//Novo Testamento

var arrLivros = Array.from(document.querySelectorAll('li')).filter( el => el.innerText == 'Novo Testamento')[0].parentNode.querySelectorAll('div>a')
arrLivros = Array.from(arrLivros);


    arrLivros.forEach( async (elemento, indice) => {
            
        var tmpsql = `INSERT INTO Livros (id, title, position, oldTestament) VALUES (${indice+39}, '${elemento.innerText.trim()}', ${indice}, 0);`;
        SQL_STATEMENTES += '\n'+tmpsql;


        var doc = await fetch(elemento.href).then(res => res.text());

        var tempDiv = await document.createElement('div');
        tempDiv.innerHTML = doc;

        var capitulos = await tempDiv.querySelectorAll('ul>li>a');

        await capitulos.forEach( async (cap, capIndex) => {

            
            var root = await fetch(cap.href).then(res => res.text());
            var tempDivVersiculo = await document.createElement('div');
            tempDivVersiculo.innerHTML = root;
            
            var versiculos = await tempDivVersiculo.querySelectorAll("div>p");
            
            await versiculos.forEach( async (vers, versNum) => {

                let tmp_ = vers.innerHTML.replace(/<sup.*<\/sup>/gm, "");
                vers.innerHTML = tmp_;

                var tmpsql = `INSERT INTO Versiculo(content, position, chapter, book) VALUES ('${vers.innerText.trim()}', ${versNum+1}, ${cap.innerText}, ${indice+39});`;
                SQL_STATEMENTES += '\n'+tmpsql;

            });


            console.log(indice + '  ' + elemento.innerText, '--', cap.innerText,'--', versiculos.length);

        })

        // doc = doc.document;
        // console.log(doc.substring(0,20));
        // // console.log(doc.querySelector('#root').querySelectorAll('li>a').length);

    })

