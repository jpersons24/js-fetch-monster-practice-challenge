// VARIABLES

const monsterForm = document.querySelector('#monster-form')
const monContainer = document.querySelector('#monster-container')



// FUNCTIONS AND LOGIC


function renderMonster(monster) {
   
   monContainer.innerHTML += 
      `<ul class="monster-list" data-id="${monster.id}">
         <li>${monster.name}
            <ul>
               <li>Age: ${monster.age}</li>
               <li>Description: ${monster.description}</li>
            </ul>
         </li>
      </ul>`
}


function getOneMonster(allMonsters) {
   allMonsters.forEach(monster => {
      // console.log(monster)
      renderMonster(monster)
   })
}


// NETWORK REQUESTS


function getAllMonsters() {
   fetch("http://localhost:3000/monsters/?_limit=50")
   .then(response => response.json())
   .then(allMonsters => {
      getOneMonster(allMonsters)
   })
}

getAllMonsters()


function createNewMonster(newObj) {
   fetch("http://localhost:3000/monsters", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newObj)
   })
}



// EVENT LISTENERS


monsterForm.addEventListener('submit', function(event) {
   event.preventDefault()
   console.log(event.target)

   let name = event.target.name.value
   let age = event.target.age.value
   let description = event.target.description.value
   
   let newObj = {
      name: name,
      age: age,
      description: description
   }

   console.log(newObj)
   createNewMonster(newObj)
   event.target.reset()
})