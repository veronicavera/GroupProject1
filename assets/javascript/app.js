
$(document).ready(function(){

loadCocktailMenu();

$('#cocktailMenu').on('click',function(){
    loadCocktailMenu()
})
$(document.body).on('click','#searchByName',function(){
    $('#display').html('');
    $('#display').append('<input id="cocktailNameInput">');
    $('#display').append('<button id="searchCocktailByInputName">Search cocktail by Name</button>');
})
$(document.body).on('click','#searchByAlcohol',function(){
    $('#display').html('');
    $('#display').append('<input id="alcoholInput">');
    $('#display').append('<button id="searchCocktailByInputAlcohol">Search cocktail by alcohol</button>');
})
$(document.body).on('click','#searchByGlass',function(){
    $('#display').html('');
    var call='https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list';
    $.ajax({
        url: call,
        method: 'GET'
      }).then(function(callback) {
          console.log(callback)
          for(var i=0;i<callback.drinks.length;i++){
              var glassButton=$('<button>');
              glassButton.append(callback.drinks[i].strGlass);
              glassButton.attr('data-glass',callback.drinks[i].strGlass);
              glassButton.attr('class','buttonGlass');
              $('#display').append(glassButton);
          }
        })
})
$(document.body).on('click','#searchByCategory',function(){
    $('#display').html('');
    var call='https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    $.ajax({
        url: call,
        method: 'GET'
      }).then(function(callback) {
          console.log(callback)
          for(var i=0;i<callback.drinks.length;i++){
              var categoryButton=$('<button>');
              categoryButton.append(callback.drinks[i].strCategory);
              categoryButton.attr('data-category',callback.drinks[i].strCategory);
              categoryButton.attr('class','cocktailCategory');
              $('#display').append(categoryButton);
          }
        })
})
$(document.body).on('click','#getRandomCocktail',function(){
    $('#display').html('');
    for(i=0;i<5;i++){
        random();    
    }
})
$(document.body).on('click','.cocktailCategory',function(){
    var call='https://www.thecocktaildb.com/api/json/v1/1/filter.php?c='+$(this).attr('data-category');
    $.ajax({
        url: call,
        method: 'GET'
      }).then(function(callback) {
        $('#display').html('');
          for(var i=0;i<callback.drinks.length;i++){
            var cocktailDiv=`<div class='cocktail' data-id=${callback.drinks[i].idDrink}>${callback.drinks[i].strDrink} <img src=${callback.drinks[i].strDrinkThumb} width=200px></div>`
            $('#display').append(cocktailDiv);
            }
        })
})
$(document.body).on('click','.buttonGlass',function(){
    var call='https://www.thecocktaildb.com/api/json/v1/1/filter.php?g='+$(this).attr('data-glass');
    $.ajax({
        url: call,
        method: 'GET'
      }).then(function(callback) {
        $('#display').html('');
          for(var i=0;i<callback.drinks.length;i++){
            var cocktailDiv=`<div class='cocktail' data-id=${callback.drinks[i].idDrink}>${callback.drinks[i].strDrink} <img src=${callback.drinks[i].strDrinkThumb} width=200px></div>`
            $('#display').append(cocktailDiv);
            }
        })
})

$(document.body).on('click','#searchCocktailByInputName',function(){
    $('#display').append('<input id="cocktailNameInput">');
    $('#display').append('<button id="searchCocktailByInputName">Search cocktail by Name</button>');
    var call='https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+$('#cocktailNameInput').val();
    $('#display').html('');
    console.log(call)
    $.ajax({
        url: call,
        method: 'GET'
      }).then(function(callback) {
          console.log(callback)
          for(var i=0;i<callback.drinks.length;i++){
              var cocktailDiv=`<div class='cocktail' data-id=${callback.drinks[i].idDrink}>${callback.drinks[i].strDrink} <img src=${callback.drinks[i].strDrinkThumb} width=200px></div>`
              $('#display').append(cocktailDiv)
          }
        })
})

$(document.body).on('click','#searchCocktailByInputAlcohol',function(){
    
    $('#display').append('<input id="alcoholInput">');
    $('#display').append('<button id="searchCocktailByInputAlcohol">Search cocktail by alcohol</button>');

    var call='https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='+$('#alcoholInput').val();
    $('#display').html('');
    $.ajax({
        url: call,
        method: 'GET'
      }).then(function(callback) {
          console.log(callback)
          for(var i=0;i<callback.drinks.length;i++){
              var cocktailDiv=`<div class='cocktail' data-id=${callback.drinks[i].idDrink}>${callback.drinks[i].strDrink} <img src=${callback.drinks[i].strDrinkThumb} width=200px></div>`
              $('#display').append(cocktailDiv)
          }
       
      });

})
$(document.body).on('click','.cocktail',function(){
    $('#display').html('');
    var call='https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='+$(this).attr('data-id');
    $.ajax({
        url: call,
        method: 'GET'
      }).then(function(callback) {
          console.log(callback)
         var cocktailFullDiv=$('<div>');
         cocktailFullDiv.append(`<img src=${callback.drinks[0].strDrinkThumb} width=300px>`);
         cocktailFullDiv.append(`<h3>Name: ${callback.drinks[0].strDrink}</h3>`);
         cocktailFullDiv.append(`<h4>Type: ${callback.drinks[0].strAlcoholic}</h4>`);
         cocktailFullDiv.append(`<h4>Glass: ${callback.drinks[0].strGlass}</h4>`);
         cocktailFullDiv.append(`<h4>Category: ${callback.drinks[0].strCategory}</h4>`);
         if(callback.drinks[0].strIngredient1){cocktailFullDiv.append(`<h4>Ingredient 1: ${callback.drinks[0].strMeasure1} ${callback.drinks[0].strIngredient1}</h4>`)};
         if(callback.drinks[0].strIngredient2){cocktailFullDiv.append(`<h4>Ingredient 2: ${callback.drinks[0].strMeasure2} ${callback.drinks[0].strIngredient2}</h4>`)};
         if(callback.drinks[0].strIngredient3){cocktailFullDiv.append(`<h4>Ingredient 3: ${callback.drinks[0].strMeasure3} ${callback.drinks[0].strIngredient3}</h4>`)};
         if(callback.drinks[0].strIngredient4){cocktailFullDiv.append(`<h4>Ingredient 4: ${callback.drinks[0].strMeasure4} ${callback.drinks[0].strIngredient4}</h4>`)};
         if(callback.drinks[0].strIngredient5){cocktailFullDiv.append(`<h4>Ingredient 5: ${callback.drinks[0].strMeasure5} ${callback.drinks[0].strIngredient5}</h4>`)};
         if(callback.drinks[0].strIngredient6){cocktailFullDiv.append(`<h4>Ingredient 6: ${callback.drinks[0].strMeasure6} ${callback.drinks[0].strIngredient6}</h4>`)};
         if(callback.drinks[0].strIngredient7){cocktailFullDiv.append(`<h4>Ingredient 7: ${callback.drinks[0].strMeasure7} ${callback.drinks[0].strIngredient7}</h4>`)};
         cocktailFullDiv.append(`<h4>Instructions: ${callback.drinks[0].strInstructions}</h4>`);
         $('#display').append(cocktailFullDiv)
        console.log(cocktailFullDiv)      
      });
  })



})
function loadCocktailMenu(){
    $('#display').html('');
    $('#display').append(`<div class='square' id='searchByName'>Search by name</div>`);
    $('#display').append(`<div class='square' id='searchByAlcohol'>Search by alcohol</div>`);
    $('#display').append(`<div class='square' id='searchByGlass'>Search by glass</div>`);
    $('#display').append(`<div class='square' id='searchByCategory'>Search by categoty</div>`);
    $('#display').append(`<div class='square' id='getRandomCocktail'>Get 5 random Cocktails</div>`);
}
function random(){
    var call='https://www.thecocktaildb.com/api/json/v1/1/random.php';
    $.ajax({
        url: call,
        method: 'GET'
      }).then(function(callback) {
        
          for(var i=0;i<callback.drinks.length;i++){
            var cocktailDiv=`<div class='cocktail' data-id=${callback.drinks[i].idDrink}>${callback.drinks[i].strDrink} <img src=${callback.drinks[i].strDrinkThumb} width=200px></div>`
            $('#display').append(cocktailDiv);
            }
        })
}