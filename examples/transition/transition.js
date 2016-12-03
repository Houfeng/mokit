(function (mokit) {

  var ANIMATION_END_EVENT_NAME = 'animationend';
  var EventEmitter = mokit.EventEmitter;
  var Class = mokit.Class;
  var utils = mokit.utils;

  var setClassNames = function (element, classNames, state) {
    if (!element || !classNames) return;
    if (!utils.isArray(classNames)) {
      classNames = classNames.split(' ');
    }
    classNames.forEach(function (className) {
      element.classList[state ? 'add' : 'remove'](className);
    }, this);
  };

  var Transition = new Class({

    constructor: function (num) {
      this.animationClasses = Transition.getAnimationClasses(num);
    },

    init: function (view) {
      setClassNames(view.$element, 'ts-container', true);
    },

    clean: function (view) {
      setClassNames(view.$element, 'ts-container', false);
    },

    prep: function (newComponent, oldComponent) {
      if (!newComponent || !oldComponent) return;
      setClassNames(newComponent.$element, 'ts-item', true);
      setClassNames(oldComponent.$element, 'ts-item', true);
    },

    go: function (newComponent, oldComponent, done) {
      if (!newComponent || !oldComponent) return done();
      var doneCount = 0;
      var newEmitter = new EventEmitter(newComponent.$element);
      var oldEmitter = new EventEmitter(oldComponent.$element);
      var checkDone = function () {
        if (++doneCount > 1) {
          newEmitter.off(ANIMATION_END_EVENT_NAME, checkDone);
          oldEmitter.off(ANIMATION_END_EVENT_NAME, checkDone);
          setClassNames(newComponent.$element, this.animationClasses.enter, false);
          setClassNames(oldComponent.$element, this.animationClasses.leave, false);
          setClassNames(newComponent.$element, 'ts-item', false);
          setClassNames(oldComponent.$element, 'ts-item', false);
          done();
        }
      }.bind(this);
      newEmitter.on(ANIMATION_END_EVENT_NAME, checkDone);
      oldEmitter.on(ANIMATION_END_EVENT_NAME, checkDone);
      setClassNames(newComponent.$element, this.animationClasses.enter, true);
      setClassNames(oldComponent.$element, this.animationClasses.leave, true);
    }

  });

  Transition.getAnimationClasses = function (num) {
    var leave, enter;
    switch (num) {
      case 1:
        leave = 'ts-moveToLeft';
        enter = 'ts-moveFromRight';
        break;
      case 2:
        leave = 'ts-moveToRight';
        enter = 'ts-moveFromLeft';
        break;
      case 3:
        leave = 'ts-moveToTop';
        enter = 'ts-moveFromBottom';
        break;
      case 4:
        leave = 'ts-moveToBottom';
        enter = 'ts-moveFromTop';
        break;
      case 5:
        leave = 'ts-fade';
        enter = 'ts-moveFromRight ts-ontop';
        break;
      case 6:
        leave = 'ts-fade';
        enter = 'ts-moveFromLeft ts-ontop';
        break;
      case 7:
        leave = 'ts-fade';
        enter = 'ts-moveFromBottom ts-ontop';
        break;
      case 8:
        leave = 'ts-fade';
        enter = 'ts-moveFromTop ts-ontop';
        break;
      case 9:
        leave = 'ts-moveToLeftFade';
        enter = 'ts-moveFromRightFade';
        break;
      case 10:
        leave = 'ts-moveToRightFade';
        enter = 'ts-moveFromLeftFade';
        break;
      case 11:
        leave = 'ts-moveToTopFade';
        enter = 'ts-moveFromBottomFade';
        break;
      case 12:
        leave = 'ts-moveToBottomFade';
        enter = 'ts-moveFromTopFade';
        break;
      case 13:
        leave = 'ts-moveToLeftEasing ts-ontop';
        enter = 'ts-moveFromRight';
        break;
      case 14:
        leave = 'ts-moveToRightEasing ts-ontop';
        enter = 'ts-moveFromLeft';
        break;
      case 15:
        leave = 'ts-moveToTopEasing ts-ontop';
        enter = 'ts-moveFromBottom';
        break;
      case 16:
        leave = 'ts-moveToBottomEasing ts-ontop';
        enter = 'ts-moveFromTop';
        break;
      case 17:
        leave = 'ts-scaleDown';
        enter = 'ts-moveFromRight ts-ontop';
        break;
      case 18:
        leave = 'ts-scaleDown';
        enter = 'ts-moveFromLeft ts-ontop';
        break;
      case 19:
        leave = 'ts-scaleDown';
        enter = 'ts-moveFromBottom ts-ontop';
        break;
      case 20:
        leave = 'ts-scaleDown';
        enter = 'ts-moveFromTop ts-ontop';
        break;
      case 21:
        leave = 'ts-scaleDown';
        enter = 'ts-scaleUpDown ts-delay300';
        break;
      case 22:
        leave = 'ts-scaleDownUp';
        enter = 'ts-scaleUp ts-delay300';
        break;
      case 23:
        leave = 'ts-moveToLeft ts-ontop';
        enter = 'ts-scaleUp';
        break;
      case 24:
        leave = 'ts-moveToRight ts-ontop';
        enter = 'ts-scaleUp';
        break;
      case 25:
        leave = 'ts-moveToTop ts-ontop';
        enter = 'ts-scaleUp';
        break;
      case 26:
        leave = 'ts-moveToBottom ts-ontop';
        enter = 'ts-scaleUp';
        break;
      case 27:
        leave = 'ts-scaleDownCenter';
        enter = 'ts-scaleUpCenter ts-delay400';
        break;
      case 28:
        leave = 'ts-rotateRightSideFirst';
        enter = 'ts-moveFromRight ts-delay200 ts-ontop';
        break;
      case 29:
        leave = 'ts-rotateLeftSideFirst';
        enter = 'ts-moveFromLeft ts-delay200 ts-ontop';
        break;
      case 30:
        leave = 'ts-rotateTopSideFirst';
        enter = 'ts-moveFromTop ts-delay200 ts-ontop';
        break;
      case 31:
        leave = 'ts-rotateBottomSideFirst';
        enter = 'ts-moveFromBottom ts-delay200 ts-ontop';
        break;
      case 32:
        leave = 'ts-flipOutRight';
        enter = 'ts-flipInLeft ts-delay500';
        break;
      case 33:
        leave = 'ts-flipOutLeft';
        enter = 'ts-flipInRight ts-delay500';
        break;
      case 34:
        leave = 'ts-flipOutTop';
        enter = 'ts-flipInBottom ts-delay500';
        break;
      case 35:
        leave = 'ts-flipOutBottom';
        enter = 'ts-flipInTop ts-delay500';
        break;
      case 36:
        leave = 'ts-rotateFall ts-ontop';
        enter = 'ts-scaleUp';
        break;
      case 37:
        leave = 'ts-rotateOutNewspaper';
        enter = 'ts-rotateInNewspaper ts-delay500';
        break;
      case 38:
        leave = 'ts-rotatePushLeft';
        enter = 'ts-moveFromRight';
        break;
      case 39:
        leave = 'ts-rotatePushRight';
        enter = 'ts-moveFromLeft';
        break;
      case 40:
        leave = 'ts-rotatePushTop';
        enter = 'ts-moveFromBottom';
        break;
      case 41:
        leave = 'ts-rotatePushBottom';
        enter = 'ts-moveFromTop';
        break;
      case 42:
        leave = 'ts-rotatePushLeft';
        enter = 'ts-rotatePullRight ts-delay180';
        break;
      case 43:
        leave = 'ts-rotatePushRight';
        enter = 'ts-rotatePullLeft ts-delay180';
        break;
      case 44:
        leave = 'ts-rotatePushTop';
        enter = 'ts-rotatePullBottom ts-delay180';
        break;
      case 45:
        leave = 'ts-rotatePushBottom';
        enter = 'ts-rotatePullTop ts-delay180';
        break;
      case 46:
        leave = 'ts-rotateFoldLeft';
        enter = 'ts-moveFromRightFade';
        break;
      case 47:
        leave = 'ts-rotateFoldRight';
        enter = 'ts-moveFromLeftFade';
        break;
      case 48:
        leave = 'ts-rotateFoldTop';
        enter = 'ts-moveFromBottomFade';
        break;
      case 49:
        leave = 'ts-rotateFoldBottom';
        enter = 'ts-moveFromTopFade';
        break;
      case 50:
        leave = 'ts-moveToRightFade';
        enter = 'ts-rotateUnfoldLeft';
        break;
      case 51:
        leave = 'ts-moveToLeftFade';
        enter = 'ts-rotateUnfoldRight';
        break;
      case 52:
        leave = 'ts-moveToBottomFade';
        enter = 'ts-rotateUnfoldTop';
        break;
      case 53:
        leave = 'ts-moveToTopFade';
        enter = 'ts-rotateUnfoldBottom';
        break;
      case 54:
        leave = 'ts-rotateRoomLeftOut ts-ontop';
        enter = 'ts-rotateRoomLeftIn';
        break;
      case 55:
        leave = 'ts-rotateRoomRightOut ts-ontop';
        enter = 'ts-rotateRoomRightIn';
        break;
      case 56:
        leave = 'ts-rotateRoomTopOut ts-ontop';
        enter = 'ts-rotateRoomTopIn';
        break;
      case 57:
        leave = 'ts-rotateRoomBottomOut ts-ontop';
        enter = 'ts-rotateRoomBottomIn';
        break;
      case 58:
        leave = 'ts-rotateCubeLeftOut ts-ontop';
        enter = 'ts-rotateCubeLeftIn';
        break;
      case 59:
        leave = 'ts-rotateCubeRightOut ts-ontop';
        enter = 'ts-rotateCubeRightIn';
        break;
      case 60:
        leave = 'ts-rotateCubeTopOut ts-ontop';
        enter = 'ts-rotateCubeTopIn';
        break;
      case 61:
        leave = 'ts-rotateCubeBottomOut ts-ontop';
        enter = 'ts-rotateCubeBottomIn';
        break;
      case 62:
        leave = 'ts-rotateCarouselLeftOut ts-ontop';
        enter = 'ts-rotateCarouselLeftIn';
        break;
      case 63:
        leave = 'ts-rotateCarouselRightOut ts-ontop';
        enter = 'ts-rotateCarouselRightIn';
        break;
      case 64:
        leave = 'ts-rotateCarouselTopOut ts-ontop';
        enter = 'ts-rotateCarouselTopIn';
        break;
      case 65:
        leave = 'ts-rotateCarouselBottomOut ts-ontop';
        enter = 'ts-rotateCarouselBottomIn';
        break;
      case 66:
        leave = 'ts-rotateSidesOut';
        enter = 'ts-rotateSidesIn ts-delay200';
        break;
      case 67:
        leave = 'ts-rotateSlideOut';
        enter = 'ts-rotateSlideIn';
        break;
      case 68:
        leave = 'ts-fade ts-ontop';
        enter = 'ts-fade ts-delay200';
        break;
    };
    return { enter: enter, leave: leave };
  };

  mokit.Transition = Transition;

})(mokit);