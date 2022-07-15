<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <div v-if="!isLoggedIn">
        <router-link to="/login">Login</router-link>
      </div>
      <div v-else>
        <a href="#" @click="logout()">Logout</a>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // token: "Bearer " + this.$store.state.user.token
    };
  },
  mounted() {
    
    axios.get(`${this.$store.getters.baseUrl}/profile`,{
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(response => {
      this.$store.commit("setUser", response.data);
    })
    .catch(error => {
      console.log(error);
    });
  },
  methods:{
    logout(){
      let user = {
        email: '',
        token: ''
      }
      axios.post(`${this.$store.getters.baseUrl}/logout`,{
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(response => {
        if(response.logout){
          this.$store.commit("setUser", user);
          this.$store.commit("setIsLoggedIn", false);
          this.$router.push("/login");
          localStorage.removeItem('token');
          localStorage.removeItem('login');
          window.location.reload();
        }
      })
      .catch(error => {
        console.log(error);
      });
        this.$store.commit("setUser", user);
        this.$store.commit("setIsLoggedIn", false);
        this.$router.push("/login");
        localStorage.removeItem('token');
        localStorage.removeItem('login');
        window.location.reload();

          // let user = {
          //   email: '',
          //   token: ''
          // }
        // this.$store.commit("setUser", user);
        // this.$store.commit("setIsLoggedIn", false);
        // this.$router.push("/login");
    }
  },
  computed: {
    isLoggedIn() {
      return localStorage.getItem("login");
    },
    
  }
}
</script>
