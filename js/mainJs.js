// JavaScript Document

var searchInput = document.getElementById('searchText');
var allItems = document.getElementsByClassName('item-sub');

$(document).ready(function(){
    $('[ data-toggle="popover"]').popover();   
});

function collapseAll(){
	$('.collapse.item-main').collapse('hide');
}

function searchItem(){
	if(searchInput.value ==''){
		alert("請輸入關鍵字");
		return;
	}
	
	$('.collapse.item-main').collapse('show');
	//$('.collapse.item-sub').collapse('hide');
	 setTimeout(itemShow, 500);
}

function itemShow(){

	for(var i=0;i<allItems.length;i++){
		var itemNameClass = allItems.item(i).getElementsByClassName('item-name');
		var itemName ="";
		if(itemNameClass.length>0){
			itemName =itemNameClass.item(0).innerHTML;
		}
		if(itemName.indexOf(searchInput.value)>=0){
			$(allItems.item(i)).collapse('show');
		}else{
			$(allItems.item(i)).collapse('hide');
		}
	}

}

function cleanSearch(){
	searchInput.value ="";
	collapseAll();
	$('.collapse.item-sub').collapse('show');
}
