// globar variables

const menuLinks = document.querySelector(".menu");

const publishedContentDiv = document.querySelector(".con");

const formBtn = document.querySelector('.insterPostBtn');

const input = document.querySelector('#input');

const date = new Date();

let resoredPostData = "";

let sideBar = document.querySelector("#sideBar ul");



/*
	 helper functions
*/

const postLoop = (data)=>{


		const fragment = document.createDocumentFragment();

		for(info of data){

			let paragraph = document.createElement('div');
				
			paragraph.innerHTML += `<p>${info.input}</p><p>${info.date}</p>`;
				
			 fragment.appendChild(paragraph);

			 publishedContentDiv.appendChild(fragment);

		}

}

/*
	 main functions


*/


// Menu 

const menuClick = (event) => {

		let listItems = document.querySelectorAll(".menu li");

		// add class active to menu Item

		for(let listItem of listItems ){
			if(listItem.innerHTML === event.target.innerHTML){
				event.target.classList.add("active");
			} else{
				listItem.classList.remove("active");
			}

		}

		// add Content
		
		if(event.target.innerHTML === "Places to visit"){

			getNews("/news").then(function(data){

					publishedContentDiv.innerHTML = `<p> ${data.postContent} </p>`

			});
		
		

			

	} else if(event.target.innerHTML ==="Articles") {

		getArticles("/articles").then(function(data){

					publishedContentDiv.innerHTML = `<p> ${data.postContent} </p>`

			});


	} else {

				getPosts("/posts").then(function(data){

				publishedContentDiv.innerHTML ="";
							
				postLoop(data);

});




	}
}

/*
	
	Sidebar

*/

const moveSideBar = () => {


	const contentElem = document.querySelector("#intro");

	const conLocationTop = contentElem.getBoundingClientRect().top;

	const conLocationBottom = contentElem.getBoundingClientRect().bottom;
	
	let ht = conLocationBottom - conLocationTop;
	// console.log(conLocationTop);

	console.log(conLocationTop);
	console.log(conLocationBottom);


	//change sideBar location based on scrollBar

	let header = document.querySelector('header');

	let headerLocation = header.getBoundingClientRect().top;

	sideBarLocation = sideBar.getBoundingClientRect().top;

	sideBar.style.top = -headerLocation; 

	sideBar.style.margin = "15px 0 0 0";

	// side bar helight

	const sections = document.querySelectorAll("section"); 
	

	for(section of sections){
		
		let sectionTop	= section.getBoundingClientRect().top;
		
		let sectionBottom = section.getBoundingClientRect().bottom;
		
		let sectionHeight = sectionBottom - sectionTop;

		let sideBarLinks = document.querySelectorAll("#sideBar li");

		if( sectionTop  > -80 && sectionTop <= 20 || sectionBottom  > 0 && sectionBottom <= 150) {
			
			for(let link of sideBarLinks){

				
				if(section.getAttribute("id") === link.getAttribute(["data-nav"])){
				
					link.classList.add("act");			
				
				} else {
				
					link.classList.remove("act");
				}
		 }
		}
	}

	}


// click function sideBar


const sideBarScroll = (event)=>{

	const introElem = document.querySelector("#intro");
	
	const contentElem = document.querySelector("#publish");

	const popularArticles = document.querySelector("#popularArticles");



	if(event.target.textContent === "Intro"){
	
		introElem.scrollIntoView({behavior:"smooth"});

	}

	else if(event.target.textContent === "Posts"){

		
		contentElem.scrollIntoView({behavior:"smooth"});



	}  else {
	
		popularArticles.scrollIntoView({behavior:"smooth"});

	} 
}


sideBar.addEventListener("click",sideBarScroll);

// get news Data to publish on the page 
const getNews = async (url) => {
	const response =  await fetch(url);
	
	try{
			
			const data = await response.json();
			
			return data;
				
			}	catch(error){

				console.log("error is" + error);
			}

}


// get articles data to publish on the page
const getArticles = async (url) => {
	
	const response =  await fetch(url);
	
	try{
			
			const data = await response.json();
			
			return data;
	
			}	catch(error){

				console.log("error is" + error);
			}

}

/*

	Insert Posts

*/


//insert posts on page load 

const insertPostLoad = () =>{

		getPosts("/posts").then(function(data){
			
			if(data.length >= 1 ){
				
				postLoop(data);
			
		} 

		// add class active on load 

		document.querySelector(".menu li").classList.add("active");



});
	}

//insert Post  per click 

const insertPost = (event) =>{

	let addedPosts = [];
	
	event.preventDefault();

	// post data to server by the client user
	
	postData("/input",{input:input.value,date:date});


	// add content to section content 

	addedPosts.push({input:input.value,date:date});

	postLoop(addedPosts);

	input.value ="";
}




// post the client info 
const postData =async (url,data= {} )=>{
	const response = await fetch(url,{
		method:"POST",
		credentials:"same-origin",
		headers:{
			"Content-type":"application/json"
		},
		body:JSON.stringify(data)
	});
	try{
		const data = await response.json();
		return data;
	} catch(error) {
		console.log("error is " + error);
	}
}

// get posts here

const getPosts = async (url) =>{
	
	const response = await fetch(url);
	
	try{
		
		const data = await response.json()
		
		console.log(data);
		
		return data;
	
	}	catch(error) {
	
			console.log("error is " + error);
	
	}

}

const sendToLink =  async () =>{
	
	const response = await fetch("/grammy");
	
	try{
		
		const data = await response.json();

	} catch(error) {
		
		console.log(error);
	}
}

// Events

menuLinks.addEventListener("click",menuClick);

// click event to insert post

formBtn.addEventListener('click',insertPost);

document.addEventListener('DOMContentLoaded',insertPostLoad);

// sideBar event 

document.addEventListener('scroll',moveSideBar);

// event to add another page 

document.querySelector("#grammy").addEventListener("click",sendToLink);