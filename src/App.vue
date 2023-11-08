<script setup>

</script>

<template>
  <div class="app">
    <nav class="navigation">
      <RouterLink to="/">Parcel List</RouterLink>
      <RouterLink to="/newParcel">New Parcel</RouterLink>
    </nav>
    <div class="wrapper">
      <RouterView />
    </div>
  </div>
</template>
