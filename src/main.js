import './public-path';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';
import '@/permission'
let routers = null;
let instance = null;

function render(props = {}) {
  //const { container,appRouters } = props;
  const { container } = props;
  instance = createApp(App);
  // if (appRouters.length > 0) {
  //   appRouters.forEach(element => {
  //     router.addRoute(element)
  //     router.options.routes.push(element)
  //   })
  // }
  routers =  router
  // console.log(JSON.stringify(routers.options.routes))
  instance.use(routers);
  instance.use(store);
  instance.mount(container ? container.querySelector('#app') : '#app');
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('%c ', 'color: green;', 'vue3.0 app bootstraped');
}

function storeTest(props) {
  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      (value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
      true,
    );
  props.setGlobalState &&
    props.setGlobalState({
      ignore: props.name,
      user: {
        name: props.name,
      },
    });
}

export async function mount(props) {
  debugger
  storeTest(props);
  render(props);
  instance.config.globalProperties.$onGlobalStateChange = props.onGlobalStateChange;
  instance.config.globalProperties.$setGlobalState = props.setGlobalState;
}

export async function unmount() {
 debugger
  instance.unmount();
  instance._container.innerHTML = '';
  instance = null;
  routers = null;
}
