//------ menu script -----
// changing classes like this so the browser wont be re-rendered on added class
var higherPrice = normPrice = false;
function toggleClassMenu(e) {

	myMenu.classList.add("menu-animatable");	
	if(!myMenu.classList.contains("menu-visible")) {		
		myMenu.classList.add("menu-visible");
	} else {
		myMenu.classList.remove('menu-visible');		
	}	
}
function OnTransitionEnd() {
	myMenu.classList.remove("menu-animatable");
}

var myMenu = document.querySelector(".menu");
var oppMenu = document.querySelector(".menu-icon");
myMenu.addEventListener("transitionend", OnTransitionEnd, false);
oppMenu.addEventListener("click", toggleClassMenu, false);
myMenu.addEventListener("click", toggleClassMenu, false);
//------ menu end------
 
var additonalMenuOpener = document.querySelector(".active-filter");
additonalMenuOpener.addEventListener("click", triggerMenuClick, false);
function triggerMenuClick(){
	oppMenu.click();
}

// --------------------
// creating markup for every property/info in a studio
// this would've been optimal with a framework like vue, react or angular
//-------

// get list container
var listContainer = document.getElementById("list-container");
var hardCodedHtmlStudioInfo = [
'<div class="raiting-stars-counter">',
'<svg width="58" height="9" xmlns="http://www.w3.org/2000/svg"><g stroke="#B69F58" stroke-width=".5" fill="none" fill-rule="evenodd"><path fill="#B69F58" d="M4.15 6.545L1.585 7.894l.49-2.856L0 3.015 2.868 2.6 4.15 0l1.283 2.599 2.867.416-2.075 2.023.49 2.856zM16.514 6.545l-2.565 1.349.49-2.856-2.075-2.023L15.23 2.6 16.514 0l1.282 2.599 2.868.416-2.075 2.023.49 2.856zM28.877 6.545l-2.565 1.349.49-2.856-2.075-2.023 2.868-.416L28.877 0l1.283 2.599 2.867.416-2.075 2.023.49 2.856zM41.241 6.545l-2.565 1.349.49-2.856-2.075-2.023 2.868-.416L41.24 0l1.282 2.599 2.868.416-2.075 2.023.49 2.856z"/><path d="M53.605 6.545L51.04 7.894l.49-2.856-2.075-2.023 2.867-.416L53.605 0l1.282 2.599 2.868.416-2.075 2.023.49 2.856z"/></g></svg>',
'<div class="raiting-review-counter">(32)</div>',
'</div>',
'<div class="studio-address faded">Rådmansgatan 46</div>'
].join('');

//----- some stuff for filtering----
var lookup = {};
//items = studioInfo
var result = [];
result.push("Reset filter");
var studioArr = [];

for(node in listData){
	//head node studios

	for (studioNodeName in listData[node]) {
		// set children and add to listContainer

		// create studio node
		var li = document.createElement("li");
		this.li.className = "studio spacer";
		this.li.setAttribute("data-name", studioNodeName)
		//adding to an array to sort/filter when needed
		studioArr.push(this.li);

		var timeSectionDiv = document.createElement("div");
		timeSectionDiv.className = "time-section";
		var appointmentTimeSpan = document.createElement("span");
		appointmentTimeSpan.className = "studio-appointment-time";
		appointmentTimeSpan.innerHTML = "12.00";
		timeSectionDiv.appendChild(appointmentTimeSpan);
		this.li.appendChild(timeSectionDiv);

		var appointmentInfoDiv = document.createElement("div");
		appointmentInfoDiv.className = "studio-appointments-info";

		for(studioProperties in listData[node][studioNodeName]){
			//setting a variable to shortnen name and to use it for filtering
			var studioInfo = listData[node][studioNodeName][studioProperties];

			//doing some filtering on price - two diff values for now
			var price = studioInfo.price;

			if (!(price in lookup) && !(price == null)) {
				lookup[price] = 1;
				result.push(price);
			}

			for(prop in studioInfo){

				if (prop === "name") {
					var studioInfoDiv = document.createElement("div");
					studioInfoDiv.className = "studio-info-section";
					var studioName = document.createElement("h2");
					studioName.className = "studio-name";
					studioName.innerHTML = studioInfo[prop];
					studioInfoDiv.appendChild(studioName);

					var ratingDiv = document.createElement("div");
					ratingDiv.className = "studio-raiting-section";
					ratingDiv.innerHTML = hardCodedHtmlStudioInfo;

					studioInfoDiv.appendChild(ratingDiv);
					this.li.appendChild(studioInfoDiv);
				}

				if (prop === "price") {
					var priceDiv = document.createElement("div");
					priceDiv.className = "studio-appointment-price";
					priceDiv.innerHTML = studioInfo[prop];

					//as i know it's not null i can work without the need to check for null
					if (GetNumberFromString(studioInfo[prop]) == 720) {
							this.li.setAttribute("data-price", "higherRange");
					} 
					if (GetNumberFromString(studioInfo[prop]) == 320) {
						this.li.setAttribute("data-price", "normalRange");
					} 
					appointmentInfoDiv.appendChild(priceDiv);
					
				}
				if (prop === "time") {
					timeSectionDiv.className = "time-section";
					var timeDiv = document.createElement("div");
					timeDiv.className = "studio-appointment-time-length faded";
					timeDiv.innerHTML = studioInfo[prop];
					appointmentInfoDiv.appendChild(timeDiv);
				}

				this.li.appendChild(appointmentInfoDiv);
			}
		}

	// an arrow for accessing the studio
	var studioAccessDiv = document.createElement("div");
	studioAccessDiv.className = "go-to-studio arrow-forward";
	this.li.appendChild(studioAccessDiv);
}
}


//doing only one filter and appending the children to it
var menuFilter = document.querySelector(".hair");
menuFilter.addEventListener("click", returnToStartPage, false)

for (var i = result.length - 1; i >= 0; i--) {
	var filterItemDiv = document.createElement("div");
	filterItemDiv.className = "menu-filter-item spacer";
	filterItemDiv.innerHTML = result[i];
	menuFilter.appendChild(filterItemDiv);
}

 var filterItem = document.querySelector(".menu-filter-container");
 for (var i = 0; elementChildren(filterItem).length > i; i++)
 {
	if(!elementChildren(filterItem)[i].classList.contains("arrow-down")){
		elementChildren(filterItem)[i].addEventListener("click", FilterItems, false)
	   }
 }

			
var activeFilter = document.querySelector(".active-filter");
function FilterItems(e){
	
	switch(GetNumberFromString(e.target.innerHTML)){

		case 720:
		listContainer.innerHTML = "";
		studioArr.forEach(function(el){
			
			if(el.getAttribute("data-price") == "higherRange")
			listContainer.appendChild(el);
		});
		activeFilter.innerHTML ="";
		activeFilter.innerHTML = "Pris 700 - 1000kr"
		break;
		
		case 320:
		listContainer.innerHTML = "";
		studioArr.forEach(function(el){
			
			if(el.getAttribute("data-price") == "normalRange")
			listContainer.appendChild(el);
		});
		activeFilter.innerHTML ="";
		activeFilter.innerHTML = "Pris 200 - 500kr"
		break;

		case 0:
		listContainer.innerHTML = "";
		PopulateFilterList();
		activeFilter.innerHTML ="";
		activeFilter.innerHTML = "Pris 200 - 1000kr"
		break;

		defalut:
		listContainer.innerHTML = "";
		PopulateFilterList();
	}
}

//populate the list
PopulateFilterList();
function PopulateFilterList() {
	studioArr.forEach(function (el) {
		listContainer.appendChild(el);
	});
};

function GetNumberFromString(str){
	if(str.match(/\d+/g) !== null){
	var num = str.match(/\d+/g).map(Number);
	var number = Number(num[0]);
	return number;
}
	return 0;
}

function elementChildren (element) {
    var childNodes = element.childNodes,
        children = [],
        i = childNodes.length;

    while (i--) {
        if (childNodes[i].nodeType == 1) {
            children.unshift(childNodes[i]);
        }
    }
    return children;
}

console.log(window.location.href , "hfr");
function returnToStartPage(){
// if(window.)
}
// accessing individual studios
var accessStudio = document.querySelectorAll(".studio[data-name]");
accessStudio.forEach(function(e){
	
	e.addEventListener("click", getRequestedStudio, false)
})
function getRequestedStudio(e){
	var studio = e.target.closest(".studio");
	if(studio.hasAttribute("data-name")){
	console.log(studio, "etarget");
	}
}