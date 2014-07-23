// make one atom
function makeAtom(colore) {
    var atomGeometry = new THREE.SphereGeometry(0.8, 64, 64);
    var atomMaterial = new THREE.MeshPhongMaterial({
        color: colore,
        wireframe: false
    });
    var atom = new THREE.Mesh(atomGeometry, atomMaterial);

    return atom;
}

// make one electron
function makeElectron() {
    var sphereGeometryElectron = new THREE.SphereGeometry(0.5, 20, 20);
    var sphereMaterialElectron = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        wireframe: false
    });
    var elettrone = new THREE.Mesh(sphereGeometryElectron, sphereMaterialElectron);

    return elettrone;
}

// make electron's path
function makePath(a1, a2, rot, asse, color) {
    var materiaTraiettoria = new THREE.LineBasicMaterial({
        color: color,
        opacity: 1
    });
    var traiettoria = new THREE.EllipseCurve(0, 0, a1, a2, 0, 360, true);
    var ellipsePath = new THREE.CurvePath();
    ellipsePath.add(traiettoria);
    var ellipseGeometry = ellipsePath.createPointsGeometry(10000);
    ellipseGeometry.computeTangents();
    var line = new THREE.Line(ellipseGeometry, materiaTraiettoria);
    if (rot !== null && asse !== null) {
        if (asse === 'x')
            line.rotation.x = rot;
        if (asse === 'y')
            line.rotation.y = rot;
        if (asse === 'z')
            line.rotation.z = rot;
    }
    return line;
}

// calculate the distance between 2 atoms
function distance(atom1, atom2) {
    var dx = atom1.x - atom2.x;
    var dy = atom1.y - atom2.y;
    var dz = atom1.z - atom2.z;

    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

// find distance between S atoms
function ssDistance(ssArray) { //ssArray è un array di atomi di zolfo
    var minDistance = 10000;

    var distance2atom = new Array();
    for (var i = 0; i < ssArray.length; ++i) {
        for (var j = 0; j < ssArray.length; ++j) {
            if (distance(ssArray[i], ssArray[j]) > 0) {
                var minDisTemp = {
                    atomFrom: "1",
                    atomTo: "1",
                    distance: 100000
                };
                minDisTemp.distance = distance(ssArray[i], ssArray[j]);
                minDisTemp.atomFrom = ssArray[i];
                minDisTemp.atomTo = ssArray[j];
                distance2atom.push(minDisTemp);
            }
        }
    }
    // sort list
    distance2atom.sort(compare);
    var finalDistances = new Array();
    for (var i = 0; i < (ssArray.length) / 2 + 1; i++) {
        var finalDistance = distance2atom[i];
        finalDistances.push(finalDistance);
        i++;
    };

    return finalDistances;
}

// compare 2 distance - use this function to sort the array
function compare(a, b) {
    if (a.distance < b.distance)
        return -1;
    if (a.distance > b.distance)
        return 1;
    return 0;
}

// make SS-bonds
function makeSsBonds(atomObject) {
    var material = new THREE.LineBasicMaterial({
        color: 0xdcdcdc,
        linewidth: 5
    });

    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(parseFloat(atomObject.atomFrom.x), parseFloat(atomObject.atomFrom.y), parseFloat(atomObject.atomFrom.z)));
    geometry.vertices.push(new THREE.Vector3(parseFloat(atomObject.atomTo.x), parseFloat(atomObject.atomTo.y), parseFloat(atomObject.atomTo.z)));

    var line = new THREE.Line(geometry, material);

    return line;

}

colors = {
    'H': 0xf9f900,
    'N': 0x3000ff,
    'C': 0x16ff10,
    'O': 0xff0000,
    'S': 0xdcdcdc 
};
k = 2;
radii = {
    'H': 0.53 * k,
    'N': 0.65 * k,
    'C': 0.70 * k,
    'O': 0.60 * k,
    'S': 1 * k
};

// get color of atom by his type (S, N, C, O, H)
function getColorByType(type) {
    return colors[type] || 0xffffff;
    // if (type === 'S')
    //     return 0xdcdcdc;
    // if (type === 'N') //blue
    //     return 0x3000ff;
    // if (type === 'C') //green
    //     return 0x16ff10;
    // if (type === 'O') //red
    //     return 0xff0000;
    // if (type === 'H') //yellow
    //     return 0xf9f900;
    // return 0xffffff;
}

// set dimension to atom by his type
function setDimension(type) {
    return radii[type] || 1;
    // if (type === 'H')
    //     return 0.53;
    // if (type === 'N')
    //     return 0.65;
    // if (type === 'C')
    //     return 0.7;
    // if (type === 'O')
    //     return 0.6;
    // if (type === 'S')
    //     return 1;
    // return 1;
}