var char_cache = {};
function constructString(str, mat){
	var strObj = new THREE.Object3D();
	var offset = 0;
	for (var i = 0; i < str.length; i++) {
		if (!char_cache[str[i]]) {
			var char_geometry = new THREE.TextGeometry(str[i], {curveSegments: 2 });
			char_geometry.computeBoundingBox();
			char_cache[str[i]] = new THREE.Mesh(char_geometry, mat);
		}
		var char = char_cache[str[i]].clone();
		char.material = mat;
		char.position.x = offset;
		var char_width = char.geometry.boundingBox.size().x;
		if (char_width === -Infinity) { char_width = 20; }
		char_width += 15;
		// HACK because the digit '1' seems to have weird kerning.
		if (str[i] === '1') {
			char.position.x -= 20;
		}
		offset += char_width;
		strObj.add(char);
	}
	return strObj;
}
