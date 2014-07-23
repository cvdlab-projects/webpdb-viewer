function makeDesk(x,y,z,segmentX,segmentY,segmentZ,colore) {
	var deskGeometry = new THREE.BoxGeometry(x,y,z,segmentX,segmentY,segmentZ);
	var deskMaterial = new THREE.MeshPhongMaterial( {color: colore, opacity: 0.5, transparent: true, shininess: 10} );
	var desk = new THREE.Mesh(deskGeometry, deskMaterial);

	desk.castShadow = true;
	desk.receiveShadow = true;
	return desk;
}

function makeLeg(radiusTop, radiusBottom, height, radiusSegments, heightSegments, colore) {
	var legGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments);
	var legMaterial = new THREE.MeshPhongMaterial( {color: colore, side: THREE.DoubleSide, shininess: 1000, metal: true} );
	var leg = new THREE.Mesh( legGeometry, legMaterial );
	leg.castShadow = true;
	leg.receiveShadow = true;
	return leg;
}

function makeTable(deskX,deskY,deskZ,deskSegmentX,deskSegmentY,deskSegmentZ,deskColore,   legRadiusTop, legRadiusBottom, legHeight,legRradiusSegments, legHeightSegments, legColore) {
	var desk = makeDesk(deskX,deskY,deskZ,deskSegmentX,deskSegmentY,deskSegmentZ,deskColore);
	var leg1 = makeLeg(legRadiusTop, legRadiusBottom, legHeight,legRradiusSegments, legHeightSegments, legColore);
	var leg2 = makeLeg(legRadiusTop, legRadiusBottom, legHeight,legRradiusSegments, legHeightSegments, legColore);
	var leg3 = makeLeg(legRadiusTop, legRadiusBottom, legHeight,legRradiusSegments, legHeightSegments, legColore);
	var leg4 = makeLeg(legRadiusTop, legRadiusBottom, legHeight,legRradiusSegments, legHeightSegments, legColore);

	leg1.rotation.x = Math.PI/2;
	leg2.rotation.x = Math.PI/2;
	leg3.rotation.x = Math.PI/2;
	leg4.rotation.x = Math.PI/2;

	desk.position.set((deskX)/2, (deskY)/2, legHeight);

	leg1.position.set(legRadiusTop, legRadiusTop, legHeight/2);
	leg2.position.set(deskX-legRadiusTop, legRadiusTop, legHeight/2);
	leg3.position.set(deskX-legRadiusTop, deskY-legRadiusTop, legHeight/2);
	leg4.position.set(legRadiusTop, deskY-legRadiusTop, legHeight/2);

	var tavolo = new THREE.Object3D();

	tavolo.add(desk);
	tavolo.add(leg1);
	tavolo.add(leg2);
	tavolo.add(leg3);
	tavolo.add(leg4);

	return tavolo;
}

function makeBaseLamp(radiusTop, radiusBottom, height, radiusSegments, heightSegments, colore, tableX, tableY, tableZ, colore) {
	var baseLampGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments);
	var baseLampMaterial = new THREE.MeshPhongMaterial( {color: colore, side: THREE.DoubleSide, shininess: 80, metal: true} );
	var baseLamp = new THREE.Mesh( baseLampGeometry, baseLampMaterial );

	baseLamp.position.set(tableY/2,tableX/2,tableZ);
	baseLamp.rotation.x = -Math.PI/2;
	baseLamp.castShadow = true;
	baseLamp.receiveShadow = true;

	return baseLamp;
}

var radiusCircleBase;
var spessoreTavolo;
var raggioSfera;
var coloreSfera;

function makeJoint(radius, colore) {
	var jointGeometry = new THREE.SphereGeometry(radius, 32, 32 );
	var jointMaterial = new THREE.MeshPhongMaterial( {color: colore} );
	var joint = new THREE.Mesh(jointGeometry, jointMaterial);
	
	joint.castShadow = true;
	joint.receiveShadow = true;

	var cilindrettoGeometry = new THREE.CylinderGeometry(radius*0.3, radius*0.3, radius, 20, 20);
	var cilindrettoMaterial = new THREE.MeshPhongMaterial( {color: 0xFFFFFF, side: THREE.DoubleSide} );
	var cilindretto = new THREE.Mesh( cilindrettoGeometry, cilindrettoMaterial );
	
	cilindretto.castShadow = true;
	
	cilindretto.receiveShadow = true;
	var material = new THREE.MeshPhongMaterial({color: 0xC62326});
	raggioSfera = radius;
	coloreSfera = colore;
	var segments = 32;
	var circleGeometry = new THREE.CircleGeometry( radius, segments );				
	var circle = new THREE.Mesh( circleGeometry, material );
	
	circle.castShadow = true;
	circle.receiveShadow = true;
	
	radiusCircleBase = radius;

	cilindretto.position.set(0,-radius,0);
	circle.rotation.x = Math.PI/2;
	circle.position.set(0,-radius/2 - 0.001,0);

	joint.add(cilindretto);

	cilindretto.add(circle);
	return joint;	
}

function makeFourCylinder() {
	var cylinderGeometry = new THREE.CylinderGeometry(0.08, 0.08, 2, 20, 20);
	var cylinderMaterial = new THREE.MeshPhongMaterial( {color: 0x60381F, side: THREE.DoubleSide} );
	var cylinder1 = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
	var cylinder2 = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
	var cylinder3 = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
	var cylinder4 = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
	radiusCylinder = 0.08;
	
	cylinder1.castShadow = true;
	cylinder2.castShadow = true;
	cylinder3.castShadow = true;
	cylinder4.castShadow = true;

	cylinder1.receiveShadow = true;
	cylinder2.receiveShadow = true;
	cylinder3.receiveShadow = true;
	cylinder4.receiveShadow = true;
	strutturaCylinder = new THREE.Object3D();

	cylinder1.position.set(radiusCircleBase - radiusCylinder,-1.4,0);
	cylinder2.position.set(0,-1.4,radiusCircleBase - radiusCylinder);
	cylinder3.position.set(-radiusCircleBase + radiusCylinder,-1.4,0);
	cylinder4.position.set(0,-1.4,-radiusCircleBase + radiusCylinder);
	

	strutturaCylinder.add(cylinder1);
	strutturaCylinder.add(cylinder2);
	strutturaCylinder.add(cylinder3);
	strutturaCylinder.add(cylinder4);
	
	var material = new THREE.MeshPhongMaterial({color: 0xC62326});
	var radius = raggioSfera;
	var segments = 32;
	var circleGeometry = new THREE.CircleGeometry( radius, segments );				
	var circle = new THREE.Mesh( circleGeometry, material );
	circle.rotation.x = Math.PI/2;
	circle.position.set(0,-2.41,0);
	strutturaCylinder.add(circle);
	
	circle.castShadow = true;
	circle.receiveShadow = true;
	
	return strutturaCylinder;

}

function makeLamp() {
	var jointGeometry = new THREE.SphereGeometry(raggioSfera, 32, 32 );
	var jointMaterial = new THREE.MeshPhongMaterial( {color: coloreSfera} );
	var joint = new THREE.Mesh(jointGeometry, jointMaterial);

	joint.position.set(0,-2.7,0);

	var cilindrettoGeometry = new THREE.CylinderGeometry(raggioSfera*0.3, raggioSfera*0.3, raggioSfera, 20, 20);
	var cilindrettoMaterial = new THREE.MeshPhongMaterial( {color: 0xFFFFFF, side: THREE.DoubleSide} );
	var cilindretto = new THREE.Mesh( cilindrettoGeometry, cilindrettoMaterial );
	
	var jointGeometrySemiSfera = new THREE.SphereGeometry(raggioSfera*3, 32, 32, 0, Math.PI);
	var jointMaterialSemiSfera = new THREE.MeshPhongMaterial( {color: 0xFFFFFF, side: THREE.DoubleSide} );
	var semiSfera = new THREE.Mesh(jointGeometrySemiSfera, jointMaterialSemiSfera);
	
	semiSfera.rotation.x = -Math.PI/2;
	semiSfera.position.set(0,-(3*raggioSfera + 0.14),0);
	cilindretto.position.set(0,-raggioSfera,0);
	cilindretto.add(semiSfera);
	joint.add(cilindretto);

	var cilindrettoLampadinaGeometry = new THREE.CylinderGeometry(raggioSfera*0.6, raggioSfera*0.6, 0.15, 20, 20);
	var cilindrettoLampadinaMaterial = new THREE.MeshPhongMaterial( {color: 0x999999, side: THREE.DoubleSide} );
	var cilindrettoLampadina = new THREE.Mesh( cilindrettoLampadinaGeometry, cilindrettoLampadinaMaterial );
	
	var lampadinaGeometry = new THREE.SphereGeometry(0.25, 32, 32 );
	var lampadinaMaterial = new THREE.MeshPhongMaterial( {color: 0xFFFF00, opacity: 0.8, transparent: true, shininess: 10} );
	var lampadina = new THREE.Mesh(lampadinaGeometry, lampadinaMaterial);
	
	lampadina.position.set(0,-raggioSfera*0.6 - 0.1,0);
	cilindrettoLampadina.position.set(0,-0.45,0);
	cilindrettoLampadina.add(lampadina);
	joint.add(cilindrettoLampadina);

	return joint;
}

function makeSwichOnOff() {
	var externalCyilinderGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.3, 20, 20);
	var externalCylinderMaterial = new THREE.MeshLambertMaterial( {color: 0x000000, side: THREE.DoubleSide} );
	var externalCyilinder = new THREE.Mesh( externalCyilinderGeometry, externalCylinderMaterial );
	externalCyilinder.castShadow = true;
	externalCyilinder.receiveShadow = true;

	var internalCyilinderGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.6, 20, 20);
	var internalCylinderMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
	var internalCyilinder = new THREE.Mesh( internalCyilinderGeometry, internalCylinderMaterial );
	internalCyilinder.castShadow = true;
	internalCyilinder.receiveShadow = true;

	internalCyilinder.position.set(0.1-0.05,0,0);
	externalCyilinder.add(internalCyilinder);

	return externalCyilinder;	
}