//atomic Van Der Wals's radius in Angstrom

radii = {
    'H': 1.20,
    'N': 1.55,
    'C': 1.70,
    'O': 1.52,
    'S': 1.80,
    'Cl': 1.75,
    'F': 1.47,
    'K': 2.75,
    'P': 1.80
};

// set dimension to atom by his type
function setDimension(type) {
    return radii[type] || 1;

}