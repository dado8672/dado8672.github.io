let volume = 100;
let playerHealth = 100;

let pickedHeal = "";

let volumeValue = document.getElementById("volume-value");
let volumeBar = document.getElementById("volume-bar");
let volumeBarFill = document.getElementById("volume-bar-fill");
let volumeBarHandle = document.getElementById("volume-bar-handle");
let playerDisplay = document.getElementById("player-display");
let playerValue = document.getElementById("player-value");
let playerBarFill = document.getElementById("player-bar-fill");
let dialogueBox = document.getElementById("dialogue-box");
let outOfBattle = document.getElementById("out-of-battle");
let inBattleDiv = document.getElementById("in-battle");
let attackSubmenu = document.getElementById("attack-submenu");
let healSubmenu = document.getElementById("heal-submenu");
let targetSubmenu = document.getElementById("target-submenu");

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

function setDialogue(messages) {
    dialogueBox.innerText = messages.join("\n");
}

function shakeSlider() {
    volumeBar.classList.remove("shake");
    setTimeout(function() {
        volumeBar.classList.add("shake");
    }, 10);
}

function updatePlayer() {
    if (playerHealth < 0) {
        playerHealth = 0;
    }
    if (playerHealth > 100) {
        playerHealth = 100;
    }
    playerValue.innerText = playerHealth;
    playerBarFill.style.width = playerHealth + "%";
}

// Battle buttons 
function enterBattle() {
    playerHealth = 100;
    updatePlayer();
    playerDisplay.classList.remove("hidden");
    outOfBattle.classList.add("hidden");
    inBattleDiv.classList.remove("hidden");
    attackSubmenu.classList.add("hidden");
    healSubmenu.classList.add("hidden");
    targetSubmenu.classList.add("hidden");
    setDialogue(["You enter battle with The Volume Slider."]);
}

function submitVolume() {
    inBattleDiv.classList.add("hidden");
    outOfBattle.classList.remove("hidden");
    playerDisplay.classList.add("hidden");
    setDialogue(["You submitted the volume at " + volume + "."]);
}

function showAttackMenu() {
    attackSubmenu.classList.remove("hidden");
    healSubmenu.classList.add("hidden");
    targetSubmenu.classList.add("hidden");
}

function showHealMenu() {
    healSubmenu.classList.remove("hidden");
    attackSubmenu.classList.add("hidden");
    targetSubmenu.classList.add("hidden");
}

// Attack moves 
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

// applies a player attack to the volume slider then runs the slider's turn
function applyAttack(damage, moveName, isCrit) {
    shakeSlider();
    let messages = [];

    let dodged = false;
    let blocked = false;

    if (volume > 0) {
        if (Math.random() < 0.10) {
            dodged = true;
        } else if (Math.random() < 0.30) {
            blocked = true;
        }
    }

    if (dodged) {
        messages.push("The Volume Slider dodged your attack!");
    } else if (blocked) {
        damage = Math.round(damage * 0.6);
        volume = volume - damage;
        updateVolume();
        messages.push("The Volume Slider blocks! " + moveName + " reduced to " + damage + " damage.");
    } else {
        volume = volume - damage;
        updateVolume();
        if (isCrit) {
            messages.push("Critical! " + moveName + " hits for " + damage + " damage!");
        } else {
            messages.push("You attack with " + moveName + " for " + damage + " damage!");
        }
    }

    let sliderMessages = sliderTurn();
    for (let i = 0; i < sliderMessages.length; i++) {
        messages.push(sliderMessages[i]);
    }

    setDialogue(messages);
}

// Heal moves
function pickHeal(which) {
    pickedHeal = which;
    targetSubmenu.classList.remove("hidden");
}

function doHealOnTarget(target) {
    let amount = 0;
    let moveName = "";
    let prayed = false;

    if (pickedHeal === "heal") {
        amount = randomNumber(0, 30);
        moveName = "Heal";
    } else if (pickedHeal === "minor") {
        amount = randomNumber(5, 12);
        moveName = "Minor Heal";
    } else if (pickedHeal === "pray") {
        moveName = "Pray";
        prayed = true;
        if (Math.random() < 0.30) {
            amount = randomNumber(25, 50);
        } else {
            amount = 0;
        }
    }

    let messages = [];

    if (prayed && amount === 0) {
        if (target === "slider") {
            shakeSlider();
        }
        messages.push("Your prayer was not answered.");
    } else if (target === "self") {
        playerHealth = playerHealth + amount;
        updatePlayer();
        messages.push("You heal yourself for " + amount + ".");
    } else {
        shakeSlider();
        let dodged = false;
        let blocked = false;

        if (volume > 0) {
            if (Math.random() < 0.10) {
                dodged = true;
            } else if (Math.random() < 0.30) {
                blocked = true;
            }
        }

        if (dodged) {
            messages.push("The Volume Slider dodged your heal!");
        } else if (blocked) {
            amount = Math.round(amount * 0.6);
            volume = volume + amount;
            updateVolume();
            messages.push("The Volume Slider blocks! " + moveName + " reduced to " + amount + ".");
        } else {
            volume = volume + amount;
            updateVolume();
            messages.push("You heal The Volume Slider for " + amount + ".");
        }
    }

    targetSubmenu.classList.add("hidden");

    let sliderMessages = sliderTurn();
    for (let i = 0; i < sliderMessages.length; i++) {
        messages.push(sliderMessages[i]);
    }

    setDialogue(messages);
}


// Slider's turn
function sliderTurn() {
    let messages = [];
    let roll = Math.random();

    if (roll < 0.60) {
        let pick = randomNumber(1, 4);
        let moveName = "";
        let damage = 0;
        let isCrit = false;

        if (pick === 1) {
            damage = randomNumber(13, 20);
            isCrit = Math.random() < 0.10;
            moveName = "Slash";
        } else if (pick === 2) {
            damage = randomNumber(5, 15);
            isCrit = Math.random() < 0.40;
            moveName = "Fireball";
        } else if (pick === 3) {
            damage = randomNumber(25, 35);
            isCrit = Math.random() < 0.05;
            moveName = "Heavy Strike";
        } else {
            damage = randomNumber(3, 7);
            moveName = "Jab";
        }

        if (isCrit) {
            damage = damage * 2;
        }

        playerHealth = playerHealth - damage;
        updatePlayer();

        if (isCrit) {
            messages.push("Critical! The Volume Slider hits you with " + moveName + " for " + damage + " damage!");
        } else {
            messages.push("The Volume Slider attacks you with " + moveName + " for " + damage + " damage!");
        }

        if (playerHealth <= 0) {
            messages.push("You were defeated! The Volume Slider has recovered to 100.");
            volume = 100;
            updateVolume();
            playerDisplay.classList.add("hidden");
            inBattleDiv.classList.add("hidden");
            outOfBattle.classList.remove("hidden");
        }

    } else if (roll < 0.80) {
        let pick = randomNumber(1, 3);
        let amount = 0;
        let moveName = "";

        if (pick === 1) {
            amount = randomNumber(0, 30);
            moveName = "Heal";
            volume = volume + amount;
            updateVolume();
            messages.push("The Volume Slider casts " + moveName + " on itself for " + amount + ".");
        } else if (pick === 2) {
            amount = randomNumber(5, 12);
            moveName = "Minor Heal";
            volume = volume + amount;
            updateVolume();
            messages.push("The Volume Slider casts " + moveName + " on itself for " + amount + ".");
        } else {
            moveName = "Pray";
            if (Math.random() < 0.30) {
                amount = randomNumber(25, 50);
                volume = volume + amount;
                updateVolume();
                messages.push("The Volume Slider casts " + moveName + " on itself for " + amount + ".");
            } else {
                messages.push("The Volume Slider's prayer was not answered.");
            }
        }

    } else {
        messages.push("The Volume Slider does nothing.");
    }

    return messages;
}

updateVolume();
updatePlayer();