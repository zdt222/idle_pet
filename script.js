// Define your variables here
let resourceCount = parseInt(localStorage.getItem('resourceCount')) || 0;
let petLevel = parseInt(localStorage.getItem('petLevel')) || 1;
let health = 100;
let energy = 100;
let happiness = 100;
let attack = 10;
let defense = 5;
let combatLevel = 1;
let combatExperience = 0;
let gold = 0;

// Define your DOM elements
const petElement = document.getElementById('pet');
const feedButton = document.getElementById('feed');
const playButton = document.getElementById('play');
const levelDisplay = document.getElementById('level');
const resourceCountElement = document.getElementById('resourceCount');
const petImage = document.getElementById('petImage');
const levelDisplaySpan = document.getElementById('levelDisplay');
const healthDisplay = document.getElementById('player-health');
const energyDisplay = document.getElementById('energy');
const happinessDisplay = document.getElementById('happiness');
const attackDisplay = document.getElementById('attackValue');
const defenseDisplay = document.getElementById('defenseValue');
const exploreButton = document.getElementById('explore');
const attackButton = document.getElementById('attackButton');
const combatScreen = document.getElementById('combat-screen');
const combatLevelElement = document.getElementById('combat-level-value');
const combatExperienceElement = document.getElementById('combat-experience-value');


const abilities = [
    {
        name: "Fire Breath",
        description: "Breathes fire on the enemy.",
        effect: () => {
            // Code to execute when this ability is used
        },
        levelRequired: 5, // Pet level required to unlock
        cost: 10, // Cost in some resource (e.g., energy) to unlock
        unlocked: false, // Initially locked
    },
    // Define more abilities...
];

const inventory = [];

const items = [
    {
        id: 1,
        name: "Sword",
        type: "Weapon",
        stats: { attack: 5 },
    },
    {
        id: 2,
        name: "Shield",
        type: "Armor",
        stats: { defense: 3 },
    },
    {
        id: 3,
        name: "Health Potion",
        type: "Consumable",
        effect: { health: 20 },
    },
    // Add more items...
];

function equipItem(index) {
    const item = inventory[index];

    if (item.type === "Weapon") {
        pet.equippedWeapon = item;
    } else if (item.type === "Armor") {
        pet.equippedArmor = item;
    }

    // Remove the item from the inventory
    inventory.splice(index, 1);

    // Update the UI
    displayInventory();
    updateEquippedItemsUI(); // Update the UI to show equipped items
}

function unequipItem(type) {
    if (type === "Weapon") {
        pet.equippedWeapon = null;
    } else if (type === "Armor") {
        pet.equippedArmor = null;
    }

    // Add the unequipped item back to the inventory, if needed
    // Update the UI
    updateEquippedItemsUI();
}

const initialEquipment = [
    { name: 'Sword', type: 'Weapon', attackBonus: 10, defenseBonus: 0 },
    { name: 'Armor', type: 'Armor', attackBonus: 0, defenseBonus: 15 }
];

// Initialize pet's stats
let pet = {
    name: 'Your Pet',
    // Other pet properties
    attack: 10, // Initial attack value
    defense: 5,   // Initial defense value
    equippedWeapon: null,
    equippedArmor: null
};

initialEquipment.forEach(equipment => {
    if (typeof equipment.name !== 'string') {
      throw new Error('Equipment name must be a string');
    }
    if (typeof equipment.type !== 'string') {
      throw new Error('Equipment type must be a string');
    }
    // Add other type checks
  });
  
function displayInventory() {
    // Clear the inventory container
    const inventoryContainer = document.getElementById('inventory');
    inventoryContainer.innerHTML = '';

    // Display the pet's equipment
    initialEquipment.forEach(equipment => {
        const itemElement = document.createElement('div');
        itemElement.textContent = equipment.name;
        // Add more details if needed

        inventoryContainer.appendChild(itemElement);
    });

    // Add other inventory items
    // ...
}

function displayInventory() {
    const inventoryContainer = document.getElementById('inventory');
    inventoryContainer.innerHTML = '';

    inventory.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <h3>${item.name}</h3>
            <p>Type: ${item.type}</p>
            ${item.type === "Consumable" ? '<button onclick="useItem(' + index + ')">Use</button>' : ''}
            ${item.type === "Weapon" || item.type === "Armor" ? '<button onclick="equipItem(' + index + ')">Equip</button>' : ''}
        `;

        inventoryContainer.appendChild(itemElement);
    });
}

// Call this function to initially display the inventory
displayInventory();
const openInventoryButton = document.getElementById('openInventoryButton');
// Button to close the inventory
const closeInventoryButton = document.getElementById('closeInventoryButton');
// Inventory container
const inventoryContainer = document.getElementById('inventoryContainer');

// Event listener to open the inventory
openInventoryButton.addEventListener('click', () => {
    // Show the inventory container
    inventoryContainer.style.display = 'block';
    // Update and display the inventory
    displayInventory();
});

// Event listener to close the inventory
closeInventoryButton.addEventListener('click', () => {
    // Hide the inventory container
    inventoryContainer.style.display = 'none';
});

// Rest of your inventory-related JavaScript logic

// Display inventory function (as described in previous response)
function displayInventory() {
    // Your existing displayInventory() logic
}

function useItem(index) {
    const item = inventory[index];

    if (item.type === "Consumable") {
        // Apply the consumable item's effect to the pet
        applyItemEffect(item);

        // Remove the item from the inventory
        inventory.splice(index, 1);

        // Update the UI
        displayInventory();
        // Update pet stats and UI as needed
    }
}

function applyItemEffect(item) {
    // Implement logic to apply the item's effect to the pet's stats
    // For example, increase health, energy, etc.
}




function updateAbilitiesUI() {
    const abilitiesContainer = document.getElementById('abilities');
    abilitiesContainer.innerHTML = '';

    abilities.forEach((ability, index) => {
        const abilityElement = document.createElement('div');
        abilityElement.innerHTML = `
            <h3>${ability.name}</h3>
            <p>${ability.description}</p>
            <p>Level Required: ${ability.levelRequired}</p>
            <p>Cost: ${ability.cost} Resources</p>
            ${ability.unlocked ? '<button onclick="useAbility(' + index + ')">Use</button>' : '<button onclick="unlockAbility(' + index + ')">Unlock</button>'}
        `;

        abilitiesContainer.appendChild(abilityElement);
    });
}

// Call this function to initially update the UI
updateAbilitiesUI();

function unlockAbility(index) {
    const ability = abilities[index];

    if (petLevel >= ability.levelRequired && resourceCount >= ability.cost) {
        ability.unlocked = true;
        resourceCount -= ability.cost;
        updateAbilitiesUI();
        updateResourceCount(); // Update resource count UI
    } else {
        alert("You don't meet the requirements to unlock this ability.");
    }
}


// Define your state variables
let exploring = false;
let enemy;

// Initialize event listeners when the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    feedButton.addEventListener("click", feedPet);
    playButton.addEventListener("click", playWithPet);
    exploreButton.addEventListener("click", startExploration);
    attackButton.addEventListener("click", attackEnemy);
    updateCombatLevelDisplay();
    updateCombatExperienceDisplay();
});

function displayCombatScreen() {
    combatScreen.style.display = "block";
    updateHealthDisplays();
    // updateHealthBar
    attackButton.disabled = false;
}


function updateGoldDisplay() {
    document.getElementById('goldCount').textContent = gold;
  }
  

  

function attackEnemy() {
    if (exploring && enemy) {
        // Calculate damage and apply to enemy's health
        const damageDealt = Math.max(0, attack - enemy.defense);
        enemy.health -= damageDealt;

        // Check if the enemy is defeated
        if (enemy.health <= 0) {
            // Gain rewards and experience
            resourceCount += 50; // Example reward
            increaseExperience(20); // Example experience gain
            gold += 25; // Gain 25 gold
            
            // Reset exploration and enemy
            exploring = false;
            enemy = null;
            attackButton.disabled = true;
            gold += 25; // Gain 25 gold
  
            updateGoldDisplay();
            // Update UI
            updateResourceCount();
            updatePet();
            hideCombatScreen();
            // ... (other UI updates)

            checkLevelUp(); // Check for level up after defeating an enemy
            increaseCombatExperience(20); // Update combat experience after defeating an enemy
            // ... (other UI updates)
        } else {
            // Enemy attacks back
            const damageReceived = Math.max(0, enemy.attack - defense);
            health -= damageReceived;

            // Update UI
            updateHealthDisplays();
            // ... (other UI updates)

            // Check if the player's pet is defeated
            if (health <= 0) {
                // Handle defeat
                // ... (reset stats, display game over message, etc.)
            }
        }
    }
}


// Initialize UI elements and update initial stats
updateResourceCount();
updatePet();

  

setInterval(idleProgress, 1000);

function updateResourceCount() {
    resourceCountElement.textContent = resourceCount;
    localStorage.setItem("resourceCount", resourceCount);
}

function updatePet() {
    updateAttackDisplay();
    updateDefenseDisplay();
    updateHealthDisplays();
}

function idleProgress() {
    resourceCount += petLevel;
    updateResourceCount();
}

function feedPet() {
    if (resourceCount >= 10) {
        resourceCount -= 10;
        updateResourceCount();
        increaseHappiness(10);
        increaseEnergy(20); // Increase energy when fed
         // Increase happiness
  happiness += 10;
  
  // Update UI
  updateHappinessDisplay();
  
  // Other feed rewards
    }
}

function increaseEnergy(amount) {
    energy = Math.min(energy + amount, 100); // Ensure energy doesn't exceed 100
    updateEnergyDisplay();
}

function playWithPet() {
    if (resourceCount >= 5) {
        resourceCount -= 5;
        updateResourceCount();
        decreaseEnergy(10);
        // Increase happiness
  happiness += 5;

  // Update UI 
  updateHappinessDisplay();

  // Other play rewards
    }
}

function startExploration() {
    if (!exploring && energy >= 20) {
        exploring = true;
        decreaseEnergy(20);
        enemy = generateRandomEnemy();
        displayCombatScreen();
    }
}

function displayCombatScreen() {
    combatScreen.style.display = "block";
    updateHealthDisplays();
    updateHealthBar
    
    attackButton.disabled = false;
}

function hideCombatScreen() {
    combatScreen.style.display = "none";
}


function attackEnemy() {
    if (exploring && enemy) {
        // Calculate damage and apply to enemy's health
        const damageDealt = Math.max(0, attack - enemy.defense);
        enemy.health -= damageDealt;

        // Check if the enemy is defeated
        if (enemy.health <= 0) {
            // Gain rewards and experience
            resourceCount += 50; // Example reward
            increaseExperience(20); // Example experience gain

            // Reset exploration and enemy
            exploring = false;
            enemy = null;
            attackButton.disabled = true;

            // Update UI
            updateResourceCount();
            updatePet();
            hideCombatScreen();
            // ... (other UI updates)
            
            checkLevelUp(); // Check for level up after defeating an enemy
            increaseCombatExperience(20); // Update combat experience after defeating an enemy
            // ... (other UI updates)
        } else {
            // Enemy attacks back
            const damageReceived = Math.max(0, enemy.attack - defense);
            health -= damageReceived;

            // Update UI
            updateHealthDisplays();
            // ... (other UI updates)

            // Check if the player's pet is defeated
            if (health <= 0) {
                // Handle defeat
                // ... (reset stats, display game over message, etc.)
            }
        }
    }
}




function levelUpPet() {
    petLevel++; // Increase pet level
    updatePetLevelUI(); // Update the pet's level in the UI
    updateAbilitiesUI(); // Check for newly unlockable abilities
}

function useAbility(index) {
    const ability = abilities[index];

    if (ability.unlocked) {
        // Execute the ability's effect
        ability.effect();
        // Deduct any additional resource cost, if applicable
        // Update UI, e.g., decrease energy, update health bars, etc.
    } else {
        alert("You must unlock this ability before using it.");
    }
}


function increaseCombatExperience(amount) {
    combatExperience += amount;
    updateCombatExperienceDisplay();

    // Check for combat level up
    checkCombatLevelUp();
}

function updateCombatExperienceDisplay() {
    combatExperienceElement.textContent = combatExperience;
}

function checkCombatLevelUp() {
    const experienceNeededForLevelUp = combatLevel * 100; // Example formula
    if (combatExperience >= experienceNeededForLevelUp) {
        combatLevel++;
        combatExperience = 0; // Reset experience points after level up

        // Update UI and combat stats
        updateCombatLevelDisplay();
        updateCombatStats();

        // ... (other level up rewards or stat increases)
    }
}

function updateCombatLevelDisplay() {
    combatLevelElement.textContent = combatLevel;
}


function updateCombatStats() {
    // Add logic to update combat-related stats, like attack and defense
    attack += 5; // Example stat increase
    defense += 2; // Example stat increase

    // Update UI
    updateAttackDisplay();
    updateDefenseDisplay();
}

const playerHealthBar = document.getElementById('player-health-bar');
const playerHealthFill = document.getElementById('player-health-fill');
const enemyHealthBar = document.getElementById('enemy-health-bar');
const enemyHealthFill = document.getElementById('enemy-health-fill');



function updateHealthDisplays() {
    healthDisplay.textContent = `Health: ${health}`;
    happinessDisplay.textContent = `Happiness: ${happiness}`;

    // Update health bars
    updateHealthBar(playerHealthFill, health);
    if (enemy) {
        updateHealthBar(enemyHealthFill, enemy.health);
        console.log(healthPercentage);
    }
}

function updateHealthBar(healthFill, currentHealth) {
    const healthPercentage = (currentHealth / 100) * 100;
    healthFill.style.width = `${healthPercentage}%`;

    // Customize fill color based on health percentage
    if (healthPercentage > 70) {
        healthFill.style.backgroundColor = '#7FFF00'; // Green
    } else if (healthPercentage > 30) {
        healthFill.style.backgroundColor = '#FFD700'; // Yellow
    } else {
        healthFill.style.backgroundColor = '#FF0000'; // Red
    }
}




function decreaseEnergy(amount) {
    energy = Math.max(energy - amount, 0);
    updateEnergyDisplay();
    if (energy === 0) {
        // Implement logic for handling low energy
    }
}

function increaseHappiness(amount) {
    happiness = Math.min(happiness + amount, 100); // Ensure happiness doesn't exceed 100
    updateHappinessDisplay();
}

function updateHappinessDisplay() {
    happinessDisplay.textContent = `Happiness: ${happiness}%`;
}

function increaseExperience(amount) {
    // Implement experience gain and leveling up
    // ... (update petLevel, stats, etc.)
}

function updateHealthDisplays() {
    healthDisplay.textContent = `Health: ${health}`;
    happinessDisplay.textContent = `Happiness: ${happiness}`; // Update the happinessDisplay content 
} // Add the closing curly brace here

function updateEnergyDisplay() {
    energyDisplay.textContent = `Energy: ${energy}%`;
}

function checkLevelUp() {
    if (resourceCount >= petLevel * 100) {
      petLevel++;
  
      // Give rewards for level up
      attack += 2;
      defense += 1;
      
      // Update UI
      updateAttackDisplay();
      updateDefenseDisplay();
  
      // Other level up rewards
    } 
  }
  

function updateAttackDisplay() {
    attackDisplay.textContent = `Attack: ${attack}`;
}

function updateDefenseDisplay() {
    defenseDisplay.textContent = `Defense: ${defense}`;
}

function generateRandomEnemy() {
    // Generate a random enemy with random stats
    const enemy = {
        health: Math.floor(Math.random() * 100) + 50,
        attack: Math.floor(Math.random() * 10) + 5,
        defense: Math.floor(Math.random() * 5) + 2
    };
    return enemy;
}

// Initialize UI elements and update initial stats
updateResourceCount();
updatePet();
