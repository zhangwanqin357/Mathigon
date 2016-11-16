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
			$ThisC.show(200).removeClass("hide");
			$This.css("opacity","1");
		}else{
			$ThisC.hide(200).addClass("hide");
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
				.siblings("div").fadeIn().css({"opacity":"1","visibility":"visible"});
		idx = $("#iconNav>li").index(this);
		$("#iconNav").addClass("now"+idx);
		showMain(idx);
		if (idx==5) {
			$("#nN").fadeOut().css("visibility","hidden");
		}
		return false;
	});
	// 点击手机版首页小图标
	$("#n0").click(function(){
		showMain(0);

	});
	// 显示上一页
	$("#nP").bind("click",function(){	
		$(this).parent().find("li.active").prev().addClass("active")
						.end()
						.removeClass("active")
						.siblings("#nN").fadeIn().css("visibility","visible");
		showPre(1);
		idx = idx - 1;
		if (idx == 0) {
			$(this).fadeOut().css("visibility","hidden")
					.siblings().addClass("active");
			$("#iconNav").attr("class","iconNav");
		}
	});
	// 显示下一页
	$("#nN").bind("click",function(){
		$("#iconNav").addClass("now0");
		$(this).parent().find("li.active").next().addClass("active")
						.end()
						.removeClass("active")
						.siblings("#nP").fadeIn().css({"visibility":"visible","opacity":"1"});
		showPre(-1);
		idx = idx + 1;
		if (idx == 5) {
			$(this).fadeOut().css("visibility","hidden");
		}
	});
});
// 滚动
 function showMain(index){
  	var $rollobj = $("#mains");
	var rollWidth = $rollobj.find(".roll").outerWidth();
	$rollobj.stop(true,false).animate({ left: -rollWidth*(index)},600);
	
 }
// 显示上下页
 function showPre(i){
  	var $rollobj = $("#mains");
	var rollWidth = $rollobj.find(".roll").outerWidth();
	$rollobj.stop(true,false).animate({ left: "+="+rollWidth*i},600);
 }