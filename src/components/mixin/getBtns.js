import store from '../../store/index';
export default {
    data(){
        return{
            btns:[],
        }
    },
    methods: {
        //获取页面的按钮
        getBtns(){
            var btns = store.state.ButtonByParent;
            this.btns = btns;
        },
    },
    created() {
        this.getBtns();
    },
}