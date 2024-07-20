<template>
  <div class="relative text-grey-900" :class="[sizes[size]]" ref="containerRef">
    <button
      class="flex items-center justify-between space-x-2 w-full px-4 py-3.5 rounded-[12px]"
      :class="{
        'rounded-md border-grey-100 border-2': withBorder,
        'border-red focus:!border-red': error && !disabled,
        'bg-white': !disabled,
        'cursor-not-allowed border-grey-50 focus:border-grey-100 text-grey-300 bg-grey-100':
          disabled,
      }"
      type="button"
      :disabled="disabled"
      @click.stop="showDropdown"
    >
      <span
        v-if="showSelectedValue"
        class="text-md"
        :class="[
          !buttonTitle && placeholder
            ? 'text-grey-300'
            : 'md:text-grey-600 text-grey-900 md:font-normal',
        ]"
      >
        {{ buttonTitle || placeholder }}
      </span>
      <SvgIcon
        :name="icon"
        class="transition-all text-grey-300 mb-0 text-xl h-5 w-5"
        :class="{ 'rotate-180': isOpen }"
        :filled="true"
      />
    </button>

    <ul
      class="absolute -bottom-1.5 z-50 transition-all ease-linear duration-300 translate-y-full w-56 rounded-lg divide-grey-100 bg-white divide-y border-grey-100"
      :class="{
        'max-h-80 overflow-auto shadow-md border': isOpen,
        'max-h-0 overflow-hidden': !isOpen,
        'left-0': position === 'left',
        'right-0': position === 'right',
        'w-full': position === 'full',
      }"
    >
      <li
        v-for="(item, index) in items"
        :key="index"
        class="p-3 text-grey-900 font-normal hover:bg-grey-50 cursor-pointer flex items-center space-x-2"
        @click="handleChange(item)"
      >
        <p class="flex items-center">
          <SvgIcon
            v-show="withCheckMark && selectedOption?.value === item?.value"
            name="check"
            class="w-6 h-6 text-primary-500"
            filled
          />
          <span
            :class="selectedOption?.value === item?.value ? 'ml-2' : 'ml-8'"
          >
            {{ item.title }}
          </span>
        </p>
      </li>
    </ul>
  </div>
  <p v-if="error && !disabled" class="text-sm text-red mt-1">
    {{ typeof error === "boolean" ? "" : error }}
  </p>
</template>

<script setup lang="ts">
import { ref, watch, toRefs, computed, withDefaults, defineProps } from "vue";
import { useOutsideClick } from "@/composables/useOutsideClick";

type TItem = {
  value: string | number | boolean;
  title: string;
  viewTitle?: string;
};

const sizes = {
  md: "text-md font-medium",
  sm: "text-sm font-normal",
};

type TProps = {
  withBorder?: boolean;
  position?: "left" | "right" | "full";
  modelValue: string | number | boolean;
  items: TItem[];
  size?: keyof typeof sizes;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  withCheckMark?: boolean;
  icon?: string;
  nativeSelector?: boolean;
  showSelectedValue?: boolean;
  variant?: "primary" | "green";
  id?: string;
};

const props = withDefaults(defineProps<TProps>(), {
  position: "right",
  size: "sm",
  placeholder: "Выберите значение",
  withCheckMark: true,
  showSelectedValue: true,
  icon: "chevron-down",
  variant: "primary",
});
const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | boolean): void;
}>();

const { items } = toRefs(props);
const isOpen = ref<boolean>(false);
const selectedOption = ref<TItem | undefined>(
  items.value.find((item) => item.value === props.modelValue)
);
const nativeSelect = ref(null);
const containerRef = ref<HTMLDivElement>();

const buttonTitle = computed<string>(() => {
  return selectedOption.value?.viewTitle || selectedOption.value?.title || "";
});

useOutsideClick(containerRef, hideDropdown);

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
  emit("update:modelValue", selectedOption.value.value);
};

function hideDropdown() {
  isOpen.value = false;
}

function showDropdown() {
  document.body.click();
  isOpen.value = true;
}

function changeHandler(e: Event) {
  if (e.currentTarget instanceof HTMLSelectElement) {
    emit("update:modelValue", e.currentTarget?.value || "");
  }
}
</script>
