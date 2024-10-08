
const container = document.querySelector("#images__container");
const filterButtons = document.querySelectorAll(".btn-filter");

/**
 * 
 * @param {string} category The category name when filtered by category
 */
 async function getImages(category){
    console.log(category);
    
    const options = {
        "Authorization":"rHGspHc1ux8YA2nAfzkvCkSS7Cr6q8K6usZhqaaX5oS16kGo38vtZ7t9",
        "Origin":"*",
       
    }
    let req;
    if(category != null || category != undefined){
        req =  await fetch(`https://api.pexels.com/v1/search?query=${category}`,{   
            headers:options 
        })
    }
    else{
        req =  await fetch("https://api.pexels.com/v1/curated",{
            headers:options
        })
    }
   
    const res =  await req.json();
    // console.log(res);
    
    container.innerHTML = "";
    res.photos.forEach((image) => {
        container.innerHTML += `
        <div class="grid__item imagen"> 
            <div class="overlay"></div>     
            <img src="${image.src.medium}">
            <div class="imagen__info">
                <a target="_blank" href="${image.url}">
                    <h3> &#x2197 ${image.alt} </h3>
                </a>
                <p class="text">
                    <strong>Taken by</strong>: 
                    <a target="_blank" href="${image.photographer_url}"> ${image.photographer} </a>
                 </p>
            </div>
        </div>
        `
    })
}
getImages()








//filter buttons
filterButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {

        //add active class ti button
        filterButtons.forEach((btn => btn.classList.remove("active")))
        btn.classList.add("active")
        
        //If no text  for some reason, select red as category
        const category = btn.textContent == "" ? "red" : btn.textContent;
        
        //get the images    
        container.innerHTML = ""
        getImages(btn.textContent)
    })
})