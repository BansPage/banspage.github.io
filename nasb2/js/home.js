function hideNotification() {
    let notification = document.getElementsByClassName("notification");
    notification[0].classList.add("hidden");
}

//toggle css struck class
function toggle(id) {
    let img = document.getElementById("i" + id.toString());
    img.classList.toggle("struck");
}

// Current format is ?s={starter ID}{optional "h" for hazardless}-{next stage}&c={counterpick ID}{optional "h" for hazardless}-{next stage}
// Example: ?s=12h-2-3&c=3h-4-12

// Output: 2D array of stage objects. Each inner array corresponds to a stage bucket.
// Example: [ [{id: 1, hazardless: false} ... ], [{id: 3, hazardless: true} ... ], [{id: 56, hazardless: true} ...] ] 
function decode(code) {
    let header = "Custom Stagelist";

    code = code.replace(/\|/g, "_");
    code = code.replace("#", "");
    let portions = code.replace("n", "|").split("|"); //replace the first n with a |
    let buckets = code.split("_");
    if (portions.length > 1) {
        header = "Custom: " + atob(portions[1]) + "'s Stagelist";
        buckets = portions[0].split("_");
    }
    

    if (!buckets || buckets.length == 0)
        return null;

    let data = [];

    for(let i = 0; i < buckets.length; i++) {
        let bucketList = buckets[i].split("-");
        let bucketData = [];
        for (let j = 0; j < bucketList.length; j++) {
            let stageData = bucketList[j].split(/(\d+)/);
            if (stageData[1] > 0)
                bucketData.push({id: stageData[1], hazardless: (stageData[2] == "h" ? true : false)});
        }
        data.push(bucketData);
    }
    
    if (!(window.location.hash == "" && code == dataMap[Object.keys(dataMap)[0]]))
        window.location.hash = code;

    
    let keys = Object.keys(dataMap);
    for (let i = 0; i < keys.length; i++) {
        if (dataMap[keys[i]] == code) {
            header = keys[i] + "'s Stagelist";
        }
    }
    document.getElementsByTagName("h1")[0].innerHTML = header;

    return data;
}

// Load stage buckets from array of objects
function init(data) {
    let section = document.getElementById("buckets");
    let divs = section.getElementsByTagName("div");
    section.innerHTML = ""; //just, completely nuke the buckets section

    let currBucket = 0;
    while (section.getElementsByTagName("div").length < data.length) {
        // <div id="bucket0" class="has-text-centered"></div><br />
        let newDiv = document.createElement("div");
        newDiv.id = "bucket" + currBucket.toString();
        newDiv.classList.add("has-text-centered");
        section.appendChild(document.createElement("br"));
        section.appendChild(newDiv);
        currBucket += 1;
    }

    let headers = getHeaders(data.length);

    let offset = 0;
    for (let i = 0; i < data.length; i++) {
        // <h2 class="title is-4">Header</h2><stage /><stage />...
        let bucketHeader = document.createElement("h2");
        bucketHeader.classList.add("title", "is-4");
        bucketHeader.innerHTML = headers[i];
        
        let currentBucket = document.getElementById("bucket" + i.toString());
        currentBucket.appendChild(bucketHeader);
        populateStageBucket(currentBucket, data[i], offset);
        offset += data[i].length;
    }
}

function initFromDataMap(key) {
    init(decode(dataMap[key]));
}

let preset = initFromDataMap;

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

//Populate the Inner HTML of one Stage Bucket
function populateStageBucket(bucket, arr, offset) {
    let ret = "";
    for (let i = 0; i < arr.length; i++) {
        /*  <div class="card stage" onmousedown="toggle(i+offset)">
                <img src="./img/(i+offset)(h).jpg" class="hazardless?" />
                <p>Stage Name  ¬</p>
            </div>
        */
        
        let stageDiv = document.createElement("div");
        stageDiv.classList.add("card", "stage");
        stageDiv.onmousedown = function() {
            toggle(i + offset);
        };

        let stageImg = document.createElement("img");
        stageImg.id = "i" + (i + offset).toString();
        stageImg.src = "./img/" + arr[i].id.toString() + (arr[i].hazardless ? "" : "") + ".png";
        if (arr[i].hazardless)
            stageImg.classList.add("hazardless");

        let stageP = document.createElement("p");
        stageP.innerHTML = names[parseInt(arr[i].id)] + (arr[i].hazardless ? " ¬" : "");

        stageDiv.appendChild(stageImg);
        stageDiv.appendChild(stageP);

        bucket.append(stageDiv);
    }
    return ret;
}


//Read stage code from URL, fill stage buckets accordingly. Pull from dataMap otherwise.
function loadFromURL() {
    let urlString = window.location.href;
    let url = new URL(urlString);
    let param = url.searchParams.get("s");
    if (param) {
        window.location.href = "./index.html#" + param;
        return;
    }
    
    let hash = window.location.hash;
    
	if (hash) {
        hash = decode(hash.toString());
        init(hash);
	} else {
		initFromDataMap(Object.keys(dataMap)[0]); //load the first code from the dataMap
	}
}

//Redirect to Creation page, with current stageCode.
function gotoCreate() {
    let stageCode = window.location.hash.replace("#", "");
    if (window.location.hash == "")
        stageCode = dataMap[Object.keys(dataMap)[0]];
    console.log(stageCode);
	window.location.href = "./create.html#" + stageCode;
}