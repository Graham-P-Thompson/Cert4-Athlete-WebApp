// Graham Thompson Skills assessment Task Three 02/05/2023
/**
 * Skills assessment task three.
 * @version 1.0
 * @author Graham Thompson
 */

let athletesNames = [];
let athletesHeightInCm = [];

/**
 * Function to add input into both arrays.
 * @param {string} name 
 * @param {number} height 
 */
function GetAthletesDetails(name, height){
    //Changed all characters to lower case for integrity of data.
    name = name.toLowerCase();

    if (athletesNames.length < 5 && athletesHeightInCm.length < 5){

        athletesNames.push(name);
        athletesHeightInCm.push(height);

        // Copy both arrays to save the original corresponding values before names array is sorted.
        let orgAthletesNames = Array.from(athletesNames);
        let orgAthletesHeights = Array.from(athletesHeightInCm);

        athletesNames.sort();
        
        MapHeightArrayToSortedNameArray(orgAthletesNames, orgAthletesHeights);

        DisplayOutcome("Added successfully.");
        UpdateTable();
    }
    else{
        DisplayOutcome("Array is full.");
    }
}

/**
 * Function to map the heights array to the sorted names array.
 * @param {Array} orgAthletesNames 
 * @param {Array} orgAthletesHeights 
 */
function MapHeightArrayToSortedNameArray(orgAthletesNames, orgAthletesHeights){
    for (orgName of orgAthletesNames){
        // for each value of copied names array, find the matching value in the sorted array.
        for (sortedName of athletesNames){
            if (orgName === sortedName){
                // Get index of name in unsorted name array to then be able to find the position of the matching height.
                let idxOfNameInOrg = orgAthletesNames.indexOf(orgName);
                // Get value of height at that index in original height array.
                let orgHeightValue = orgAthletesHeights[idxOfNameInOrg];
                // Get index of current name in sorted name array to find the position to add the height value.
                let idxOfNameInSorted = athletesNames.indexOf(sortedName);
                // Add the original height value from the copied array to the height array.
                athletesHeightInCm[idxOfNameInSorted] = orgHeightValue;
            }
        }
    }
}

/**
 * Function to get the index of an athelete name in names array.
 * @param {string} name 
 * @returns {number}
 */
function GetAthleteIndex(name){
    //indexOf method returns -1 if value is not found.
    let indexOfName = athletesNames.indexOf(name);

    return indexOfName;
}

/**
 * Function to remove an data from both arrays. 
 * @param {string} name 
 */
function RemoveAthlete(name){
    if (BinarySearch(name)){
        let indexOfName = GetAthleteIndex(name);
        athletesNames.splice(indexOfName, 1);
        athletesHeightInCm.splice(indexOfName, 1);
        UpdateTable();
        DisplayOutcome("Removed successfully.");
    }
    else{
        DisplayOutcome("Not found");
    }
}

/**
 * Function to perform binary search on the name array.
 * @param {string} name 
 * @returns {boolean} true if name is found, false if not found.
 */
function BinarySearch(name){
    // set initial array boundaries.
    let left = 0;
    let right = athletesNames.length - 1;
    let middle = 0;

    while (right >= left){
        // Find the middle of the sub section of array on each iteration.
        middle = left + Math.floor((right - left) / 2);

        if (athletesNames[middle] === name){
            return true;
        }
        // Discard top half of the array by reducing value of right to lower than middle.
        else if (athletesNames[middle] > name){
            right = middle - 1;
        }
        // Discard lower half of the array by increasing left to higher than middle.
        else if (athletesNames[middle] < name){
            left = middle + 1;
        }
    }
    return false;
}

/**
 * Function to check for whitespace being entered.
 * @param {string} inputName 
 * @returns {boolean} returns true if whitespace is found, false if not.
 */
function  CheckForWhiteSpace(inputName){
    // I have used this instead of .trim becasue if only whitespace was input
    // it would get trimmed and saved in the array and could not be removed.
    for (let i = 0; i < inputName.length; i++){
        if (inputName[i] === " "){
            return true;
        }
    }
    return false;
}

// Functions to handle interactions with the DOM.

/**
 * Function to get name and height input.
 */
function OnSaveSubmit(){
    let inputName = document.getElementById("name").value;
    let inputHeight = document.getElementById("height").value;

    if (inputName !== "" && !CheckForWhiteSpace(inputName) && inputHeight !== ""){
        GetAthletesDetails(inputName, inputHeight);
    }
    else{
        DisplayOutcome("Input is required in both the 'name' and 'height' fields or whitespace is detected.");
    }
}

/**
 * Function to handle interaction with the find button.
 */
function OnFindSubmit(){
    let inputName = document.getElementById("name").value;
    inputName = inputName.toLowerCase();

    if (inputName !== ""){
        RemoveAthlete(inputName)
    }
    else{
        DisplayOutcome("Input is required in the 'name' field");
    }
}

/**
 * Function to display a message to the user of the website regarding the input entered.
 * @param {string} message 
 */
function DisplayOutcome(message){
    document.getElementById("outcome").innerHTML = message;
}

/**
 * Function to update the table each time a change is made to the arrays.
 */
function UpdateTable(){
    // Get values from both arrays and display them in the table fields.
    for (let i = 0; i < athletesNames.length; i++){
        document.getElementById(i).innerHTML = athletesNames[i];
        document.getElementById(i + 10).innerHTML = athletesHeightInCm[i];
    }

    // Remove values displayed in fields that are no longer in the arrays.
    // Row id's=0-4 to match array index, .length will be 1 higher than index.
    for (let i = athletesNames.length; i < 5; i++){
        document.getElementById(i).innerHTML = "";
        document.getElementById(i + 10).innerHTML = "";
    }
}

const save = document.getElementById("save");
const find = document.getElementById("find");

save.addEventListener("click", OnSaveSubmit);
find.addEventListener("click", OnFindSubmit);