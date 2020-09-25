<template>
  <div id="app">
    <div class="page">
      <div class="left">
        <div v-for="(user, i) in users" :key="'user-' + i">
          <div :class="{ 'user-card': true, 'hovered': selectedUser && selectedUser.id === user.id }"
               @mouseover="selectedUser = user">
            <h2 style="margin-bottom: 0;">{{ user.name }}</h2>
            <code>{{ user.email }}</code>
            <div v-if="selectedUser && selectedUser.id === user.id">
              <strong>Raw Data</strong>
              <pre>{{ JSON.stringify(user, null, 2) }}</pre>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <h1 class="posts-banner">{{ selectedUser ? selectedUser.name + "'s" : 'All' }} posts</h1>
        <div class="posts">
          <div v-for="(post, i) in selectedPosts"
               :key="'post-' + i"
               class="post">
            <h1>{{ post.title }}</h1>
            <p>{{ post.body }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      users: [],
      posts: [],
      postsByUserId: {},
      selectedUser: null,
    }
  },
  mounted() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.users = users )

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(posts => {
        this.posts = posts;
        const postsByUserId = {};
        posts.forEach(post => {
          const { userId } = post;
          if (!(userId in postsByUserId)) {
            postsByUserId[userId] = [];
          }
          postsByUserId[userId].push(post);
        });
        this.postsByUserId = postsByUserId;
      })
  },
  computed: {
    selectedPosts() {
      const selectedUser = this.selectedUser;
      return selectedUser
        ? this.postsByUserId[selectedUser.id]
        : this.posts;
    }

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #616c7a;
  width: 100vw;
  height: 100vh;
}
.page {
  display: flex;
  padding: 24px 16px 24px 16px;
  height: 100%;
}
.page .left {
  background: #d7dae3;
  box-shadow: inset 4px 4px 12px #94a5b7;
  border: 1px solid #dee5ec;
  border-radius: 8px;
  padding: 12px;
  margin: 12px;
  flex: 2;
  overflow: scroll;
}
.page .right {
  background: #d7dae3;
  box-shadow: inset 4px 4px 12px #b0b8c1;
  border: 1px solid #dee5ec;
  border-radius: 8px;
  padding: 12px;
  margin: 12px;
  flex: 8;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.posts {
  display: flex;
  flex-wrap: wrap;
}

.user-card {
  background-color: white;
  border-radius: 4px;
  margin-bottom: 8px;
  padding: 12px;
  box-shadow: 2px 2px 6px 1px #c6d0db;
  overflow: scroll;
  transition: all 0.3s;
}
.hovered {
  box-shadow: 2px 2px 10px 1px #9898ab;
  cursor: pointer;
}

.posts-banner {
  font-size: 3em;
  color: #8a52ff;
  text-transform: uppercase;
}

.post {
  background-color: white;
  border-radius: 4px;
  margin: 8px;
  padding: 12px;
  height: auto;
}
</style>
