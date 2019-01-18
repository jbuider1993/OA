﻿/**
 * 桌面模块
 */
layui.define(['jquery', 'layer', 'winui'], function (exports) {
    "use strict";

    var $ = layui.jquery;

    //桌面构造函数
    var Desktop = function (options) {
        this.options = options || {
            url: winui.path + 'json/desktopmenu.json',
            method: 'get'
        };
        this.data = null;
    };

    //渲染HTML
    Desktop.prototype.render = function (callback) {
        if (this.data === null) return;
        var html = '';
        $(this.data).each(function (index, item) {
        	var id = (item.id == '' || item.id == undefined) ? '' : 'win-id="' + item.id + '"',
        		url = (item.pageURL == '' || item.pageURL == undefined) ? '' : 'win-url="' + item.pageURL + '"',
        		title = (item.title == '' || item.title == undefined) ? '' : 'win-title="' + item.title + '"',
        		opentype = (item.openType == '' || item.openType == undefined) ? '' : 'win-opentype="' + item.openType + '"',
        		maxOpen = (item.maxOpen == '' || item.maxOpen == undefined) ? '' : 'win-maxOpen="' + item.maxOpen + '"',
				menuIconBg = (item.menuIconBg == '' || item.menuIconBg == undefined) ? '' : 'win-menuIconBg="' + item.menuIconBg + '"',
				menuIconColor = (item.menuIconColor == '' || item.menuIconColor == undefined) ? '' : 'win-menuIconColor="' + item.menuIconColor + '"',
        		//icon的算法存在纰漏，但出现错误几率较小
        		isFaIcon = (item.icon.indexOf('fa-') != -1 && item.icon.indexOf('.') == -1);
        	var icon;
        	if(!isNull(item.menuIconColor)){
        		icon = isFaIcon ? '<i class="fa ' + item.icon + ' fa-fw" style="color: ' + item.menuIconColor + '"></i>' : '<img src="' + item.icon + '" />';
        	}else{
        		icon = isFaIcon ? '<i class="fa ' + item.icon + ' fa-fw"></i>' : '<img src="' + item.icon + '" />';
        	}
        	if(isNull(item.childs)){
        		html += '<div class="winui-desktop-item" ' + id + ' ' + url + ' ' + title + ' ' + opentype + ' ' + maxOpen + '>';
        		if(!isNull(item.menuIconBg)){
        			html += '<div class="winui-icon ' + (isFaIcon ? 'winui-icon-font' : 'winui-icon-img') + '" style="background-color: ' + item.menuIconBg + '">';
        		}else{
        			html += '<div class="winui-icon ' + (isFaIcon ? 'winui-icon-font' : 'winui-icon-img') + '">';
        		}
        		html += icon;
        		html += '</div>';
        		html += '<p>' + item.name + '</p>';
        		html += '</div>';
        	}else{
        		html += '<div class="winui-desktop-item" ' + id + ' ' + url + ' ' + title + ' ' + opentype + ' ' + maxOpen + '>';
        		html += '<div class="winui-icon ' + (isFaIcon ? 'winui-icon-font' : 'winui-icon-img') + '">';
        		html += '<div class="icon-drawer">';
        		var childsIconContent = '';
        		var childsHtml = '';
        		$(item.childs).each(function (index, bean) {
    				var childsid = (bean.id == '' || bean.id == undefined) ? '' : 'win-id="' + bean.id + '"',
						childsurl = (bean.pageURL == '' || bean.pageURL == undefined) ? '' : 'win-url="' + bean.pageURL + '"',
						childstitle = (bean.title == '' || bean.title == undefined) ? '' : 'win-title="' + bean.title + '"',
						childsopentype = (bean.openType == '' || bean.openType == undefined) ? '' : 'win-opentype="' + bean.openType + '"',
						childsmaxOpen = (bean.maxOpen == '' || bean.maxOpen == undefined) ? '' : 'win-maxOpen="' + bean.maxOpen + '"',
						childsmenuIconBg = (bean.menuIconBg == '' || bean.menuIconBg == undefined) ? '' : 'win-menuIconBg="' + bean.menuIconBg + '"',
						childsmenuIconColor = (bean.menuIconColor == '' || bean.menuIconColor == undefined) ? '' : 'win-menuIconColor="' + bean.menuIconColor + '"',
		        		//icon的算法存在纰漏，但出现错误几率较小
						childsisFaIcon = (bean.icon.indexOf('fa-') != -1 && bean.icon.indexOf('.') == -1);
    				var childsicon;
    				var childsiconsmall;
    				if(!isNull(bean.menuIconColor)){
    					if(!isNull(bean.menuIconBg)){
    						childsiconsmall = childsisFaIcon ? '<i class="fa ' + bean.icon + ' fa-fw icon-drawer-icon" style="color: ' + bean.menuIconColor + ';background-color: ' + bean.menuIconBg + '"></i>' : '<img src="' + bean.icon + '" />';
        					childsicon = childsisFaIcon ? '<i class="fa ' + bean.icon + ' fa-fw" style="color: ' + bean.menuIconColor + ';background-color: ' + bean.menuIconBg + '"></i>' : '<img src="' + bean.icon + '" />';
    					}else{
    						childsiconsmall = childsisFaIcon ? '<i class="fa ' + bean.icon + ' fa-fw icon-drawer-icon" style="color: ' + bean.menuIconColor + '"></i>' : '<img src="' + bean.icon + '" />';
        					childsicon = childsisFaIcon ? '<i class="fa ' + bean.icon + ' fa-fw" style="color: ' + bean.menuIconColor + '"></i>' : '<img src="' + bean.icon + '" />';
    					}
    				}else{
    					if(!isNull(bean.menuIconBg)){
    						childsiconsmall = childsisFaIcon ? '<i class="fa ' + bean.icon + ' fa-fw icon-drawer-icon" style="background-color: ' + bean.menuIconBg + '"></i>' : '<img src="' + bean.icon + '" />';
        					childsicon = childsisFaIcon ? '<i class="fa ' + bean.icon + ' fa-fw" style="background-color: ' + bean.menuIconBg + '"></i>' : '<img src="' + bean.icon + '" />';
    					}else{
	    					childsiconsmall = childsisFaIcon ? '<i class="fa ' + bean.icon + ' fa-fw icon-drawer-icon"></i>' : '<img src="' + bean.icon + '" />';
	    					childsicon = childsisFaIcon ? '<i class="fa ' + bean.icon + ' fa-fw"></i>' : '<img src="' + bean.icon + '" />';
    					}
    				}
    				
    				childsIconContent += childsiconsmall;
    				childsHtml += '<div class="winui-desktop-item sec-clsss-btn" ' + childsid + ' ' + childsurl + ' ' + childstitle + ' ' + childsopentype + ' ' + childsmaxOpen + '>';
    				if(!isNull(bean.menuIconBg)){
    					childsHtml += '<div class="winui-icon ' + (childsisFaIcon ? 'winui-icon-font' : 'winui-icon-img') + '" style="background-color: ' + bean.menuIconBg + '">';
    				}else{
    					childsHtml += '<div class="winui-icon ' + (childsisFaIcon ? 'winui-icon-font' : 'winui-icon-img') + '">';
    				}
    				childsHtml += childsicon;
    				childsHtml += '</div>';
    				childsHtml += '<p>' + bean.name + '</p>';
    				childsHtml += '</div>';
        		});
        		html += childsIconContent;
        		html += '</div>';
        		html += '<div class="icon-child">';
        		html += childsHtml;
        		html += '</div>';
        		html += '</div>';
        		html += '<p>' + item.name + '</p>';
        		html += '</div>';
        	}
        });
        $('.winui-desktop').html(html);
        //定位应用
        common.locaApp();
        //调用渲染完毕的回调函数
        if (typeof callback === 'function')
            callback.call(this, desktopApp);
    };

    //设置数据
    Desktop.prototype.setData = function (callback) {
        var obj = this, currOptions = obj.options;
        if (!currOptions.url || !currOptions.method)
            return;
        currOptions.data.userToken = getCookie('userToken');
        $.ajax({
            url: currOptions.url,
            type: currOptions.method,
            data: $.extend({}, currOptions.data),
            dataType: 'json',
            async: false,
            success: function (res) {
                res = res.rows;
                if (typeof res === "string") {
                    obj.data = JSON.parse(res);
                    if (typeof callback === 'function')
                        callback.call(obj);
                } else if (typeof (res) == "object" && (Object.prototype.toString.call(res).toLowerCase() == "[object object]" || Object.prototype.toString.call(res).toLowerCase() == "[object array]")) {
                    obj.data = res;
                    if (typeof callback === 'function')
                        callback.call(obj);
                } else {
                    layer.msg('请对接口返回json对象或者json字符串', {
                        offset: '40px',
                        zIndex: layer.zIndex
                    });
                }
            },
            error: function (e) {
                if (e.status != 200) {
                    console.error(e.statusText);
                } else {
                    layer.msg('请对接口返回json对象或者json字符串', {
                        offset: '40px',
                        zIndex: layer.zIndex
                    });
                }
            }
        });
    };

    //桌面应用构造函数
    var DesktopApp = function () {
        this.contextmenuOptions = {};
    };

    //桌面应用右键菜单定义
    DesktopApp.prototype.contextmenu = function (options) {
        if (!options.item)
            return;

        //重置右键事件
        common.resetEvent('.winui-desktop>.winui-desktop-item', 'mouseup', function (e) {
            if (!e) e = window.event;
            var currentItem = this;
            if (e.button == 2) {
                var left = e.clientX;
                var top = e.clientY;

                var div = '<ul class="app-contextmenu" style="top:' + top + 'px;left:' + left + 'px;">';
                $(options.item).each(function (index, item) {
                    div += '<li>' + item + '</li>';
                });
                div += '</ul>';

                //移除之前右键菜单
                $('.app-contextmenu').remove();
                //渲染当前右键菜单
                $('body').append(div);
                //绑定单击回调函数
                $('ul.app-contextmenu li').on('click', function () {
                    var index = $(this).index();
                    if (typeof options['item' + (index + 1)] !== 'function')
                        return;
                    //调用回调函数
                    options['item' + (index + 1)].call(this, $(currentItem).attr('win-id'), $(currentItem), { reLocaApp: common.locaApp });

                    $('.app-contextmenu').remove();
                    //移除选中状态
                    $('.winui-desktop>.winui-desktop-item').removeClass('winui-this');
                });
                //阻止右键菜单冒泡
                $('.app-contextmenu li').on('click mousedown', call.sp);
            }
            $(currentItem).addClass('winui-this').siblings().removeClass('winui-this');
        });

        this.contextmenuOptions = options;
    }

    //桌面应用单击事件
    DesktopApp.prototype.onclick = function (callback) {
        if (typeof callback !== "function") return;
        //重置双击事件
        common.resetEvent('.winui-desktop-item', 'click', function (event) {
            event.stopPropagation();
            callback.call(this, $(this).attr('win-id'), this);
            //移除选中状态
            $('.winui-desktop>.winui-desktop-item').removeClass('winui-this');
        });
    }

    //桌面应用双击事件
    DesktopApp.prototype.ondblclick = function (callback) {
        if (typeof callback !== "function") return;
        //重置双击事件
        common.resetEvent('.winui-desktop-item', 'dblclick', function (event) {
            event.stopPropagation();
            callback.call(this, $(this).attr('win-id'), this);
            //移除选中状态
            $('.winui-desktop>.winui-desktop-item').removeClass('winui-this');
        });
    }

    var desktopApp = new DesktopApp();

    //公共事件
    var common = {
        //重置元素事件
        resetEvent: function (selector, eventName, func) {
            if (typeof func != "function") return;
            $(selector).off(eventName).on(eventName, func);
        },
        //定位桌面应用
        locaApp: function () {
            //计算一竖排能容纳几个应用
            var appHeight = 103;
            var appWidth = 90;
            var maxCount = parseInt($('.winui-desktop').height() / 100);
            var oldTemp = 0;
            var rowspan = 0;
            var colspan = 0;
            //定位桌面应用
            $('.winui-desktop>.winui-desktop-item').each(function (index, elem) {
                var newTemp = parseInt(index / maxCount);
                colspan = parseInt(index / maxCount);
                rowspan = oldTemp == newTemp ? rowspan : 0;
                if (rowspan == 0 && oldTemp != newTemp) oldTemp++;
                $(this).css('top', appHeight * rowspan + 'px').css('left', appWidth * colspan + 'px');
                rowspan++;
            });
        }
    };

    //基础事件
    var call = {
        //阻止事件冒泡
        sp: function (event) {
            layui.stope(event);
        }
    };

    var desktop = new Desktop();

    //配置
    desktop.config = function (options) {
        options = options || {};
        for (var key in options) {
            this.options[key] = options[key];
        }
        return this;
    };

    //初始化
    desktop.init = function (options, callback) {
        if (typeof options === 'object') {
            this.config(options);
        } else if (typeof options == 'fuction') {
            callback = options;
        }
        //缓存回调函数
        this.done = callback = callback || this.done;

        this.setData(function () {
            this.render(callback);
        });
    };

    winui.desktop = desktop;

    exports('desktop', {});

    delete layui.desktop;
});