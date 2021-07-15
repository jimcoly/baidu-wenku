// -------- UserScript --------
// @name         百度文库 文档打印
// @fork from    http://github.com/HelloCodeMing/baidu-wenku
// @version      0.2
// @author       WangHuanMing, DoraemonYu
// @match        wenku.baidu.com/view/*
//------------------------------


// -------- Config --------

//模拟向下滚动时的间隔时间，请根据实际情况微调。
//数值过大时，整体完成时间会延长；数值过小时，会有部分章节没加载就被跳过。
var waitTime4Scroll = 800;	

//页面空白间距，不同文档的页面间距设置不同，但可以取个通用的值。
//数值(绝对值)过大，页面可能显示不全；数值(绝对值)过小，空白比较大。
var margin4ReaderPage ="-75px auto";

//---------------------------


//模拟点击"继续阅读"
jQuery('.goBtn').click();
jQuery('.read-all').click();


//不移除而进行隐藏。否则滚动时会频繁出现 Uncaught TypeError: Cannot read property 'top' of undefined
jQuery(".aside").hide();  
//----------------


//移除不需要的页面内容#1
jQuery('.zsj-topbar').remove();
jQuery("#doc #hd").remove();
jQuery(".crubms-wrap").remove();
jQuery(".user-bar").remove();
jQuery("#doc-header").remove();
jQuery(".reader-tools-bar-wrap").remove();
jQuery(".fix-searchbar-wrap").remove();
jQuery("#bottom-doc-list-8").remove();
jQuery(".ft").remove();
jQuery("#ft").remove();
jQuery("#docBubble").remove();
jQuery('.hd').remove();
jQuery('.wk-other-new-cntent').remove();
jQuery('#html-reader-go-more').remove();
jQuery('.new-wm').remove();
jQuery('#bottom-download').remove();
jQuery('#pay-page').remove();
jQuery('.banner-wrap').remove();
jQuery('#next_doc_box').remove();
jQuery('.high-quality-doc').remove();
jQuery('.new-ico-wkmember-free-doc').remove();
jQuery('.doc-tag-pay-normal').remove();
jQuery('.doc-tag-professional').remove();
jQuery('.doc-tag-pay-discount').remove();
jQuery('.doc-tag-ticket').remove();
jQuery('.reader-back2top-wrap').remove();
jQuery("body").attr("margin", "auto");
//jQuery(".bd").attr("style", "height:1262.879px"); //暂时注释掉
//------------------------------


//移除不需要的页面内容#2:适应新View的页面
jQuery('.header-wrapper').remove();
jQuery('.relative-recommend-wrapper').remove();
jQuery('.propagation-wrapper').remove();
jQuery('.reader-topbar').remove();
jQuery('.fc-parallax-scrolling').hide();
jQuery('.no-full-screen').hide();
jQuery('.try-end-fold-page').remove();
jQuery('.hx-warp').remove();
jQuery('.left-sidebar-wrapper').hide();
jQuery('#page-footer').hide();
//------------------------------


//继续删除页面内容
jQuery('#doc_bottom_wrap').remove();
jQuery('.mod.lastcell-dialog').remove();
jQuery('.doc-tag-wrap.super-vip.fixed').remove();
jQuery('.title-con-fc').remove();


//去除边框
jQuery('.reader-page').css({
    border: 0
});


//向下滚动时，页面会remove其他已显示的内容。重写它
jQuery.fn.extend({
    remove: function () {
        return false;
    }
});


//稍微去除"纸张间距"
jQuery('.reader-page').css("margin", margin4ReaderPage);


//恢复空白背景色
jQuery('html,body').css("background", "#fff");



//模拟向下滚动，加载剩余的文档内容
var _h = document.body.scrollHeight,
    _tmp = 0;
var _t = window.setInterval(function () {
    jQuery(window).scrollTop(_tmp);
    _tmp = _tmp + 700;
    _h = document.body.scrollHeight;
    if (_tmp > _h) {
        window.clearInterval(_t);		
		
		//打印的时候，会被这个CSS影响 @media print{body{display:none}}，因此覆盖掉
		jQuery('body').css("display","block");
		
		//弹出打印窗口
        window.setTimeout(function () {
            window.print();
        }, 2000);
    }
}, waitTime4Scroll);
