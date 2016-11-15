$(function(){
	// 点击屏幕空白处
	$("#main").click(function(e){
		var $This= $(this);
		var $ThisC=$This.find(".sub_share");
		var $ThisS=$This.find("#share");
		if (!$ThisC.hasClass("hide")){
			$ThisC.addClass("hide");
			$ThisS.css("opacity",".5");
		}
		return false;
	});
	// hover分享按钮
	$("#share").hover(function(){
		$(this).css("opacity","1");
	},function(){
		var $This= $(this);
		var $ThisC=$This.siblings(".sub_share");
		if (!$ThisC.hasClass("hide")){
			$(this).css("opacity","1");
		}else{
			$(this).css("opacity",".5");
		}
	});
	// hover全屏按钮
	$("#full").hover(function(){
		$(this).css("opacity","1");
	},function(){
		$(this).css("opacity",".5");
	});
	// 点击share按钮
	$("#share").click(function(e){
		e.stopPropagation();
		var $This= $(this);
		var $ThisC=$This.siblings(".sub_share");
		if ($ThisC.hasClass("hide")) {
			$ThisC.removeClass("hide");
			$This.css("opacity","1");
		}else{
			$ThisC.addClass("hide");
		}
		return false;
	});
	// 点击全屏按钮
	$("#full").click(function(e){
		$("#main").fullScreen();
		e.preventDefault();
		return false;
	});
	//nav
	var idx = 0;
	$("#iconNav>li").click(function(){
		$(this).addClass("active")
				.siblings("li").removeClass("active")
				.siblings("div").css({"opacity":"1","visibility":"visible"});
		$(this).parent().stop(true,false).animate({ bottom: "288px"},500);
		idx = $("#iconNav>li").index(this);
		showMain(idx);
		if (idx==4) {
			$("#nN").fadeOut().css("visibility","hidden");
		}
		return false;
	});
	// 显示上一页
	$("#nP").bind("click",function(){	
		$(this).parent().find("li.active").prev().addClass("active")
						.end()
						.removeClass("active")
						.siblings("div").fadeIn();
		showPre(1);
		idx = idx - 1;
		if (idx == -1) {
			$(this).fadeOut().css("visibility","hidden")
					.siblings().addClass("active")
					.end()
					.parent().stop(true,false).animate({ bottom: "138px"},500);
		}
	});
	// 显示下一页
	$("#nN").bind("click",function(){
		$(this).parent().stop(true,false).animate({ bottom: "288px"},500)
						.find("li.active").next().addClass("active")
						.end()
						.removeClass("active")
						.siblings("div#nP").fadeIn();
		showPre(-1);
		idx = idx + 1;
		if (idx == 4) {
			$(this).fadeOut().css("visibility","hidden");
		}
	});
});
// 滚动
 function showMain(index){
  	var $rollobj = $("#mains");
	var rollWidth = $rollobj.find(".roll").outerWidth();
	var idx0 = parseInt($(".main0").css("left"));
	$rollobj.stop(true,false).animate({ left: -rollWidth*(index+idx0+1)},1000);
	
 }
// 显示上下页
 function showPre(i){
  	var $rollobj = $("#mains");
	var rollWidth = $rollobj.find(".roll").outerWidth();
	$rollobj.stop(true,false).animate({ left: "+="+rollWidth*i},1000);
 }