$(function(){
	var speed3 = 300;
	var speed6 = 600;
	var $title = $("head>title");
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
	$("#nP").click(function(){	
		$(this).parent().find("li.active").prev().addClass("active")
						.end()
						.removeClass("active")
						.siblings("#nN").fadeIn().css("visibility","visible");
		showPre(1);
		idx = idx - 1;
		if (idx == 0) {
			$(this).css("visibility","hidden")
					.siblings().addClass("active");
			$("#iconNav").attr("class","iconNav");
		}
	});
	// 显示下一页
	$("#nN").click(function(){
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
	var $shadow = $("#shadow");
	var $mains = $("#mains");
	var $options = $mains.find("li");
	var $submain_item = $(".submain_item");
	var $nextPage = $(".nextPage");
	var $prevPage = $(".prevPage");
	var $backPage = $(".backPage");
	// 点击分类小图标之后显示子页面,显示遮罩,title内容改成相应子页面的内容,分享全屏按钮隐藏,导航栏隐藏
	$options.click(function(){
		var $This = $(this);
		var oSrc = $This.find("a").eq(0).attr("href");
		var oArr = oSrc.split("#");
		var oId=oArr[oArr.length-1];//获取到所点击的li名字id
		var $oShow = $("#"+oId);//获取需要显示的id为oId的元素
		$shadow.fadeIn();
		$oShow.css({"display":"block","top":"100%"})
				.stop(true,false).animate({"top":"30px"},speed6);
		$title.text(oId+" | World of Mathematics");
		$(".choose").fadeOut();
		$("#iconNav").fadeOut();

	});
	// 点击Advertising中的关闭按钮
	var $btn = $(".btn");
	$btn.click(function(){
		$(this).parent(".Advertising").css("display","none");
	});

	// 点击页面外部之后子页面消失，遮罩消失,title还原,分享全屏按钮显示
	$submain_item.click(function(){
		$shadow.fadeOut();
		$(this).stop(true,false).animate({"top":"100%"},speed6);
		$btn.parent(".Advertising").fadeIn();
		$title.text("Mathigon | World of Mathematics");
		$(".choose").fadeIn();
		$("#iconNav").fadeIn();
		return false;
	});
	//点击主页面区,上一页下一页子页面不消失
	$(".submain_item0,.nextPage,.prevPage,.backPage").click(function(){
		$shadow.css("display","block");
		$(this).css({"display":"block","top":"100%"});
		return false;
	});
	// hover子页面的header时，显示subnav
	var $header = $(".header");
	$header.hover(function(){
		var $This = $(this).find(".subNav").eq(0);
			$This.stop(true,false).animate({"right":"0","opacity":".8"},speed3)
					.siblings("span").fadeOut();
	},function(){
		var $This = $(this).find(".subNav").eq(0);
			$This.stop(true,false).animate({"right":"-290px","opacity":"0"},speed3)
					.siblings("span").fadeIn();
	});
	// 点击header中的list跳转到相应的文章部分
	var $lists = $header.find("li");
	$lists.click(function(){
		var $This = $(this);
		var lId = $This.find("a").eq(0).attr("href");//提取点击的li中的href值
		var $tId = $("#"+lId);//找到与点击的li对应的id元素
		var Top = $tId.offset().top;//元素距离页面可视区域顶端的距离,即文档顶端
		var $scroll =  $This.parents(".submain_item");
		var sTop = $scroll.scrollTop();//父元素当前已经滚动的距离
		$scroll.animate({"scrollTop":Top+sTop-"50"},speed6);//最终父元素滚动的距离是当前值加上当前偏移
	});
	//点击子页面下方的下一页按钮
	$nextPage.click(function(){
		var $This = $(this);
		var $thisP = $This.parents(".submain_item");//元素所在页面的祖先元素
		var $nextP = $thisP.next();
		var nextId = $nextP.attr("id");
		$title.text(nextId+" | World of Mathematics");
		$thisP.animate({"left":"-100%"},speed6);
		$nextP.css({"left":"100%","top":"30px"}).stop(true,false).animate({"left":"0"},speed6).scrollTop(0);
		$backPage.fadeIn();
	});
	//点击子页面下方的上一页按钮
	$prevPage.click(function(){
		var $This = $(this);
		var $thisP = $This.parents(".submain_item");//元素所在页面的祖先元素
		var $nextP = $thisP.prev();
		var nextId = $nextP.attr("id");
		$title.text(nextId+" | World of Mathematics");
		$thisP.animate({"left":"100%"},speed6);
		$nextP.css({"left":"-100%","top":"30px"}).stop(true,false).animate({"left":"0"},speed6).scrollTop(0);
	});
	//点击back按钮返回上一页面
	$backPage.click(function(){
		var $This = $(this);
		var $thisP = $This.parents(".submain_item");//元素所在页面的祖先元素
		var $nextP = $thisP.prev();
		var nextId = $nextP.attr("id");
		$title.text(nextId+" | World of Mathematics");
		$thisP.animate({"left":"100%"},speed6);
		$nextP.css({"left":"-100%","top":"30px"}).stop(true,false).animate({"left":"0"},speed6);
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