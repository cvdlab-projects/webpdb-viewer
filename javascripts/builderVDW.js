//atomic Van Der Wals's radius in Angstrom

radii = {
    'H': 120,
    'N': 155,
    'C': 170,
    'O': 152,
    'S': 180,
    'Cl': 175,
    'F': 147,
    'K': 275,
    'P': 180
};

// set dimension to atom by his type
function setDimension(type) {
    return radii[type] || 1;

}