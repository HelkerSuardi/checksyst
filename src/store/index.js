import Vue from "vue";
import Vuex from "vuex";

import vehicle from "./vehicle";
import check from "./check";
import firefighter from "./firefighter";
import itemEquip from "./item-equip";

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      vehicle,
      check,
      firefighter,
      itemEquip
    }
  });

  return Store;
}
