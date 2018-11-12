document.addEventListener('DOMContentLoaded', function(){
  getRecipes();
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
    createRecipeCardName(recipe)
  }

  function createRecipeCardName(recipe){
    let findYumCard = document.getElementById(`yum_card_${recipe.id}`)
    yum_card_name = document.createElement('h2')
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
  }
