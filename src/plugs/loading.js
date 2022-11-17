import loading from "../components/loading";

let $vm = null

export default {
    install(Vue, options) {
        if (!$vm) {
            let myLoading = Vue.extend(loading) //通过Vue.extend()方法创建了一个构造器

            $vm = new myLoading({
                el: document.createElement('div')
            }) //通过构造器创建$vm实例，并挂载在div上

            document.body.appendChild($vm.$el) //插入到Dom节点上
        }


        $vm.isShow = false  //创建一个属性来控制显隐

        let myMethods = {
            show(text) {
                $vm.isShow = true
                $vm.text = text
            },
            hide() {
                $vm.isShow = false
            }
        }

        if (!Vue.$vLoading) {
            Vue.$vLoading = myMethods
            Vue.prototype.$vLoading = Vue.$vLoading  //添加实例方法
        } else {
            console.log('$vLoading方法已被占用')
        }
    }
}
