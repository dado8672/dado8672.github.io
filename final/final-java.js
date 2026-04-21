let volume = 100;

let volumeValue = document.getElementById("volume-value");
let volumeBar = document.getElementById("volume-bar");
let volumeBarFill = document.getElementById("volume-bar-fill");
let volumeBarHandle = document.getElementById("volume-bar-handle");
let dialogueBox = document.getElementById("dialogue-box");
let outOfBattle = document.getElementById("out-of-battle");
let inBattleDiv = document.getElementById("in-battle");
let attackSubmenu = document.getElementById("attack-submenu");
let healSubmenu = document.getElementById("heal-submenu");



function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateVolume() {
    if (volume < 0) {
        volume = 0;
    }
    if (volume > 100) {
        volume = 100;
    }
    volumeValue.innerText = volume;
    volumeBarFill.style.width = volume + "%";
    volumeBarHandle.style.left = volume + "%";
}

function setDialogue(text) {
    dialogueBox.innerText = text;
}

function shakeSlider() {
    volumeBar.classList.remove("shake");
    setTimeout(function() {
        volumeBar.classList.add("shake");
    }, 10);
}


// ===== Battle buttons =====

function enterBattle() {
    outOfBattle.classList.add("hidden");
    inBattleDiv.classList.remove("hidden");
    attackSubmenu.classList.add("hidden");
    healSubmenu.classList.add("hidden");
    setDialogue("You enter battle with The Volume Slider.");
}

function runAway() {
    inBattleDiv.classList.add("hidden");
    outOfBattle.classList.remove("hidden");
    setDialogue("You fled the battle.");
}

function showAttackMenu() {
    attackSubmenu.classList.remove("hidden");
    healSubmenu.classList.add("hidden");
}

function showHealMenu() {
    healSubmenu.classList.remove("hidden");
    attackSubmenu.classList.add("hidden");
}


//  Attack moves 

function doSlash() {
    let damage = randomNumber(13, 20);
    // 10% chance to crit
    if (Math.random() < 0.10) {
        damage = damage * 2;
        applyAttack(damage, "Slash", true);
    } else {
        applyAttack(damage, "Slash", false);
    }
}

function doFireball() {
    let damage = randomNumber(5, 15);
    // 40% chance to crit
    if (Math.random() < 0.40) {
        damage = damage * 2;
        applyAttack(damage, "Fireball", true);
    } else {
        applyAttack(damage, "Fireball", false);
    }
}

function doHeavyStrike() {
    let damage = randomNumber(25, 35);
    // 5% chance to crit
    if (Math.random() < 0.05) {
        damage = damage * 2;
        applyAttack(damage, "Heavy Strike", true);
    } else {
        applyAttack(damage, "Heavy Strike", false);
    }
}

function doJab() {
    let damage = randomNumber(3, 7);
    applyAttack(damage, "Jab", false);
}

// applies damage to the volume slider, with dodge/block chance
function applyAttack(damage, moveName, isCrit) {
    shakeSlider();

    // the slider can only dodge or block when it has health
    if (volume > 0) {
        // 10% chance to dodge
        if (Math.random() < 0.10) {
            setDialogue("The Volume Slider dodged your attack!");
            return;
        }
        // 30% chance to block
        if (Math.random() < 0.30) {
            damage = Math.round(damage * 0.6);
            volume = volume - damage;
            updateVolume();
            setDialogue("The Volume Slider blocks! " + moveName + " reduced to " + damage + " damage.");
            return;
        }
    }

    volume = volume - damage;
    updateVolume();

    if (isCrit) {
        setDialogue("Critical! " + moveName + " hits for " + damage + " damage!");
    } else {
        setDialogue("You attack with " + moveName + " for " + damage + " damage!");
    }
}


//  Heal moves

function doHeal() {
    let amount = randomNumber(0, 30);
    applyHeal(amount, "Heal");
}

function doMinorHeal() {
    let amount = randomNumber(5, 12);
    applyHeal(amount, "Minor Heal");
}

function doPray() {
    // 30% chance to actually work
    if (Math.random() < 0.30) {
        let amount = randomNumber(25, 50);
        applyHeal(amount, "Pray");
    } else {
        shakeSlider();
        setDialogue("Your prayer was not answered.");
    }
}

// applies healing to the volume slider, with dodge/block chance
function applyHeal(amount, moveName) {
    shakeSlider();

    if (volume > 0) {
        // 10% chance to dodge
        if (Math.random() < 0.10) {
            setDialogue("The Volume Slider dodged your heal!");
            return;
        }
        // 30% chance to block
        if (Math.random() < 0.30) {
            amount = Math.round(amount * 0.6);
            volume = volume + amount;
            updateVolume();
            setDialogue("The Volume Slider blocks! " + moveName + " reduced to " + amount + ".");
            return;
        }
    }

    volume = volume + amount;
    updateVolume();
    setDialogue("You heal The Volume Slider for " + amount + ".");
}


updateVolume();