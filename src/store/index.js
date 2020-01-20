import Vue from "vue";
import Vuex from "vuex";
import vehicle from "./modules/vehicle";

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      vehicle
    }
  });

  return Store;
}
