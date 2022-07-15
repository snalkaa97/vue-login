import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from "vuex-persist";
window.session_key = "aloalka";
const vuexLocal = new VuexPersistence({
	key: window.session_key,
	storage: window.sessionStorage,
});


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      email: "",
      token: "",
    },
    isLoggedIn: false,
    baseUrl: "http://shayna-backend.local/api",
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setIsLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    }
  },
  getters: {
    user: state => state.user,
    IsLoggedIn: state => state.isLoggedIn,
    baseUrl: state => state.baseUrl,
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
