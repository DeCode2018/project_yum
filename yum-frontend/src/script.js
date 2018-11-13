document.addEventListener('DOMContentLoaded', function(){
  getRecipes();
  document.addEventListener('submit',function(event){
    event.preventDefault();
    createNewRecipe();

  })
})

  function getRecipes(){
    fetch(`http://localhost:3000/api/v1/recipes`)
      .then(res => res.json())
        .then(data => {
          data.forEach(recipe => {
            createRecipeCard(recipe)
          })
      	})
  }

  function createRecipeCard(recipe){
    let findYumContainer = document.getElementById('yum_container')
    let yum_card = document.createElement('div')
    yum_card.setAttribute('id',`yum_card_${recipe.id}`)
    yum_card.setAttribute('class',`yum_card`)
    findYumContainer.appendChild(yum_card)
    yum_card.addEventListener('click',function(event){
      createRecipeIngredientsSection(recipe)
    })
    createRecipeCardName(recipe)
  }

  function createRecipeCardName(recipe){
    let findYumCard = document.getElementById(`yum_card_${recipe.id}`)
    let yum_card_name = document.createElement('h2')
    yum_card_name.setAttribute('class','yum_name')
    findYumCard.appendChild(yum_card_name)
    yum_card_name.innerHTML = recipe.name
    createRecipeCardImage(recipe)
  }

  function createRecipeCardImage(recipe){
    findYumCard = document.getElementById(`yum_card_${recipe.id}`)
    yum_card_image = document.createElement('img')
    findYumCard.appendChild(yum_card_image)
    yum_card_image.src = recipe.image_url
    createDeleteFunction(recipe)
  }

  function createDeleteFunction(recipe){
    //create delete icon
    findYumCardtop = document.getElementById(`yum_card_${recipe.id}`)
    trash_can_image_button = document.createElement('button')
    findYumCardtop.appendChild(trash_can_image_button)
    trash_can_image_button.setAttribute('class',"btn btn-default btn-lg")
    trash_can_image_span = document.createElement('span')
    trash_can_image_button.appendChild(trash_can_image_span)
    trash_can_image_span.setAttribute('class','glyphicon glyphicon-trash')
    trash_can_image_span.setAttribute('aria-hidden','true')

    //post
    trash_can_image_button.addEventListener('click', function(event){

      fetch(`http://localhost:3000/api/v1/recipes/${recipe.id}`, {
        method: "DELETE"
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        document.querySelector(`#yum_card_${recipe.id}`).remove()
      })
    })
  }

  function createRecipeIngredientsSection(recipe){
    let findIngredientsContainer = document.getElementById(`ingredients_container`)
    findIngredientsContainer.innerHTML = ''
    let ingredientsHeader = document.createElement('h2')
    findIngredientsContainer.appendChild(ingredientsHeader)
    ingredientsHeader.innerHTML = "INGREDIENTS"
    let yum_card_ingredients = document.createElement('li')
    yum_card_ingredients.setAttribute('id',`yum_card_ingredients_${recipe.id}`)
    ingredientsHeader.appendChild(yum_card_ingredients)
    yum_card_ingredients.innerHTML = recipe.ingredients
    createRecipeInstructionsSection(recipe)
  }

  function createRecipeInstructionsSection(recipe){
    let findCardIngredients = document.getElementById(`yum_card_ingredients_${recipe.id}`)
    let instructionsHeader = document.createElement('h2')
    findCardIngredients.appendChild(instructionsHeader)
    instructionsHeader.innerHTML = "INSTRUCTIONS"
    let yum_card_instructions = document.createElement('li')
    yum_card_instructions.setAttribute('id',`yum_card_instructions_${recipe.id}`)
    instructionsHeader.appendChild(yum_card_instructions)
    yum_card_instructions.innerHTML = recipe.instructions
    createRecipeCookTimeSection(recipe)
  }

  function createRecipeCookTimeSection(recipe){
    let findCardInstructions = document.getElementById(`yum_card_instructions_${recipe.id}`)
    let cookTimeHeader = document.createElement('h2')
    findCardInstructions.appendChild(cookTimeHeader)
    cookTimeHeader.innerHTML = "COOK TIME"
    let yum_card_cook_time = document.createElement('li')
    yum_card_cook_time.setAttribute('id','yum_card_cook_time')
    cookTimeHeader.appendChild(yum_card_cook_time)
    yum_card_cook_time.innerHTML = recipe.cook_time
  }

  function createNewRecipe(){
    let recipe = {
      // make sure to change the variable names here and on the form for clarity.

      name: recipe_name.value,
      image_url: recipe_image.value,
      ingredients: recipe_ingredients.value ,
      instructions: recipe_instructions.value,
      cook_time: recipe_cook_time.value

    }
      fetch(`http://localhost:3000/api/v1/recipes`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
          body: JSON.stringify({recipe})
        })
        .then(response => response.json())
        .then(res => {

          createRecipeCard(res)

        })
      }
