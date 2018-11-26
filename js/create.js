let currentBucketIndex = 0;

// Add Stage to Bucket
function addStage(ind) {
	let bucket = document.getElementById("bucket" + ind.toString());
	let div = bucket.getElementsByTagName("div")[0];

	let newStage = document.createElement("article");
	newStage.classList.add("field", "is-grouped", "is-grouped-centered");

	// Select
	let newSelectDiv = document.createElement("div");
	newSelectDiv.classList.add("select");

	let newSelect = document.createElement("select");
	newSelect.innerHTML = getSelectInner();
	newSelect.onchange = function () {
		generateCode();
	}


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
	newCheck.onchange = function () {
		generateCode();
	}

	let newLabel = document.createElement("label");
	newLabel.htmlFor = checkName;
	let newParagraph = document.createElement("P");
	newParagraph.innerHTML = "¬";

	newCheckDiv.appendChild(newCheck);
	newCheckDiv.appendChild(newLabel);
	newCheckDiv.appendChild(newParagraph);

	newStage.appendChild(newCheckDiv);

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
	/*
		<section id="bucket1" class="box">
            <h2 class="title is-4">Starters</h2>
            <div></div>
            <a class="button is-info" href="javascript:addStage(1)">Add</a>
            <a class="button is-danger" href="javascript:removeStage(1)">Remove</a>
        </section>
	*/
	currentBucketIndex += 1;
	let main = document.getElementById("buckets");
	let newSection = document.createElement("SECTION");
	newSection.id = "bucket" + currentBucketIndex.toString();
	newSection.classList.add("box");

	let sectionH2 = document.createElement("h2");
	sectionH2.classList.add("title", "is-4");
	sectionH2.innerHTML = "Bucket " + currentBucketIndex.toString();
	newSection.appendChild(sectionH2);

	newSection.appendChild(document.createElement("div"));

	let btnAdd = document.createElement("a");
	btnAdd.classList.add("button", "is-info");
	btnAdd.href = "javascript:addStage(" + currentBucketIndex + ")";
	btnAdd.innerHTML = "Add";
	newSection.appendChild(btnAdd);

	let btnRemove = document.createElement("a");
	btnRemove.classList.add("button", "is-danger");
	btnRemove.href = "javascript:removeStage(" + currentBucketIndex + ")";
	btnRemove.innerHTML = "Remove";
	newSection.appendChild(btnRemove);

	main.appendChild(newSection);
	addStage(currentBucketIndex);
	setFirstBucketHeaders();
}

// Create the interior of a dropdown
function getSelectInner() {
	let htmlString = "<option value=\"0\">None</option>\n";
	let sortedList = whitelist.slice(0); //clone of whitelist
	let none = sortedList.splice(0, 1); //remove option "None"
	sortedList = sortedList.sort(); //sort whitelist alphabetically, except for None
	sortedList = Array.concat(none, sortedList); //put None back at the top

	for (let i = 1; i < sortedList.length; i++) {
		let realID = names.indexOf(sortedList[i]);
		htmlString += "<option value=\"" + realID.toString() + "\">" + sortedList[i] + "</option>\n";
	}
	return htmlString;
}

// Creates first two buckets
function loadSelects() {
	addBucket();
	addBucket();
	setFirstBucketHeaders();

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
	let buckets = document.getElementById("buckets").getElementsByTagName("section").length;
	if (buckets == 2) {
		document.getElementById("bucket1").getElementsByTagName("h2")[0].innerHTML = "Starters";
		document.getElementById("bucket2").getElementsByTagName("h2")[0].innerHTML = "Counterpicks";
	} else if (buckets > 2) {
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
			bucketString += "_";
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
		if (bucketString.length > 0 && bucketString != "_")
			resultString += bucketString;
	}

	let name = document.getElementById("name").value;
	if (name) {
		resultString += "n" + btoa(name);
	}
	console.log(resultString);
	window.location.hash = resultString;

	return resultString;
}

// Load buckets from code
function loadBuckets() {
	let code = window.location.hash.replace("#", "");
	code = code.replace(/\|/g, "_"); //backwards compatability with | codes
	let bucketCodes = code.split("_");
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
				let stageCode = window.location.hash.replace("#", "");
				window.location.href = "./create.html" + "?nolimits=1#" + stageCode;
			}
		}
	}

	if (code.split("n").length > 1) {
		document.getElementById("name").value = atob(code.split("n")[1]);
	}
}

// Redirect to homepage with stage code
function createStagelist() {
	generateCode();
	let v = window.location.hash.replace("#", "");

	if (v)
		window.location.href = "./index.html?s=" + v;
}

// Set page to noLimits if applicable
function setLimits() {
	let urlString = window.location.href;
    let url = new URL(urlString);
    let nolimits = url.searchParams.get("nolimits");
    let stageCode = window.location.hash.replace("#", "");
    if (nolimits) {
    	whitelist = names;
    	document.getElementsByTagName("h1")[0].innerHTML = "Create Your Own Stagelist! No limits!";
    	document.getElementById("unlimited").classList.remove("hidden");
    	document.getElementById("limited").classList.add("hidden");
    }
}

// Load buckets from URL ?s parameter
function loadFromURL() {
	stageCode = window.location.hash.replace("#", "");
	if (stageCode) {
    	loadBuckets();
    }
}

function preset(key) {
	let stageCode = dataMap[key];
	let urlString = window.location.href;
    let url = new URL(urlString);
	let nolimits = url.searchParams.get("nolimits");
	let newURL = "./create.html";
	if (nolimits)
		newURL += "?nolimits=1";
	newURL += "#" + stageCode;
	console.log(newURL);
	window.location.href = newURL;
	console.log(window.location.href);
	window.location.reload(true);
}