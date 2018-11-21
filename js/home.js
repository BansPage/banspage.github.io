//toggle css struck class
function toggle(id) {
    let img = document.getElementById("i" + id.toString());
    img.classList.toggle("struck");
}


// Current format is ?s={starter ID}{optional "h" for hazardless}-{next stage}&c={counterpick ID}{optional "h" for hazardless}-{next stage}
// Example: ?s=12h-2-3&c=3h-4-12

// Output: 2D array of stage objects. Each inner array corresponds to a stage bucket.
// Example: [ [{id: 1, hazardless: false} ... ], [{id: 3, hazardless: true} ... ], [{id: 56, hazardless: true} ...] ] 
function getURLParameters() {
    let urlString = window.location.href;
    let url = new URL(urlString);

    // Load input
    let param = url.searchParams.get("s");
    if (!param)
        return null;

    return decode(param.toString());
}

// Create stage objects from string
function decode(code) {
    let buckets = code.split("|");

    if (!buckets || buckets.length == 0)
        return null;

    let data = [];

    for(let i = 0; i < buckets.length; i++) {
        let bucketList = buckets[i].split("-");
        let bucketData = [];
        for (let j = 0; j < bucketList.length; j++) {
            let stageData = bucketList[j].split(/(\d+)/);
            bucketData.push({id: stageData[1], hazardless: (stageData[2] == "h" ? true : false)});
        }
        data.push(bucketData);
    }
    document.getElementById("stageCode").value = code;
    return data;
}

// Input: 2D array of stage data
// Output: An encoded string representing the input. example: "19-20h-88|77-10h-11|1-2-3h"
function generateURLParameters(data) {
    let parameterString = "?s=";

    for (let a = 0; a < data.length; a++) {
        if (a != 0) {
            parameterString += "|";
        }
        for (let i = 0; i < data[a].length; i++) {
            if (i != 0) {
                parameterString += "-";
            }
            parameterString += data[a][i].id + (data[a][i].hazardless ? "h" : "");
        }
    }

    return parameterString;
}

// Load stage buckets from array of objects
function init(data) {
    let section = document.getElementById("buckets");
    let divs = section.getElementsByTagName("div");
    for (let i = 0; i < divs.length; i++) {
        divs[i].innerHTML = "";
    }
    for (let i = divs.length - 1; i >= 0; i--) {
        section.removeChild(divs[i]);
    }
    let currBucket = 0;
    while (section.getElementsByTagName("div").length < data.length) {
        let newDiv = document.createElement("div");
        newDiv.id = "bucket" + currBucket.toString();
        section.appendChild(newDiv);
        currBucket += 1;
    }

    let headers = getHeaders(data.length);

    let offset = 0;
    for (let i = 0; i < data.length; i++) {
        let htmlString = "<h2 class=\"title is-4\">" + headers[i] + "</h2>\n";
        htmlString += getInnerHtml(data[i], offset);
        offset += data[i].length;
        document.getElementById("bucket" + i.toString()).innerHTML = htmlString;
    }

    document.getElementsByTagName("h1")[0].innerHTML = "Custom Stagelist";
}

function initFromDataMap(key) {
    init(decode(dataMap[key]));
    document.getElementsByTagName("h1")[0].innerHTML = "SSBU Stage Striking";
}

//Get the headers for Stage Buckets. If > 2, return undefined, as a list of "Bucket X" will be created instead
function getHeaders(len) {
    if (len == 1) {
        return ["Starters"];
    } else if (len == 2) {
        return ["Starters", "Counterpicks"];
    }
    headers = [];
    for (let i = 0; i < len; i++) {
        headers.push("Bucket " + (i + 1).toString());
    }
    return headers;
}

//Create the Inner HTML of one Stage Bucket
function getInnerHtml(arr, offset) {
    let ret = "";
    for (let i = 0; i < arr.length; i++) {
        let s = "<div class=\"box stage\" onmousedown=\"toggle(" + (i + offset).toString() + ")\" ><img id=\"i" + (i + offset).toString() + "\"";
        if (arr[i].hazardless) {
            s += "class=\"hazardless\" ";
        }
        s += "src=\"https://www.smashbros.com/assets_v2/img/stage/stage_thumb" + arr[i].id.toString() + ".jpg\" />\n";
        s += "<p>" + names[parseInt(arr[i].id)] + (arr[i].hazardless ? " ¬" : "") + "</p></div>\n"; //removed symbol as it was redundant here
        ret += s;
    }
    return ret;
}

//read stage code from URL, fill stage buckets accordingly. Pull from dataMap otherwise.
function loadFromURL() {
    let generated = getURLParameters(); //try to read from URL
	if (generated) {
		init(generated);
		let urlString = window.location.href;
		let url = new URL(urlString);
		let param = url.searchParams.get("s");
		document.getElementById("stageCode").value = param;
	} else {
		initFromDataMap(Object.keys(dataMap)[0]); //load the first code from the dataMap
	}
}

//Redirect to Creation page, with current stageCode.
function gotoCreate() {
	let stageCode = document.getElementById("stageCode").value;
	if (stageCode)
		window.location.href = "./create/index.html?s=" + stageCode;
	else {
		window.location.href="./create/index.html";
	}
}

//Set id "precreated" to the list of stagelists from DataMap.
function populateCommunityList() {
    let htmlString = "";
    let keys = Object.keys(dataMap);
    for (let i = 0; i < keys.length; i++) {
        htmlString += "<li><a onclick=\"initFromDataMap('" + keys[i] + "')\" href=\"#\">" + keys[i] + " Stagelist</a></li>\n";
    }
    document.getElementById("precreated").innerHTML = htmlString;
}