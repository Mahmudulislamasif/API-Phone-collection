const detailsDiv=document.getElementById('details-div');
const mainDiv=document.getElementById('main-div')
// Search Button to fetch data
document.getElementById('search-button').addEventListener('click',function()
{
    const searchText=document.getElementById('search-text');
    const searchTextValue=searchText.value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchTextValue}`)
    .then(response=>response.json())
    .then(data=>displayPhone(data.data))
})
// Function for search button
const displayPhone=(collectData)=>
{
  // Error handle for unexpected input
  if(collectData.length==0)
  {
    alert('Please Enter Valid String')
    document.getElementById('count-phone').innerText='0';
    mainDiv.innerHTML=''
    detailsDiv.innerHTML=''
  }
  // Show data one by one in content
  else
  {
 
  const first20Mobile=collectData.slice(1,21);
  mainDiv.innerHTML=''
  detailsDiv.innerHTML=''
  let count=0;
  first20Mobile.forEach(newdata=>
    {
          const div=document.createElement('div');
          div.classList.add('col-12','col-md-4')
          div.innerHTML=`
          <div class="card shadow-lg rounded card-color" style="width: 18rem;">
          <img src="${newdata.image}" class="card-img-top w-50 mx-auto m-3" alt="...">
          <div class="card-body">
              <p class="card-text"><span>Brand:</span> ${newdata.brand}</p>
              <p class="card-text"><span>Phone Name:</span> ${newdata.phone_name}</p>
              <button class="btn btn-primary" onclick="getId('${newdata.slug}')">See details</button>
          </div>
         </div>
          `
          count++
          
          mainDiv.appendChild(div)
          document.getElementById('count-phone').innerText=count;
         
    })
  }
 
  }

const getId=(collectId)=>
{
  fetch(`https://openapi.programming-hero.com/api/phone/${collectId}`)
  .then(anotherRes=>anotherRes.json())
  .then(newData=>getDetailsById(newData.data))
}
const getDetailsById=(collectSlug)=>
{
      
          const createDiv=document.createElement('div');
          detailsDiv.innerHTML=''
          createDiv.innerHTML=`
          <div class="card shadow-lg mx-auto m-2 p-2" style="width: 18rem;">
          <img src="${collectSlug.image}" class="card-img-top w-50 mx-auto m-3" alt="...">
          <div class='m-2'>
          <div>
          <h5 class="card-text">${collectSlug.brand}</h5>
          <p class="card-text"><span>Release Date:</span>${collectSlug.releaseDate? collectSlug.releaseDate:'No result found'}</p>
          </div>
          <div class="mt-2">
          <h5><span>Main Features<span></h5>
          <p class="card-text"><span>Storage:</span>${collectSlug.mainFeatures.storage}</p>
          <p class="card-text"><span>DisplaySize:</span>${collectSlug.mainFeatures.displaySize}</p>
          <p class="card-text"><span>Chip Set:</span>${collectSlug.mainFeatures.chipSet}</p>
          <p class="card-text"><span>Memory:</span>${collectSlug.mainFeatures.memory}</p>
          <p class="card-text"><span>Sensors:</span>${collectSlug.mainFeatures.sensors}</p>
          </div>
          <h5>Others:</h5>
          <p class="card-text"><span>WLAN:</span>${collectSlug.others?.WLAN??"No"}</p>
          <p class="card-text"><span>Bluetooth:</span>${collectSlug.others?.Bluetooth??"No"}</p>
          <p class="card-text"><span>GPS:</span>${collectSlug.others?.GPS??"No"}</p>
          <p class="card-text"><span>NFC:</span>${collectSlug.others?.NFC??"No"}</p>
          <p class="card-text"><span>Radio:</span>${collectSlug.others?.Radio??"No"}</p>
          <p class="card-text"><span>USB:</span>${collectSlug.others?.USB??"No"}</p>
          </div>
          </div>
          `
          detailsDiv.appendChild(createDiv);
    } 
   
    
