/**
 * 任务模块
 */
define(function (require, exports, module) {
    "require:nomunge,exports:nomunge,module:nomunge";
    "use strict";
    
    var $class = require("class");
    var utils = require("utils");

    var Task = $class.create({
        "taskList": [],
        "taskCount": 0,
        "add": function (name, fn) {
            var self = this;
            if (!name && !fn) return this;
            if (name && !fn) {
                fn = name;
                name = utils.newGuid();
            }
            self.taskList.push({ "name": name, "func": fn });
            self.taskCount = self.taskList.length;
            return this;
        },
        "result": {},
        "execute": function (done, isSeq) {
            var self = this;
            if (self.taskList && self.taskList.length > 0) {
                var task = self.taskList.shift();
                if (!task || !task.name || !task.func) {
                    self.taskCount--;
                    return;
                };
                task.func(function (rs) {
                    self.result[task.name] = rs;
                    self.taskCount--;
                    if (self.once) self.once(task.name, rs);
                    if (self.taskCount < 1 && done) {
                        done(self.result);
                    }
                    if (isSeq) self.execute(done, isSeq);
                });
                if (!isSeq) self.execute(done, isSeq);
            }
            return;
        },
        "one": function (done) {
            this.once = done;
            return this;
        },
        "seq": function (done) {
            return this.execute(done, true);
        },
        "end": function (done) {
            return this.execute(done, false);
        }
    });

    exports.create = function () {
        return new Task();
    };

});