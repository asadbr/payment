<template>
  <div class="relative text-grey-900" ref="containerRef">
    <button
      class="flex items-center justify-between space-x-2 px-4 md:py-3 py-2 rounded-xl w-full"
      type="button"
      :disabled="disabled"
      @click.stop="isOpen = true"
    >
      <span v-if="showSelectedValue" class="text-base whitespace-nowrap">
        {{ buttonTitle || placeholder }}
      </span>
      <BsChevronDown class="min-w-4 min-h-4" />
    </button>

    <ul
      class="absolute -bottom-1.5 z-50 transition-all ease-linear duration-300 translate-y-full w-56 rounded-lg divide-grey-100 bg-white divide-y border-grey-100"
      :class="{
        'max-h-80 overflow-auto shadow-md border': isOpen,
        'max-h-0 overflow-hidden': !isOpen,
      }"
    >
      <li
        v-for="(item, index) in items"
        :key="index"
        class="p-3 text-grey-900 font-normal hover:bg-grey-50 cursor-pointer flex items-center space-x-2"
        @click="handleChange(item)"
        :class="
          selectedOption?.value === item?.value ? 'bg-gray-100' : 'bg-white'
        "
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  watch,
  toRefs,
  computed,
  withDefaults,
  defineProps,
  defineEmits,
} from "vue";
import { useOutsideClick } from "@/composables/useOutsideClick";
import { BsChevronDown } from "@kalimahapps/vue-icons";

type TItem = {
  value: string | number | boolean;
  title: string;
  viewTitle?: string;
};

type TProps = {
  modelValue: string | number | boolean;
  items: TItem[];
  placeholder?: string;
  disabled?: boolean;
  showSelectedValue?: boolean;
};

const props = withDefaults(defineProps<TProps>(), {
  placeholder: "Выберите значение",
  showSelectedValue: true,
});
const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | boolean): void;
}>();

const { items } = toRefs(props);
const isOpen = ref<boolean>(false);
const selectedOption = ref<TItem | undefined>(
  items.value.find((item) => item.value === props.modelValue)
);
const containerRef = ref<HTMLDivElement>();

const buttonTitle = computed<string>(() => {
  return selectedOption.value?.viewTitle || selectedOption.value?.title || "";
});

useOutsideClick(containerRef, () => (isOpen.value = false));

watch(
  () => props.items,
  () => {
    selectedOption.value = props.items.find(
      (item) => item.value === props.modelValue
    );
  },
  { deep: true }
);

watch(
  () => props.modelValue,
  () => {
    if (!props.modelValue) {
      selectedOption.value = undefined;
    } else {
      selectedOption.value = props.items.find(
        (item) => item.value === props.modelValue
      );
    }
  }
);

const handleChange = (value: TItem): void => {
  selectedOption.value = value;
  isOpen.value = false;
  emit("update:modelValue", selectedOption.value.value as string);
};
</script>
