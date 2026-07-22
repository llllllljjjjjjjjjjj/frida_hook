function Hookdemo() {
    //apk原码中对应的函数所在文件路径
    var utils = Java.use("com.luoge.com.Money");
    money.$init.overload('java.lang.String', 'int').implementation = function (str, num) {
        console.log(str, num);
        str = '欧元'
        num = 1000
        this.$init(str, num)
    }
    
   
}
function main() {
    Java.perform(function(){
        Hookdemo()
    })
}    
main()