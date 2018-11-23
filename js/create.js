let currentBucketIndex = 2;

// Add Stage to Bucket
function addStage(ind) {
	let bucket = document.getElementById("bucket" + ind.toString());
	let div = bucket.getElementsByTagName("div")[0];

	let newStage = document.createElement("article");
	newStage.classList.add("field");
	newStage.classList.add("is-grouped");
	newStage.classList.add("is-grouped-centered");

	// Select
	let newSelectDiv = document.createElement("div");
	newSelectDiv.classList.add("select");

	let newSelect = document.createElement("select");
	newSelect.innerHTML = getSelectInner();
	newSelectDiv.appendChild(newSelect);

	newStage.appendChild(newSelectDiv);

	// Checkbox/Switch
	//let newCheckControl = document.createElement("p");
	//newCheckControl.classList.add("control");

	let newCheckDiv = document.createElement("div");
	newCheckDiv.classList.add("field");

	let newCheck = document.createElement("input");
	let checkName = '_' + Math.random().toString(36).substr(2, 9);
	newCheck.id = checkName;
	newCheck.name = checkName;
	newCheck.classList.add("switch");
	newCheck.type = "checkbox"
	newCheck.checked = false;

	let newLabel = document.createElement("label");
	newLabel.htmlFor = checkName;
	let newParagraph = document.createElement("P");
	newParagraph.innerHTML = "¬";

	newCheckDiv.appendChild(newCheck);
	newCheckDiv.appendChild(newLabel);
	newCheckDiv.appendChild(newParagraph);

	newStage.appendChild(newCheckDiv);
	//newStage.appendChild(newParagraph);

	div.appendChild(newStage);
}

// Remove Stage from Bucket
function removeStage(ind) {
	let bucket = document.getElementById("bucket" + ind.toString());
	let div = bucket.getElementsByTagName("div")[0];

	let stages = div.getElementsByTagName("article");
	if (stages.length <= 1 && ind > 2) {
		bucket.remove();
		if (ind == currentBucketIndex) {
			currentBucketIndex -= 1;
		}
		setFirstBucketHeaders();
		return;
	} else if (stages.length <= 1) {
		return;
	}
	div.removeChild(stages[stages.length - 1]);
}

// Create new Bucket
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

// Create the interior of a dropdown
function getSelectInner() {
	let htmlString = "<option value=\"\">None</option>\n";
	for (let i = 1; i < whitelist.length; i++) {
		let realID = names.indexOf(whitelist[i]);
		htmlString += "<option value=\"" + realID.toString() + "\">" + whitelist[i] + "</option>\n";
		//htmlString += "<option value=\"" + realID.toString() + "h\">" + whitelist[i] + " ¬</option>\n";
	}
	return htmlString;
}

// Perform getSelectInner() on all Dropdowns
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

// Check if stage is present in whitelist
function validStage(s) {
	s = parseInt(s.split("h")[0]);
	return whitelist.indexOf(names[s]) > 0;
}

// Keep resetting Starter/Counterpick headers
function setFirstBucketHeaders() {
	if (document.getElementById("buckets").getElementsByTagName("section").length == 2) {
		document.getElementById("bucket1").getElementsByTagName("h2")[0].innerHTML = "Starters";
		document.getElementById("bucket2").getElementsByTagName("h2")[0].innerHTML = "Counterpicks";
	} else {
		document.getElementById("bucket1").getElementsByTagName("h2")[0].innerHTML = "Bucket 1";
		document.getElementById("bucket2").getElementsByTagName("h2")[0].innerHTML = "Bucket 2";
	} 
}

// Generate Code from buckets and dropdowns
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

// Load buckets from code
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

// Redirect to homepage with generatedCode
function redirect() {
	generateCode();
	let v = document.getElementById("generatedCode").value;

	if (v)
		window.location.href = "../index.html?s=" + v;
}

// Set page to noLimits if applicable
function setLimits() {
	let urlString = window.location.href;
    let url = new URL(urlString);
    let nolimits = url.searchParams.get("nolimits");
    let stageCode = url.searchParams.get("s");
    if (nolimits) {
    	whitelist = names;
    	document.getElementsByTagName("h1")[0].innerHTML = "Create Your Own Stagelist! No limits!";
    	//document.getElementById("unlimited").classList.remove("hidden");
    	//document.getElementById("limited").classList.add("hidden");
    }
}

// Load buckets from URL ?s parameter
function loadFromURL() {
	let urlString = window.location.href;
	let url = new URL(urlString);
	let stageCode = url.searchParams.get("s");
	if (stageCode) {
    	document.getElementById("generatedCode").value = stageCode;
    	console.log(document.getElementById("generatedCode").value);
    	loadBuckets();
    	document.getElementById("generatedCode").value = stageCode;
    }
}