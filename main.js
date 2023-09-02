$(document).ready(() => {
   data("").then(() => {
       $("#loader").fadeOut(1000)
       $(".side-nav-menu").removeClass("opacity-0")
       $("#search").removeClass("z-1")
       $("body").removeClass("overflow-hidden");
   })
})

////////////////////// Clear form //////////////////
 
  function clearName(){
    $("#searchName").val("")
}

function clearFl(){
    $('#searchFirst').val("")
}

////////////////////// End clear form //////////////////

///////////////////////Nav/////////////////////

function openSideNav() {
    $(".side-nav-menu").animate({left: 0}, 500)
    $(".open").fadeOut(300,()=>{
    $(".close").fadeIn(300)})
    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({ top: 0},(i + 4) * 100)
    }
}

function closeSideNav() {
    let Width = $(".side-nav-menu .nav-tab").outerWidth()
        $(".side-nav-menu").animate({ left: -Width}, 500)
        $('.close').fadeOut(200, () => {
        $('.open').fadeIn(200)})
        $(".links li").animate({top: 300},500)
}closeSideNav()

$(".click").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})

////////////////////// End Nav //////////////////


/////////////////////Main//////////////////////

 async function data(){
    $("#search,#contact").hide()
    let data =  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let res = await data.json()
    mainApi(res.meals)
 }


 function mainApi(main) {
    let intro = ``
    for (let i = 0; i < main.length ; i++) {
        intro += `
        <div class="col-md-3 display overflow-hidden">
        <div onclick="getDetails(${main[i].idMeal})" class = "position-relative layerUp">
        <img src="${main[i].strMealThumb}" class = "w-100 rounded-2" alt="">
        <div class="bg-layer rounded w-100  align-items-center position-absolute rounded-2">
         <h3 class="ps-3">${main[i].strMeal}</h3>
        </div>
       </div>
       </div>`
    $('#display').html(intro)    
    }
 }

 ////////////////////// End Main //////////////////

 ////////////////////// Details //////////////////

 async function getDetails(idMeal) {
   $("#loader").fadeIn(300)
   $('#main, #searchResult ,#search ,#category,#area,.ingredients, #cat2,#contact').fadeOut(500, () => {
       $("#details").fadeIn(200)
   })
   let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
   let finalRes = await res.json()
   displayDetails(finalRes)
   $("#loader").fadeOut(300)
}


 function displayDetails(x) {
   let details = ``

   details += `
   <i onclick="closeDet()" class="fa-solid fa-xmark fa-xl position-relative"></i>
   <div class="col-md-4">
   <div class="mealImg rounded">
    <img src="${x.meals[0].strMealThumb}" class="w-100 rounded" alt="">
   </div>
   <h2 class="mealTitle">${x.meals[0].strMeal}</h2>
</div>
<div class="col-md-8">
   <h2>Instructions</h2>
   <p>${x.meals[0].strInstructions}</p>
   <h3>Area: <span>${x.meals[0].strArea}</span></h3>
   <h3>Category: <span>${x.meals[0].strCategory}</span></h3>
   <h3>Recipes:</h3>
   <div class="recipes  p-0">
       <ul class="d-flex p-0 flex-wrap">

           <li class="btn btn-info me-3 mb-2 "><span>${x.meals[0].strMeasure1}</span> ${x.meals[0].strIngredient1}</li>
           <li class="btn btn-info me-3 mb-2 "><span>${x.meals[0].strMeasure2}</span> ${x.meals[0].strIngredient2}</li>
           <li class="btn btn-info me-3 mb-2 "><span>${x.meals[0].strMeasure3}</span> ${x.meals[0].strIngredient3}</li>
           <li class="btn btn-info me-3 mb-2 "><span>${x.meals[0].strMeasure4}</span> ${x.meals[0].strIngredient4}</li>
           <li class="btn btn-info me-3 mb-2 "><span>${x.meals[0].strMeasure5}</span> ${x.meals[0].strIngredient5}</li>
           <li class="btn btn-info me-3 mb-2 "><span>${x.meals[0].strMeasure6}</span> ${x.meals[0].strIngredient6}</li>
       </ul>
   </div>
   <h3>Tags:</h3>
   <div class="tags">
       <ul class="d-flex p-0 w-auto  flex-wrap">
           <li class="alert alert-danger ">${x.meals[0].strTags}</li>
       </ul>
   </div>
   <div class="links">
       <a class="btn btn-success me-2" href="${x.meals[0].strSource}" target="_blank">Source</a>
       <a class="btn btn-danger" href="${x.meals[0].strYoutube}" target="_blank">Youtube</a>
   </div>
</div>
`
   $(".det").html(details)
}

 function closeDet() {
    $("#loader").fadeIn(500)
    $('#details, #searchResult , #search ,#category , #cat2, #area, #ingredients, #ingred,#ingred2 , #category , #cat2, #contact ').fadeOut(500, () => {
        $("#loader").fadeOut(300, () => {
            $("#main").fadeIn(300)
        })
    })
    
}

////////////////////// End Details //////////////////

////////////////////// setCategory //////////////////

$("#cat").click(async function() {
    closeSideNav()
    $("#loader").fadeIn(500)
    $(' #searchResult, #search, #area,  #main , #ingredients, #details, #cat2,#ingred,#ingred2,#contact').fadeOut(500, () => {
        $("#category").fadeIn(300)
    })
    $("#loader").fadeOut(500)
    let Category = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let resCat = await Category.json()
    displayCat(resCat.categories)
    
})

////////////////////// getCategory //////////////////

  function displayCat(getCat) {
    let blackBox = ``
    for (let i = 0; i < getCat.length; i++) {
    blackBox +=`<div class="col-md-3 catDis">
    <div onclick="getCategoryMeals('${getCat[i].strCategory}')" class=" meal img position-relative overflow-hidden rounded-2 cursor-pointer">
        <img src="${getCat[i].strCategoryThumb}" alt="">
        <div class="bg-layer2 rounded w-100  p-2  text-center d-flex flex-column align-items-center justify-content-center position-absolute">
             <h3>${getCat[i].strCategory}</h3>
             <p>${getCat[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
         </div>
    </div>
</div> `

$("#catDis").html(blackBox)
  }
}


async function getCategoryMeals(strCategory) {
    $("#loader").fadeIn(500)
    $('#search , #category, #area, #ingredients,#contact,#cat2').fadeOut(500, () =>{
        $("#loader").fadeOut(500, ()=>{
             $("#main").fadeIn(300);
        })
    })
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`)
    let final = await response.json()
    mainApi(final.meals.slice(0, 20))
}

////////////////////// END Category //////////////////


////////////////////// setIngred //////////////////


$("#ingredd").click( async function (){
    closeSideNav()
    $("#loader").fadeIn(500)
    $(' #searchResult, #search, #area, #main ,#category, #cat2, #ingred2,#details,#contact').fadeOut(500, () => {
        $("#loader").fadeOut(500, ()=>{
            $("#ingred").fadeIn(300)
        })
    })
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let final = await response.json()
    ingredFilter(final.meals.slice(0 , 20))
})

////////////////////// getIngred //////////////////

function ingredFilter(ingred) {
    let =  showIngred = ``
    for (let i = 0; i < ingred.length; i++) {
      showIngred += ` 
      <div class="col-md-3 text-center">
                <div onclick="getIngredientsMeals('${ingred[i].strIngredient}')">
                    <i class="fa-solid text-white fa-drumstick-bite fa-4x"></i>
                        <h3>${ingred[i].strIngredient}</h3>
                        <p>${ingred[i].strDescription.split(" ").slice(0 , 20).join(" ")}</p>
                    </div>
                </div>
        </div>
        </div>
     `
        $("#ingrediants").html(showIngred)
    }
}


async function getIngredientsMeals(strIngredient) {
    $("#loader").fadeIn(300)
    $(' #searchResult, #search, #area, #category,  #cat2, #ingred,#contact,#ingred2').fadeOut(500, () => {
        $("#loader").fadeOut(300,()=>{
            $("#main").fadeIn(200)
        })
    })
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${strIngredient}`)
    let final = await response.json()
    mainApi(final.meals.slice(0 , 20))
}

////////////////////// End Ingred //////////////////

////////////////////// getArea //////////////////

$("#areaBtn").click( async function (){
    closeSideNav()
    $("#loader").fadeIn(300)
    $(' #searchResult, #search, #main ,#category, #cat2, #ingred2,#ingred,#details,#contact').fadeOut(500, () => {
        $("#loader").fadeOut(300,()=>{
            $("#area").fadeIn(200)
        })
    })
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let final = await response.json()
    getArea(final.meals)
})

////////////////////// setArea //////////////////

async function getArea(x){
    let blackBox = ``
    for (let i = 0; i < x.length; i++) {
        blackBox += `
        <div class="col-md-3 text-center arr">
        <div onclick="setArea('${x[i].strArea}')">
            <i class="fa-solid text-white  fa-house-laptop fa-4x"></i>
            <h3>${x[i].strArea}</h3>
        </div>
    </div>
        `
        $("#showArea").html(blackBox)
    }
}


async function setArea(strA) {
    $("#loader").fadeIn(300)
    $(' #searchResult, #search, #area,#area2 #main ,#category, #cat2, #ingred2,#ingred,#details').fadeOut(500, () => {
        $("#loader").fadeOut(300,()=>{
            $("#main").fadeIn(200)
        })
    })
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${strA}`)
    let final = await response.json()
    mainApi(final.meals.slice(0 , 20))
}

////////////////////// End Area //////////////////

////////////////////// search //////////////////

$('#searchbtn').click(() => {
    closeSideNav()
    $("#loader").fadeIn(500)
    $('#main ,#contactUs, #category,.ingredients,#area,.mealDetails, #cat2, #ingred2,#ingred,#details,#contact').fadeOut(500, () => {
        $("#loader").fadeOut(500 , () =>{
             $('#search').fadeIn(100)
        })
    })
    
})

$("#searchName").change( () => {
    let searchNameVal = $("#searchName").val()
    searchByName(searchNameVal)
    clearName()
})


////////////////////// setSearch //////////////////

async function searchByName(searchNameVal) {
    $("#loader").fadeIn(500)
    $(' #area, #searchNres , #category, #cat2, #ingred2 , #ingred, #details').fadeOut(500, () => {
        $("#loader").fadeOut(300, ()=>{
            $("#main").fadeIn(500,)
        })
    })
    let searchRes = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchNameVal}`)
    let finalSRes = await searchRes.json()
    mainApi(finalSRes.meals.slice(0 , 20))
}



$("#searchFirst").change( () => {
    let searchfVal = $("#searchFirst").val()
    searchByfName(searchfVal)
    clearFl()
})


async function searchByfName(searchfVal) {
    $("#loader").fadeIn(500)
    $(' #area, #searchNre , #category, #cat2, #ingred2 , #ingred, #details').fadeOut(500, () => {
        $("#loader").fadeOut(300, ()=>{
             $("#main").fadeIn(500)
        })  
    })

    let searchRes = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchfVal}`)
    let finalSRess = await searchRes.json()
    mainApi(finalSRess.meals.slice(0 , 20))
}

////////////////////// getcontact//////////////////

$('#contactBtn').click(() => {
    closeSideNav()
    $("#loader").fadeIn(500)
    $(' #main , #category,.ingredients,#area,.mealDetails, #cat2, #ingred2,#ingred,#details,#search,#searchNres').fadeOut(500, () => {
        $('#contact').fadeIn(300)
        $("#loader").fadeOut(500)
    })

})


let Name = document.getElementById("User");
let Email = document.getElementById("uEmail");
let Password = document.getElementById("password");
let phone = document.getElementById("phoneN");
let Age = document.getElementById("age");
let rePass = document.getElementById("rePassword");
let nAlert = document.getElementById("nameAlert")
let sumbit = document.getElementById("submitBtn")


let nameRegex = /^[A-Za-z_ ]{1,}$/
function vaildName(){
    if(nameRegex.test(Name.value)){
        return true
    }else{
        return false
    }
}


Name.onkeyup = function(){
    if(vaildName()){
        document.getElementById("nameAlert").classList.replace("d-block", "d-none")
    }else{
        document.getElementById("nameAlert").classList.replace("d-none", "d-block")
    }
    submited()
}


let emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
function vaildEmail(){
    if(emailRegex.test(Email.value)){
        return true
    }else{
        return false
    }
}


Email.onkeyup = function(){
    if(vaildEmail()){
        document.getElementById("emailAlert").classList.replace("d-block", "d-none")
    }else{
        document.getElementById("emailAlert").classList.replace("d-none", "d-block")
    }
    submited()
}


let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
function vaildPhone(){
    if(phoneRegex.test(phone.value)){
        return true
    }else{
        return false
    }
}


phone.onkeyup = function(){
    if(vaildPhone()){
        document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
    }else{
        document.getElementById("phoneAlert").classList.replace("d-none", "d-block")
    }
}


let ageRegex = /^(1[89]|[2-9][0-9])$/
function vaildage(){
    if(ageRegex.test(Age.value)){
        return true
    }else{
        return false
    }
}


Age.onkeyup = function (){
    if(vaildage()){
        document.getElementById("ageAlert").classList.replace("d-block", "d-none")
    }else{
        document.getElementById("ageAlert").classList.replace("d-none", "d-block")
    }
    submited()
}



let passRegex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
function vaildPass(){
    if(passRegex.test(password.value)){
        return true
    }else{
        return false
    }
}


password.onkeyup = function(){
    if(vaildPass()){
        document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
    }else{
        document.getElementById("passwordAlert").classList.replace("d-none", "d-block")
    }
    submited()
}


   rePass.onkeyup = function(){
    if(password.value == rePass.value){
        document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
    }else{
        document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")
    }
    submited()
}

function submited() {
    if ( vaildName() && vaildEmail() && vaildPass() && password.value == rePass.value && vaildage()) {
        document.getElementById("submitBtn").removeAttribute("disabled")
    }else{
        document.getElementById("submitBtn").setAttribute("disabled", true)
    }
}

////////////////////// End Contact //////////////////