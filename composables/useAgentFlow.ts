export const useAgentFlow = () => {
  const steps = ref([]);
  const currentStep = ref(0);
  const memory = ref({});

  const start = async (goal) => {
    memory.value.goal = goal;
    // Fetch first prompt from Groq...
  };

  const next = async (input) => {
    // Process current step, call Groq, advance
  };

  return {
    steps,
    currentStep,
    memory,
    start,
    next
  };
};
