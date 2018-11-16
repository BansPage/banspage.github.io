let currentBucketIndex = 2;
function addStage(ind) {
	let bucket = document.getElementById("bucket" + ind.toString());
	let div = bucket.getElementsByTagName("div")[0];

	let newSelect = document.createElement("SELECT");
	newSelect.innerHTML = getSelectInner();
	div.appendChild(newSelect);
	let newCheckbox = document.createElement("input");
	newCheckbox.type = "checkbox";
	div.appendChild(newCheckbox);
	let newLabel = document.createElement("label");
	newLabel.innerHTML = " ¬";
	div.appendChild(newLabel);
	div.appendChild(document.createElement("br"));
}

function removeStage(ind) {
	let bucket = document.getElementById("bucket" + ind.toString());
	let div = bucket.getElementsByTagName("div")[0];
	if (div.getElementsByTagName("SELECT").length <= 1 && ind > 2) {
		bucket.remove();
		if (ind == currentBucketIndex) {
			currentBucketIndex -= 1;
		}
		setFirstBucketHeaders();
		return;
	} else if (div.getElementsByTagName("SELECT").length <= 1) {
		return;
	}

	while (div.lastChild.tagName != "SELECT") {
		div.removeChild(div.lastChild);
	}
	div.removeChild(div.lastChild);
}

function addBucket() {
	currentBucketIndex += 1;
	let main = document.getElementById("buckets");
	let newSection = document.createElement("SECTION");
	newSection.id = "bucket" + currentBucketIndex.toString();

	let htmlString = "<h2>Bucket " + currentBucketIndex.toString() + "</h2>\n";
	htmlString += "<button onclick=\"addStage(" + currentBucketIndex.toString() + ")\">+</button>\n<button onclick=\"removeStage(" + currentBucketIndex.toString() + ")\">-</button><br /><br />\n";
	htmlString += "<div>\n<select>" + getSelectInner() + "</select>";
	htmlString += "<input type=\"checkbox\" /><label> ¬</label>"
	htmlString += "<br />\n</div>";
	newSection.innerHTML = htmlString;

	main.appendChild(newSection);
	setFirstBucketHeaders();
}

function getSelectInner() {
	let htmlString = "<option value=\"\">None</option>\n";
	for (let i = 1; i < whitelist.length; i++) {
		let realID = names.indexOf(whitelist[i]);
		htmlString += "<option value=\"" + realID.toString() + "\">" + whitelist[i] + "</option>\n";
		//htmlString += "<option value=\"" + realID.toString() + "h\">" + whitelist[i] + " ¬</option>\n";
	}
	return htmlString;
}

function loadSelects() {
	let selects = document.getElementsByTagName("select");
	for (let i = 0; i < selects.length; i++) {
		selects[i].innerHTML = getSelectInner();
	}
	document.getElementById("generatedCode").value = "";

	let inputs = document.getElementsByTagName("input");
	for (let i = 0; i < inputs.length; i++) {
		inputs[i].checked = false;
	}
}

function validStage(s) {
	s = parseInt(s.split("h")[0]);
	return whitelist.indexOf(names[s]) > 0;
}

function setFirstBucketHeaders() {
	if (document.getElementById("buckets").getElementsByTagName("section").length == 2) {
		document.getElementById("header1").innerHTML = "Starters";
		document.getElementById("header2").innerHTML = "Counterpicks";
	} else {
		document.getElementById("header1").innerHTML = "Bucket 1";
		document.getElementById("header2").innerHTML = "Bucket 2";
	}
}

function generateCode() {
	let main = document.getElementById("buckets");
	let sections = main.getElementsByTagName("section");

	let resultString = "";
	for (let i = 0; i < sections.length; i++) {
		let bucketString = "";
		if (i != 0) {
			bucketString += "|";
		}
		
		let selects = sections[i].getElementsByTagName("div")[0].getElementsByTagName("select");
		let checkboxes = sections[i].getElementsByTagName("div")[0].getElementsByTagName("input");
		for (let j = 0; j < selects.length; j++) {
			if (j != 0) {
				bucketString += "-";
			}
			bucketString += selects[j].value;
			if (checkboxes[j].checked)
				bucketString += "h";
		}
		if (bucketString.length > 0 && bucketString != "|")
			resultString += bucketString;
	}
	console.log(resultString);

	document.getElementById("generatedCode").value = resultString;

	return resultString;
}

function loadBuckets() {
	let code = document.getElementById("generatedCode").value;
	let bucketCodes = code.split("|");
	if (bucketCodes.length == 0)
		return;

	let main = document.getElementById("buckets");

	while (main.getElementsByTagName("section").length > 2) {
		main.removeChild(main.lastChild);
	}
	currentBucketIndex = 2;


	while (main.getElementsByTagName("section").length < bucketCodes.length) {
		addBucket();
	}

	for (let i = 0; i < bucketCodes.length; i++) {
		let stages = bucketCodes[i].split("-");
		let currentBucket = document.getElementById("bucket" + (i + 1).toString()).getElementsByTagName("div")[0];
		currentBucket.innerHTML = "";
		while (currentBucket.getElementsByTagName("select").length < stages.length)
			addStage(i + 1);
		let selects = currentBucket.getElementsByTagName("select");
		let checkboxes = currentBucket.getElementsByTagName("input");
		for (let j = 0; j < stages.length; j++) {
			if (validStage(stages[j])) {
				let stageID = stages[j].split("h")[0];
				selects[j].value = stageID;
				if (stages[j].indexOf("h") > -1) {
					checkboxes[j].checked = true;
				} else {
					checkboxes[j].checked = false;
				}
			}
			else {
				let stageCode = document.getElementById("generatedCode").value;
				if (window.location.href.indexOf("?") == -1)
					window.location.href = window.location.href + "?nolimits=1&s=" + stageCode;
				else
					window.location.href = window.location.href + "&nolimits=1";
			}
		}
	}

	document.getElementById("generatedCode").value = "";
}

function redirect() {
	generateCode();
	let v = document.getElementById("generatedCode").value;

	if (v)
		window.location.href = "../index.html?s=" + v;
}