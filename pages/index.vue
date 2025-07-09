<template>
  <UContainer class="py-12">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      <!-- Left Column: Intro + Form -->
      <section>
        <h1 class="text-3xl font-bold mb-4">AI Project Manager Assistant</h1>
        <p class="mb-6 text-[var(--ui-color-text-muted)]">
          This intelligent agent will guide you through your project setup, collect details, and generate a professional PDF brief.
        </p>

            <form class="space-y-2 mt-6 w-full" @submit.prevent="startFlow">
            <label for="goal" class="block font-medium">Your Project Goal</label>
            
            <UTextarea
                id="goal"
                v-model="goal"
                placeholder="e.g. Build a mobile app for onboarding"
                :rows="3"
                autoresize
                class="w-full"
            />

            <div class="flex justify-end">
                <UButton type="submit">Start Planning</UButton>
            </div>
            </form>

      </section>

      <!-- Right Column: Timeline -->
      <section>
        <UCard class="p-4">
          <h2 class="text-2xl font-bold mb-4">🗂️ Project Flow</h2>
          <UTimeline :default-value="0" :items="items" />
        </UCard>
      </section>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import type { TimelineItem } from '@nuxt/ui'
const goal = ref('');
const { start, memory, currentPhase } = useAgentFlow()

async function startFlow() {
  if (!goal.value.trim()) return
  await start(goal.value)
  console.log('🧠 Memory after initiation:', memory.value)
}

function nextPhase() {
 // next()
}

const items = ref<TimelineItem[]>([
  {
    date: 'Jul 8, 2025',
    title: 'Initiation Phase',
    description: 'Confirm project intent, gather user consent, and define the goal or need.',
    icon: 'i-lucide-badge-check'
  },
  {
    date: 'Jul 8, 2025',
    title: 'Discovery Phase',
    description: 'Agent collects scope details, constraints, and stakeholder info through guided questions.',
    icon: 'i-lucide-search'
  },
  {
    date: 'Jul 8, 2025',
    title: 'Planning Phase',
    description: 'Based on input, the assistant prepares a draft plan including objectives, deliverables, and timeline.',
    icon: 'i-lucide-calendar-check'
  },
  {
    date: 'Jul 8, 2025',
    title: 'Output & Export',
    description: 'All data is saved, and a clean PDF brief is generated for sharing or archiving.',
    icon: 'i-lucide-file-text'
  }
])

</script>
