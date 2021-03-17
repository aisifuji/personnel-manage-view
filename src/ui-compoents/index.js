import XcConside from './xc-conside'
import xcEmpty from './xc-empty'
const components  = {
    install(Vue) {
        Vue.use(XcConside)
        Vue.use(xcEmpty)
    }
}
export default components