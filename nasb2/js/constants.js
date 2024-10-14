let dataMap = {};
let indexToInit = 1;

let names = [
    "None",
    "Angry Beavers' Dam",
    "Bun Wrestling Ring",
    "Chum Bucket",
    "City Aquarium",
    "Clockwork's Lair", // 5
    "Conch Street",
    "Fire Masters Meeting",
    "The Flying Dutchman's Ship",
    "Food Dream",
    "Hardcore Chores", // 10
    "Harmonic Convergence",
    "Irken Armada Invasion",
    "Jellyfish Fields",
    "Jimmy's Lab",
    "Loud Castle", // 15
    "Messy Kitchen",
    "Miracle City Volcano",
    "Pariah's Keep",
    "Reptar's Ruins",
    "Rooftop Rumble", // 20
    "Royal Woods Cemetary",
    "Sewers Slam",
    "Technodrome Takedown",
    "The Timeless Stardial",
    "Training", // 25
    "Tremorton Joyride",
    "Western Air Temple",
    "Wild Savannah"
];

let whitelist = [
    "None",
    "Food Dream",
    "Irken Armada Invasion",
    "Jellyfish Fields",
    "Miracle City Volcano",
    "Pariah's Keep",
    "Rooftop Rumble",
    "Technodrome Takedown",
    "The Timeless Stardial",
    "Tremorton Joyride"
]

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

dataMap["Universal 1v1 Ruleset"] = "13-9-20-24-26_18-17-12-13";