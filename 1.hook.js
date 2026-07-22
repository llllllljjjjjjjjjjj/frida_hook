//1.hook其中的getCalc函数
function hook1() {
    //apk原码中对应的函数所在文件路径
    var utils = Java.use("com.luoge.com.Utils")

    //执行后还可以改变代码，重新触发执行
    utils.getCalc.implementation = function (a, b) {
        var result = this.getCalc(a, b);
        console.log(`getCalc(${arguments[0]}, ${arguments[1]}): `, result);
        return 111; // Modify the return value
    }

}
//2.hook重载1函数--.overload()方法可以获取重载函数的所有版本
function hook2() {
    //apk原码中对应的函数所在文件路径
    var utils = Java.use("com.luoge.com.Utils")

    utils.getOver.overload().implementation = function () {
        let res = this.getOver();
        console.log(`getOver(): `, res);
        return "hook success";
    }
}
//3.hook多重载
function hook3() {
    //apk原码中对应的函数所在文件路径
    var utils = Java.use("com.luoge.com.Utils")

    for (var i = 0; i < utils.getOver.overloads.length; i++) {
        utils.getOver.overloads[i].implementation = function () {
            let res = this.getOver.apply(this, arguments);
            console.log(`getOver(${arguments}): `, res);
            return res;
        }
    }
}
//4.hook构造函数-$init.
function hook4() {
    //apk原码中对应的函数所在文件路径
    var money = Java.use("com.luoge.com.Money");
    money.$init.overload('java.lang.String', 'int').implementation = function (str, num) {
        console.log(str, num);
        str = '欧元'
        num = 1000
        this.$init(str, num)
    }
}

//5.主动调用-静态方法(每hook一次都会触发一次)
function hook5() {

    var MD5 = Java.use("com.luoge.com.MD5");
    var res = MD5.md5_1("123456");
    console.log(res);
}

//6.主动调用-实例方法(每hook一次都会触发一次)
function hook6() {
    //在 App 的 Java 堆内存 中扫描所有 com.luoge.com.Money 类的存活实例（即已经被 new 出来、还没被垃圾回收的对象）
    Java.choose("com.luoge.com.Money", {
        onMatch: function (obj) {
            //obj就是实例化对象
            //改实例的属性值的形式“_属性名.value”
            obj._name.value = '林俊杰'

            console.log(obj.getInfo())
        },
        onComplete: function () {
            console.log("扫描完成");


        }
    })
}

//7.hook内部类-需要在类和内部类之间加$符号
function hook7() {
    //apk原码中对应的函数所在文件路径
    var InnerClass = Java.use("com.luoge.com.Money$innerClass");
    InnerClass.$init.overload('java.lang.String', 'int').implementation = function (name, num) {
        name = 'xxxxxx'
        console.log('Hooked innerClass constructor: ');
        console.log('Parameter name:', name)
        console.log('Parameter num:', num)
        this.$init(name, num)
        console.log(this.outPrint())
        return this.$init(name, num)
    }
}

//8.探测结构
function hook8() {
    //枚举加载类的所有方法
    console.log(Java.enumerateLoadedClassesSync().join('\n'));
    var cls = Java.use("com.luoge.com.Money").class;
    // 获取类的全限定名
    console.log(cls.getName());
    // 获取所有构造方法
    var constructors = cls.getDeclaredConstructors();
    for (var i = 0; i < constructors.length; i++) {
        console.log("构造函数 " + i + ": " + constructors[i]);
    }
    //获取所有字段（属性）
    var fields = cls.getDeclaredFields();
    for (var i = 0; i < fields.length; i++) {
        var f = fields[i];
        console.log("字段: " + f.getName() + "，类型: " + f.getType().getName());
    }
    //获取所有内部类
    var innerClasses = cls.getDeclaredClasses();
    for (var i = 0; i < innerClasses.length; i++) {
        console.log("内部类: " + innerClasses[i].getName());
    }


}








function main() {
    Java.perform(function () {
        hook8()
    })
}
main()