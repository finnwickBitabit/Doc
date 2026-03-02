Create a React component called CharacterDossier that demonstrates state management and API integration with the Rick & Morty API. Follow these implementation steps:

1. INITIAL SETUP:
- In CharacterDossier.jsx, fetch character data from: https://rickandmortyapi.com/api/character/1 (Rick Sanchez)
- Create and initialize these four state variables from the API response:
  * name (string)
  * status (string) 
  * image (string)
  * isDead (boolean) - derived from status === "Dead"

2. UI COMPONENTS:
Build a character card that displays:
- Character image
- Character name
- Current status (Alive/Dead)

3. INTERACTIVE FEATURES:
Add these interactive elements:

A) Character Search:
- Create a number input field for character ID
- Add a "Fetch Character" button that:
  * Takes the ID from input
  * Fetches from: https://rickandmortyapi.com/api/character/{ID}
  * Updates all four state variables with new data

B) Status Toggle:
- Add a "Toggle Status" button that:
  * Switches status between "Alive" and "Dead"
  * Updates isDead boolean accordingly

4. CONDITIONAL STYLING:
When isDead === true:
- Change card background to gray
- Apply CSS grayscale filter to the character image
- This visually represents deceased characters

API Reference: https://rickandmortyapi.com/api/character/1

*Many thanks to ->
'DeepSeek' + 'Replit' for bringing this project to life.*

