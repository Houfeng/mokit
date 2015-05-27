/**
 * 视图
 * @module mokit
 */
define(function(require, exports, module) {
    "require:nomunge,exports:nomunge,module:nomunge";
    "use strict";

    var $ = require('./jquery');
    var modernizr = require('./modernizr');
    var utils = require('./utils');
    var mask = require('./mask');

    var supportCSSAnimation = modernizr.cssanimations,
        endCurrentView = false,
        endNextView = false;

    var animationEndEventNames = {
        'WebkitAnimation': 'webkitAnimationEnd',
        'OAnimation': 'oAnimationEnd',
        'msAnimation': 'MSAnimationEnd',
        'animation': 'animationend'
    };

    // animation end event name
    var animationEndEventName = animationEndEventNames[modernizr.prefixed('animation')];

    var _isAnimating = false;
    exports.isAnimating = function() {
        return _isAnimating;
    };

    /**
     * 恢复原有样式
     */
    var resetViewClass = function(currentView, nextView) {
        if (currentView) {
			currentView.attr('class', currentView.data('originalClassList'));
			currentView.removeClass('ui-view-current');
		}
		if (nextView) {
			nextView.attr('class', nextView.data('originalClassList') + ' ui-view-current');
		}
    };

    /**
     * 保存原有样式
     */
    var saveViewClass = function(currentView, nextView) {
        if (currentView) currentView.data('originalClassList', currentView.attr('class') || '');
        if (nextView) nextView.data('originalClassList', nextView.attr('class') || '');
    };

    /**
     * 在动画结束时
     */
    var onEndAnimation = function(currentView, nextView, callback) {
        endCurrentView = false;
        endNextView = false;
        resetViewClass(currentView, nextView);
        if (callback) callback();
    };

    /**
     * 取动画样式类名
     */
    var getAnimationClass = function(animation) {
        var outClass, inClass;
        switch (animation) {
            case 1:
                outClass = 'ui-view-moveToLeft';
                inClass = 'ui-view-moveFromRight';
                break;
            case 2:
                outClass = 'ui-view-moveToRight';
                inClass = 'ui-view-moveFromLeft';
                break;
            case 3:
                outClass = 'ui-view-moveToTop';
                inClass = 'ui-view-moveFromBottom';
                break;
            case 4:
                outClass = 'ui-view-moveToBottom';
                inClass = 'ui-view-moveFromTop';
                break;
            case 5:
                outClass = 'ui-view-fade';
                inClass = 'ui-view-moveFromRight ui-view-ontop';
                break;
            case 6:
                outClass = 'ui-view-fade';
                inClass = 'ui-view-moveFromLeft ui-view-ontop';
                break;
            case 7:
                outClass = 'ui-view-fade';
                inClass = 'ui-view-moveFromBottom ui-view-ontop';
                break;
            case 8:
                outClass = 'ui-view-fade';
                inClass = 'ui-view-moveFromTop ui-view-ontop';
                break;
            case 9:
                outClass = 'ui-view-moveToLeftFade';
                inClass = 'ui-view-moveFromRightFade';
                break;
            case 10:
                outClass = 'ui-view-moveToRightFade';
                inClass = 'ui-view-moveFromLeftFade';
                break;
            case 11:
                outClass = 'ui-view-moveToTopFade';
                inClass = 'ui-view-moveFromBottomFade';
                break;
            case 12:
                outClass = 'ui-view-moveToBottomFade';
                inClass = 'ui-view-moveFromTopFade';
                break;
            case 13:
                outClass = 'ui-view-moveToLeftEasing ui-view-ontop';
                inClass = 'ui-view-moveFromRight';
                break;
            case 14:
                outClass = 'ui-view-moveToRightEasing ui-view-ontop';
                inClass = 'ui-view-moveFromLeft';
                break;
            case 15:
                outClass = 'ui-view-moveToTopEasing ui-view-ontop';
                inClass = 'ui-view-moveFromBottom';
                break;
            case 16:
                outClass = 'ui-view-moveToBottomEasing ui-view-ontop';
                inClass = 'ui-view-moveFromTop';
                break;
            case 17:
                outClass = 'ui-view-scaleDown';
                inClass = 'ui-view-moveFromRight ui-view-ontop';
                break;
            case 18:
                outClass = 'ui-view-scaleDown';
                inClass = 'ui-view-moveFromLeft ui-view-ontop';
                break;
            case 19:
                outClass = 'ui-view-scaleDown';
                inClass = 'ui-view-moveFromBottom ui-view-ontop';
                break;
            case 20:
                outClass = 'ui-view-scaleDown';
                inClass = 'ui-view-moveFromTop ui-view-ontop';
                break;
            case 21:
                outClass = 'ui-view-scaleDown';
                inClass = 'ui-view-scaleUpDown ui-view-delay300';
                break;
            case 22:
                outClass = 'ui-view-scaleDownUp';
                inClass = 'ui-view-scaleUp ui-view-delay300';
                break;
            case 23:
                outClass = 'ui-view-moveToLeft ui-view-ontop';
                inClass = 'ui-view-scaleUp';
                break;
            case 24:
                outClass = 'ui-view-moveToRight ui-view-ontop';
                inClass = 'ui-view-scaleUp';
                break;
            case 25:
                outClass = 'ui-view-moveToTop ui-view-ontop';
                inClass = 'ui-view-scaleUp';
                break;
            case 26:
                outClass = 'ui-view-moveToBottom ui-view-ontop';
                inClass = 'ui-view-scaleUp';
                break;
            case 27:
                outClass = 'ui-view-scaleDownCenter';
                inClass = 'ui-view-scaleUpCenter ui-view-delay400';
                break;
            case 28:
                outClass = 'ui-view-rotateRightSideFirst';
                inClass = 'ui-view-moveFromRight ui-view-delay200 ui-view-ontop';
                break;
            case 29:
                outClass = 'ui-view-rotateLeftSideFirst';
                inClass = 'ui-view-moveFromLeft ui-view-delay200 ui-view-ontop';
                break;
            case 30:
                outClass = 'ui-view-rotateTopSideFirst';
                inClass = 'ui-view-moveFromTop ui-view-delay200 ui-view-ontop';
                break;
            case 31:
                outClass = 'ui-view-rotateBottomSideFirst';
                inClass = 'ui-view-moveFromBottom ui-view-delay200 ui-view-ontop';
                break;
            case 32:
                outClass = 'ui-view-flipOutRight';
                inClass = 'ui-view-flipInLeft ui-view-delay500';
                break;
            case 33:
                outClass = 'ui-view-flipOutLeft';
                inClass = 'ui-view-flipInRight ui-view-delay500';
                break;
            case 34:
                outClass = 'ui-view-flipOutTop';
                inClass = 'ui-view-flipInBottom ui-view-delay500';
                break;
            case 35:
                outClass = 'ui-view-flipOutBottom';
                inClass = 'ui-view-flipInTop ui-view-delay500';
                break;
            case 36:
                outClass = 'ui-view-rotateFall ui-view-ontop';
                inClass = 'ui-view-scaleUp';
                break;
            case 37:
                outClass = 'ui-view-rotateOutNewspaper';
                inClass = 'ui-view-rotateInNewspaper ui-view-delay500';
                break;
            case 38:
                outClass = 'ui-view-rotatePushLeft';
                inClass = 'ui-view-moveFromRight';
                break;
            case 39:
                outClass = 'ui-view-rotatePushRight';
                inClass = 'ui-view-moveFromLeft';
                break;
            case 40:
                outClass = 'ui-view-rotatePushTop';
                inClass = 'ui-view-moveFromBottom';
                break;
            case 41:
                outClass = 'ui-view-rotatePushBottom';
                inClass = 'ui-view-moveFromTop';
                break;
            case 42:
                outClass = 'ui-view-rotatePushLeft';
                inClass = 'ui-view-rotatePullRight ui-view-delay180';
                break;
            case 43:
                outClass = 'ui-view-rotatePushRight';
                inClass = 'ui-view-rotatePullLeft ui-view-delay180';
                break;
            case 44:
                outClass = 'ui-view-rotatePushTop';
                inClass = 'ui-view-rotatePullBottom ui-view-delay180';
                break;
            case 45:
                outClass = 'ui-view-rotatePushBottom';
                inClass = 'ui-view-rotatePullTop ui-view-delay180';
                break;
            case 46:
                outClass = 'ui-view-rotateFoldLeft';
                inClass = 'ui-view-moveFromRightFade';
                break;
            case 47:
                outClass = 'ui-view-rotateFoldRight';
                inClass = 'ui-view-moveFromLeftFade';
                break;
            case 48:
                outClass = 'ui-view-rotateFoldTop';
                inClass = 'ui-view-moveFromBottomFade';
                break;
            case 49:
                outClass = 'ui-view-rotateFoldBottom';
                inClass = 'ui-view-moveFromTopFade';
                break;
            case 50:
                outClass = 'ui-view-moveToRightFade';
                inClass = 'ui-view-rotateUnfoldLeft';
                break;
            case 51:
                outClass = 'ui-view-moveToLeftFade';
                inClass = 'ui-view-rotateUnfoldRight';
                break;
            case 52:
                outClass = 'ui-view-moveToBottomFade';
                inClass = 'ui-view-rotateUnfoldTop';
                break;
            case 53:
                outClass = 'ui-view-moveToTopFade';
                inClass = 'ui-view-rotateUnfoldBottom';
                break;
            case 54:
                outClass = 'ui-view-rotateRoomLeftOut ui-view-ontop';
                inClass = 'ui-view-rotateRoomLeftIn';
                break;
            case 55:
                outClass = 'ui-view-rotateRoomRightOut ui-view-ontop';
                inClass = 'ui-view-rotateRoomRightIn';
                break;
            case 56:
                outClass = 'ui-view-rotateRoomTopOut ui-view-ontop';
                inClass = 'ui-view-rotateRoomTopIn';
                break;
            case 57:
                outClass = 'ui-view-rotateRoomBottomOut ui-view-ontop';
                inClass = 'ui-view-rotateRoomBottomIn';
                break;
            case 58:
                outClass = 'ui-view-rotateCubeLeftOut ui-view-ontop';
                inClass = 'ui-view-rotateCubeLeftIn';
                break;
            case 59:
                outClass = 'ui-view-rotateCubeRightOut ui-view-ontop';
                inClass = 'ui-view-rotateCubeRightIn';
                break;
            case 60:
                outClass = 'ui-view-rotateCubeTopOut ui-view-ontop';
                inClass = 'ui-view-rotateCubeTopIn';
                break;
            case 61:
                outClass = 'ui-view-rotateCubeBottomOut ui-view-ontop';
                inClass = 'ui-view-rotateCubeBottomIn';
                break;
            case 62:
                outClass = 'ui-view-rotateCarouselLeftOut ui-view-ontop';
                inClass = 'ui-view-rotateCarouselLeftIn';
                break;
            case 63:
                outClass = 'ui-view-rotateCarouselRightOut ui-view-ontop';
                inClass = 'ui-view-rotateCarouselRightIn';
                break;
            case 64:
                outClass = 'ui-view-rotateCarouselTopOut ui-view-ontop';
                inClass = 'ui-view-rotateCarouselTopIn';
                break;
            case 65:
                outClass = 'ui-view-rotateCarouselBottomOut ui-view-ontop';
                inClass = 'ui-view-rotateCarouselBottomIn';
                break;
            case 66:
                outClass = 'ui-view-rotateSidesOut';
                inClass = 'ui-view-rotateSidesIn ui-view-delay200';
                break;
            case 67:
                outClass = 'ui-view-rotateSlideOut';
                inClass = 'ui-view-rotateSlideIn';
                break;
            case 68:
                outClass = 'ui-view-fade ui-view-ontop';
                inClass = 'ui-view-fade ui-view-delay200';
                break;
        }
        //
        return {
            'inClass': inClass,
            'outClass': outClass
        };
    };

    /**
     * 切换
     */
    var _change = function(currentView, nextView, animation, callback) {
        if (!currentView || !nextView || !animation || animation == 0) {
            setTimeout(function() {
                onEndAnimation(null, null, callback);
            }, 13);
            return;
        }
        //
        saveViewClass(currentView, nextView);
        //设置样式
        nextView.addClass('ui-view-current');
        var animationClass = getAnimationClass(animation);
        //
        currentView.addClass(animationClass.outClass).on(animationEndEventName, function() {
            currentView.off(animationEndEventName);
            endCurrentView = true;
            if (endNextView) {
                onEndAnimation(currentView, nextView, callback);
            }
        });
        //
        nextView.addClass(animationClass.inClass).on(animationEndEventName, function() {
            nextView.off(animationEndEventName);
            endNextView = true;
            if (endCurrentView) {
                onEndAnimation(currentView, nextView, callback);
            }
        });
        //
        if (!supportCSSAnimation) {
            onEndAnimation(currentView, nextView, callback);
        }
    };

    exports.change = function(currentView, nextView, animation, callback, options) {
        //确保同时只有一个动画在进行
        if (_isAnimating) return;
        _isAnimating = true;
        //
        options=options||{};
        mask.begin(options);
        var holder = options.container||$(document.body);
        holder = holder.ui||holder;
        currentView = currentView.ui || currentView;
        nextView = nextView.ui || nextView;
        //如果有一个隐藏则直接切换
        /*if (currentView.is(":hidden") || nextView.is(":hidden")) {
            mask.end(options);
            onEndAnimation(null, null, callback);
            _isAnimating = false;
            return;
        }*/
        //初始化 class
        holder.addClass('ui-view-perspective');
        currentView.addClass('ui-view').addClass('ui-view-current');
        nextView.addClass('ui-view');
        //切换视图
        _change(currentView, nextView, animation, function() {
            mask.end(options);
            if (callback) callback();
            holder.removeClass('ui-view-perspective');
            currentView.removeClass('ui-view').removeClass('ui-view-current');
            nextView.removeClass('ui-view').removeClass('ui-view-current');
            _isAnimating = false;
        });
    };

});