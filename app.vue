<template>
  <UContainer class="min-h-screen">
    <NuxtPage />
  </UContainer>
</template>
<script>
onMounted(() => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
  }
});
</script>