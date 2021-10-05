let dataMap = {};
let indexToInit = 1;

const names = [
	"None", "Battlefield", "Big Battlefield", "Final Destination", "Peach's Castle", "Kongo Jungle", "Hyrule Castle", "Super Happy Tree", "Dream Land",
	"Saffron City", "Mushroom Kingdom", "Princess Peach's Castle", "Rainbow Cruise", "Kongo Falls", "Jungle Japes", "Great Bay", "Temple", "Brinstar", "Yoshi's Island (Melee)",
	"Yoshi's Story", "Fountain of Dreams", "Green Greens", "Corneria", "Venom", "Pokemon Stadium", "Onett", "Mushroom Kingdom II", "Brinstar Depths", "Big Blue",
	"Fourside", "Delfino Plaza", "Mushroomy Kingdom", "Figure-8 Circuit", "WarioWare, Inc.", "Bridge of Eldin", "Norfair", "Frigate Orpheon", "Yoshi's Island (Brawl)",
	"Halberd", "Lylat Cruise", "Pokemon Stadium 2", "Port Town Aero Dive", "Castle Siege", "Distant Planet", "Smashville", "New Pork City", "Summit", "Skyworld",
	"Shadow Moses Island", "Luigi's Mansion", "Pirate Ship", "Spear Pillar", "75m", "Mario Bros.", "Hanenbow", "Green Hill Zone", "3D Land", "Golden Plains", "Paper Mario",
	"Gerudo Valley", "Spirit Train", "Dream Land GB", "Unova Pokemon League", "Prism Tower", "Mute City SNES", "Magicant", "Arena Ferox", "Reset Bomb Forest", "Tortimer Island",
	"Balloon Fight", "Living Room", "Find Mii", "Tomodachi Life", "PictoChat 2", "Mushroom Kingdom U", "Mario Galaxy", "Mario Circuit", "Skyloft", "The Great Cave Offensive",
	"Kalos Pokemon League", "Coliseum", "Flat Zone X", "Palutena's Temple", "Gamer", "Garden of Hope", "Town and City", "Wii Fit Studio", "Boxing Ring", "Gaur Plain", "Duck Hunt",
	"Wrecking Crew", "Pilotwings", "Wuhu Island", "Windy Hill Zone", "Wily Castle", "PAC-LAND", "Super Mario Maker", "Suzaku Castle", "Midgar", "Umbra Clock Tower",
	"New Donk City Hall", "Great Plateau Tower", "Moray Towers", "Dracula's Castle", "Mementos", "Yggdrasil's Altar", "Spiral Mountain", "King of Fighters Stadium", "Garreg Mach Monastery",
	"Spring Stadium", "Small Battlefield", "Minecraft World", "Northern Cave", "Cloud Sea of Alrest", "Mishima Dojo", "Hollow Bastion"
];

let whitelist = [
    "None", "Battlefield", "Final Destination", "Dream Land", "Yoshi's Story", "Fountain of Dreams", "Pokemon Stadium",
    "WarioWare, Inc.", "Yoshi's Island (Brawl)", "Lylat Cruise", "Pokemon Stadium 2", "Smashville", "Unova Pokemon League",
    "Kalos Pokemon League", "Town and City", "Midgar", "Small Battlefield", "Northern Cave", "Skyloft", "Yggdrasil's Altar",
    "Rainbow Cruise", "Frigate Orpheon", "Halberd", "Castle Siege", "Wuhu Island", "Wily Castle", "Mementos", "Hollow Bastion"
];

//Set id "presets" to the list of stagelists from DataMap.
function populateCommunityList() {
    let keys = Object.keys(dataMap);
    let presets = document.getElementById("presets"); //get navbar presets div
    for (let i = 0; i < keys.length; i++) {
        // <a class="navbar-item" href="javascript:initFromDataMap(keys[i])">Someone's Stagelist</a>
        let presetItem = document.createElement("a");
        presetItem.classList.add("navbar-item");
        presetItem.href = "javascript:preset('" + keys[i] + "')";
        presetItem.innerHTML = keys[i] + "'s Stagelist";
        presets.appendChild(presetItem);
    }
}

function enableNavbarBurgers() {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
        // Add a click event on each of them
        $navbarBurgers.forEach( el => {
            el.addEventListener('click', () => {
                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
            });
        });
    }
}

dataMap["Super Smash Con 2021"] = "1h-3h-44h-40h-85h_79h-39h-110h-19h"
dataMap["EVO 2019"] = "1h-3h-40h-44h-85h_79h-39h-37h-19h"
dataMap["Genesis 6"] = "1h-44h-40h-3h-39h_62h-42h-85h-19h-79h-37h";
dataMap["California"] = "79h-44h-40h-37h-3h-85h-1h";
dataMap["Collision"] = "1h-3h-44h-40h-85h_62h";
dataMap["MISU (Ori)"] = "1h-3h-44h-40h-85h_79h-39h-19h";
dataMap["Smashfield"] = "1h-3h-44h-40h-85h_79h-39h-19h";
dataMap["DownB (Minnesota Smash)"] = "1h-3h-44h-37h-40h_42h-79h-85h";
dataMap["Bourbon (Kentucky)"] = "1h-3h-79h-40h-44h_37h-85h-19h-44";
dataMap["Ottawa"] = "1h-3h-24h-44h-85h_19h-37h-62h-79h";
dataMap["Philly"] = "24h-44h-85h-3h-1h_39h-79h-40h";
dataMap["PhillyTriples"] = "98h-3h-40h_2h-89h-79h-104h-85h-105h";
dataMap["Xanadu"] = "1h-44h-24h-3h-39h_62h-79h-85h";
dataMap["ACU (All Charged Up)"] = "1h-3h-40h-44h-85h_39h-62h-79h";
dataMap["Items - Alpharad Spring Items 2020"] = "96-98-83-63-104_73-33-84-71-13-66-79";
