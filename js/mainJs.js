// JavaScript Document
$.ajax({url: "https://lavenderxxxxx.github.io/imgList.json", success: function(result){
			var imgList = result;
			/*
			for(var group = 0;group<imgList.length;group++){
				var groupHtml= 	'<button class="btn btn-primary" type="button" onclick="collapseAll()" data-toggle="collapse" data-target=".btn:hover +a+.collapse" aria-expanded="false">'+
								imgList[group][0]+
								'</button> <a href='+
								'"'+imgList[group][1]+'"'+
								' class="badge badge-warning">shop</a>'+
								'<div class="collapse item-main multi-collapse show">'+
								'<div class="h20"></div>'+
								'<div class="contentArea">'+
								'<hr class="hr-table">';
				for(var a = 2 ; a<imgList[group].length;a++){
					groupHtml+='<div class="row collapse item-sub multi-collapse show">'+
								'<div class="item-num col-4">'+(a-1)+'</div>'+
								'<div class="col-8">'+
								'<a class="item-name" tabindex="0" role="button" data-toggle="popover" data-placement="auto" data-trigger="focus" data-html="true" data-content='+
								'"<img src=img/'+group+"-"+(a-1)+'.png width='+"'200'"+'>" >'+
								imgList[group][a]+
								'</a>'+
								'</div>'+
								'<div class="col-12">'+
								'<hr class="hr-table">'+
								'</div></div>'
				}
				groupHtml+='</div></div><hr class="hr-White">';
				$('#tableGen').append(groupHtml);
			}
*/
			for(var group = 0;group<imgList.length;group++){
				var groupHtml= 	'<button class="btn btn-primary" type="button" onclick="collapseAll()" data-toggle="collapse" data-target=".btn:hover +a+.collapse" aria-expanded="false">'+
								imgList[group][0]+
								'</button> <a href='+
								'"'+imgList[group][1]+'"'+
								' class="badge badge-warning">shop</a>'+
								'<div class="collapse item-main multi-collapse show">'+
								'<div class="h20"></div>'+
								'<div class="contentArea">'+
								'<hr class="hr-table">';
				for(var a = 2 ; a<imgList[group].length;a++){
					groupHtml+='<div class="row collapse item-sub multi-collapse show">'+
								'<div class="item-num col-4">'+(a-1)+'</div>'+
								'<div class="col-8">'+
								'<a class="item-name '+
								'imgList[group][a]["color"]"'+
								' tabindex="0" role="button" data-toggle="popover" data-placement="auto" data-trigger="focus" data-html="true" data-content='+
								'"<img src=img/'+group+"-"+(a-1)+'.png width='+"'200'"+'>" >'+
								imgList[group][a]["name"]+
								'</a>'+
								'</div>'+
								'<div class="col-12">'+
								'<hr class="hr-table">'+
								'</div></div>'
				}
				groupHtml+='</div></div><hr class="hr-White">';
				$('#tableGen').append(groupHtml);
			}


			$('[ data-toggle="popover"]').popover();  
		}});


var searchInput = document.getElementById('searchText');
var allItems = document.getElementsByClassName('item-sub');

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
	var result =0;
	for(var i=0;i<allItems.length;i++){
		var itemNameClass = allItems.item(i).getElementsByClassName('item-name');
		var itemName ="";
		if(itemNameClass.length>0){
			itemName =itemNameClass.item(0).innerHTML;
		}
		if(itemName.indexOf(searchInput.value)>=0){
			$(allItems.item(i)).collapse('show');
			result++;
		}else{
			$(allItems.item(i)).collapse('hide');
		}
	}
	if(result==0){
		alert("找不到符合的結果");
	}

}

function cleanSearch(){
	searchInput.value ="";
	collapseAll();
	$('.collapse.item-sub').collapse('show');
}
