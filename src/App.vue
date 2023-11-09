<template>
  <div class="bg-slate-800 text-white">
    <nav class="relative flex flex-wrap items-center justify-between px-2 py-3 bg-slate-900 mb-3">
      <div class="container bg-slate-900 px-5 mx-auto flex flex-wrap items-center justify-between">
          <RouterLink to="/" class="text-purple-100 hover:text-blue-200 px-2 py-1 lg:px-4 lg:py-2 text-lg lg:text-xl font-semibold">
            Parcel List{{' [ '}}<font-awesome-icon :icon="['fas', 'boxes-stacked']" beat/>{{' ]'}}
          </RouterLink>
        <div class="flex flex-col lg:flex-row list-none ml-auto" id="example-navbar-warning">
          <RouterLink to="/newParcel" class="text-purple-100 hover:text-blue-200 px-2 py-1 lg:px-4 lg:py-2 text-lg lg:text-xl font-semibold">
            New Parcel{{'  +'}}<font-awesome-icon :icon="['fas', 'box-open']" bounce />
          </RouterLink>
        </div>
      </div>
    </nav>
    <div class="w-full bg-slate-900">
      <RouterView />
    </div>
  </div>
</template>
<script>

</script>
