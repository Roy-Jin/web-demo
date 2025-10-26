/**
 * 定义了一个Obj对象
 * 创建一个Info用于储存对象信息
 */
(function (W) {
    let _ID = 0; // 创建一个 ID 属性

    var Obj = function (_args) {

        // 判断是否用new关键字创建
        if (!new.target) {
            return new Obj(_args);
        };

        // 储存Obj的参数信息
        for (const item in _args) {
            this[item] = _args[item];
        }

        // 计算id属性
        this.id = ++_ID < 10 ? "0" + _ID : ''+_ID;

        _Issues.Log(`[${this.id}] ${this.name? this.name : "Object"} has been created!`);
        return  `[${this.id}] ${this.name? this.name : "Object"} has been created!`;
    }

    // Obj.prototype ==> $
    const $ = Obj.prototype;

    // Obj对象的行为
    (function ($) {

        // 设置属性&行为
        $.set = function (_key, _value) {
            this[_key] = _value;
            return `[${this.id}] ${_key}` + " is set successfully!";
        }

        // 默认行为
        $.define = function () {
            return this;
        }

    }($))

    return W.Obj = Obj;
}(window))