function Hookdemo() {
    //apk原码中对应的函数所在文件路径
    // var utils = Java.use("com.luoge.com.Utils")
    
    // //1.hook其中的getCalc函数
    // //执行后还可以改变代码，重新触发执行
    // utils.getCalc.implementation = function (a, b) {
    //     var result = this.getCalc(a, b);
    //     console.log(`getCalc(${arguments[0]}, ${arguments[1]}): `, result);
    //     return 111; // Modify the return value
    // }

    // //2.hook重载1函数--.overload()方法可以获取重载函数的所有版本
    // utils.getOver.overload().implementation = function() {
    //     let res = this.getOver();
    //     console.log(`getOver(): `, res);
    //     return "hook success";
    // }
    
    // //2.hook重载2
    // utils.getOver.overload("int").implementation = function(a) {
    //     let res = this.getOver(a);
    //     console.log(`getOver(${arguments[0]}): `, res);
    //     return "hook success";
    // }
    //3.hook多重载
    for(var i = 0; i < utils.getOver.overloads.length; i++) {
        utils.getOver.overloads[i].implementation = function() {
            let res = this.getOver.apply(this, arguments);
            console.log(`getOver(${arguments}): `, res);
            return res;
        }
    }
    
}
function main() {
    Java.perform(function(){
        Hookdemo()
    })
}    
main()