function clear(file, modelNumber) {
        var raws = file.split('\n');    //divide ogni singola riga del file
        var listaATOM = new Array();
        var chosenModel = false;
        var listaCoordinate = new Array();
        raws.forEach(function(raw) {
            if ((/^MODEL/).test(raw)) {
                var clearedRaw = clearModelString(raw);
                if(clearedRaw == modelNumber)
                chosenModel = true;
            }
            if(chosenModel) {
                if ((/^ATOM/).test(raw)) {
                    var x = raw.replace(/\s+/g, ' ');       //g serve a ripetere..
                    listaATOM.push(x);
                    // console.log(listaATOM);
                }
            }
            if ((/^TER/).test(raw)) 
                chosenModel = false;
        });

        listaATOM.forEach(function(raw){
            var riga = raw.replace(/\S+ \S+ \S+ \S+ \S+ \S+ /, '');
            var listaCoordinateTemp = {x: " ", y: " ", z: " ", type: " "};
            var x = riga.substring(0,riga.indexOf(' '));    //tagli la stringa dall'inizio al primo spazio
            listaCoordinateTemp.x = x;
            var charBeginY = riga.substring(riga.indexOf(' ')+1);  //calcoli la posizione del carattere del primo spazio + 1 e ti ritorni la stringa tagliata
            var y = charBeginY.substring(0, charBeginY.indexOf(' ')); //tagli la stringa precedente dall'inizio fino al primo spazio
            listaCoordinateTemp.y = y;
            var charBeginZ = charBeginY.substring(charBeginY.indexOf(' ')+1);        //...stessa cosa di sopra
            var z = charBeginZ.substring(0, charBeginZ.indexOf(' '));
            listaCoordinateTemp.z = z;
            var type = charBeginZ.substring(charBeginZ.length-2,charBeginZ.length-1);
            listaCoordinateTemp.type = type;


            listaCoordinate.push(listaCoordinateTemp);
        });
       



        
    return listaCoordinate;
};



function modelCounter(file) {
    var modelNumber = 0;
    var raws = file.split('\n');   
    raws.forEach(function(raw) {
        if ((/^MODEL/).test(raw)) 
            ++modelNumber;


    });

    return modelNumber;
}


function clearModelString(raw) {
    var clearedRaw = raw.replace(/\S+\s+/, '');
    return clearedRaw;

}










