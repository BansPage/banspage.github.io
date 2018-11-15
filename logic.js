function toggle(id) {
    let img = document.getElementById("i" + id.toString());
    if (img.classList.contains("struck")) {
        img.classList.remove("struck");
    } else {
        img.classList.add("struck");
    }
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



function init(data) {
    let section = document.getElementById("buckets");
    let divs = section.getElementsByTagName("div");
    for (let i = 0; i < divs.length; i++) {
        divs[i].innerHTML = "";
    }
    for (let i = divs.length - 1; i >= 2; i--) {
        section.removeChild(divs[i]);
    }
    let currBucket = 2;
    while (section.getElementsByTagName("div").length < data.length) {
        let newDiv = document.createElement("div");
        newDiv.id = "bucket" + currBucket.toString();
        section.appendChild(newDiv);
        currBucket += 1;
    }

    let headers = getHeaders(data.length);
    if (!headers) {
        headers = [];
        for (let i = 0; i < data.length; i++) {
            headers.push("Bucket " + (i + 1).toString());
        }
    }
    let offset = 0;
    for (let i = 0; i < data.length; i++) {
        let htmlString = "<h2>" + headers[i] + "</h2>\n";
        htmlString += getInnerHtml(data[i], offset);
        offset += data[i].length;
        document.getElementById("bucket" + i.toString()).innerHTML = htmlString;
    }

    document.getElementsByTagName("h1")[0].innerHTML = "Custom Stagelist";
}

function initFromDataMap(ind) {
    init(decode(dataMap[ind]));
    document.getElementsByTagName("h1")[0].innerHTML = "Smash Bros Stage Striking";
}

function getHeaders(len) {
    if (len == 1) {
        return ["Starters"];
    } else if (len == 2) {
        return ["Starters", "Counterpicks"];
    }
    return undefined;
}

function getInnerHtml(arr, offset) {
    let ret = "";
    for (let i = 0; i < arr.length; i++) {
        let s = "<div class=\"stage\"><img id=\"i" + (i + offset).toString() + "\" onmousedown=\"toggle(" + (i + offset).toString() + ")\" ";
        if (arr[i].hazardless) {
            s += "class=\"hazardless\" ";
        }
        s += "src=\"https://www.smashbros.com/assets_v2/img/stage/stage_thumb" + arr[i].id.toString() + ".jpg\" />\n";
        s += "<p>" + names[parseInt(arr[i].id)] + (arr[i].hazardless ? "" : "") + "</p></div>\n"; //removed symbol as it was redundant here
        ret += s;
    }
    return ret;
}

