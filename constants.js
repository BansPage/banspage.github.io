let dataMap = [];
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
	"New Donk City Hall", "Great Plateau Tower", "Moray Towers", "Dracula's Castle"
];

let whitelist = [
    "Battlefield", "Final Destination", "Kongo Jungle", "Dream Land", "Rainbow Cruise", "Kongo Falls", "Brinstar", "Yoshi's Story", "Fountain of Dreams", "Pokemon Stadium", "Delfino Plaza",
    "WarioWare, Inc.", "Norfair", "Frigate Orpheon", "Yoshi's Island (Brawl)", "Halberd", "Lylat Cruise", "Pokemon Stadium 2", "Castle Siege", "Smashville", "Unova Pokemon League", "Prism Tower",
    "Arena Ferox", "PictoChat 2", "Skyloft", "Kalos Pokemon League", "Gamer", "Town and City", "Duck Hunt", "Wuhu Island", "Pilotwings", "Wily Castle", "Super Mario Maker", "Midgar",
    "Umbra Clock Tower", "New Donk City Hall", "Dracula's Castle"
];

const smashadelphia = "1h-44h-3h-40h-33h-36h-85h|19h-37h-94h-79h-66h-12h-77h"
const xanadu = "1h-3h-39h-44h-40h|33h-77h-66h-42h-85h-79h-36h";
const twogg = "1h-3h-40h-44h-79h-37h-39h|85h-42h-83h-33h-36h-66h";
const ori = "1-3-44-37-40h-20-39h|85-42h-36h-77h-66h-79h-17h"


dataMap.push(smashadelphia);
dataMap.push(xanadu);
dataMap.push(twogg);
dataMap.push(ori);