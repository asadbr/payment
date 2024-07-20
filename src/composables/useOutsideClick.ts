import { onBeforeMount, onMounted, Ref } from "vue";

export const useOutsideClick = (
  targetRef: Ref<HTMLDivElement | undefined>,
  callback: (event: Event) => void
) => {
  const handler: EventListener = (event: Event) => {
    if (
      targetRef.value &&
      !targetRef.value.contains(event.target as HTMLElement)
    ) {
      callback(event);
    }
  };

  onMounted(() => {
    document.addEventListener("click", handler);
  });

  onBeforeMount(() => {
    document.removeEventListener("click", handler);
  });
};
