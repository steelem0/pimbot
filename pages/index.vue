<template>
  <section class="py-12 max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold mb-4">AI Project Manager Assistant</h1>
    <p class="mb-6">
      This intelligent agent will guide you through your project setup, collect details, and generate a professional PDF brief.
    </p>

    <form class="space-y-4" @submit.prevent="startFlow">
      <div>
        <label for="goal" class="block font-medium mb-1">Your Project Goal</label>
        <UInput id="goal" v-model="goal" placeholder="e.g. Build a mobile app for onboarding" />
      </div>

      <UButton type="submit">Start Planning</UButton>
    </form>
  </section>
</template>

<script setup lang="ts">
const goal = ref('');
const { start } = useAgentFlow();

function startFlow() {
  if (goal.value) {
    start(goal.value);
  }
}
</script>
