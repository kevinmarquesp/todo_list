let listArr;
let getLocalStorage = localStorage.getItem("New_Todo");

if( getLocalStorage == null ) {
	listArr = new Array();
} else {
	listArr = JSON.parse(getLocalStorage);
}

const listBox = document.querySelector("ul#list_box");





class Item {
	constructor(text) {
		this.value = text;
		this.done = false;
	}
}

function reloadList() {
	let itemsTags = "";

	listArr.forEach( (element, index) => {
		let done = element.done ? "done" : "";

		itemsTags += `<li class="${done}">
		<div class="remove_button" onclick="remove(${index})"></div>
		<div class="edit_button" onclick="edit(${index})"></div>
			<div class="text_content">
				<p>
					${element.value}
				</p>
			</div>
		</li>`
	} );
	listBox.innerHTML = itemsTags;

	if( itemsTags ) {
		const items = document.querySelectorAll("li");
		const itemsText = document.querySelectorAll("div.text_content");
		
		listArr.forEach( (element, key) => {
			itemsText[key].onclick = () => {
				if( element.done ) {
					element.done = false;
				} else {
					element.done = true;
				}
				localStorage.setItem( "New_Todo", JSON.stringify(listArr) );
				reloadList();
			}
		} );
	}
}

function remove(key) {
	listArr.splice( key, 1 );
	localStorage.setItem( "New_Todo", JSON.stringify(listArr) );
	reloadList();
}

function edit(key) {
	let newValue = prompt( "Editar este item:" );
	if( newValue ) {
		listArr[key].value = newValue;
		localStorage.setItem( "New_Todo", JSON.stringify(listArr) );
		reloadList()
	}
}





let prefixKey;
document.onkeydown = (key) => {
	if( prefixKey == "ShiftLeft" && key.code == "KeyN" ) {
		let newValue = prompt("Adicionar um novo item:");
		if( newValue ) {
			listArr.push( new Item(newValue) );
			localStorage.setItem( "New_Todo", JSON.stringify(listArr) );
			reloadList();
		}
	} else {
		prefixKey = key.code;
	}
};

reloadList();
