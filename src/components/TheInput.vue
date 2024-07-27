<template>
  <div>
    <div
      @click="setFocus"
      :class="[
        'relative flex rounded-xl bg-white py-2.5 px-3',
        'border-2 border-gray-200',
        { 'border-red-600 focus:!border-red-600': error },
        { 'border-[#E2C299] focus:border-[#E2C299]': isFocused },
      ]"
    >
      <div class="w-full">
        <div
          :class="!isFocused && !displayValue ? 'top-4' : 'top-1.5'"
          v-if="label"
          class="flex -mb-1 absolute left-4 transition-all duration-100"
        >
          <label
            @click.prevent="setFocus"
            :for="id"
            class="block text-[13px] text-dark-70"
          >
            {{ label }}
          </label>
        </div>
        <input
          @focus="isFocused = true"
          @blur="isFocused = false"
          ref="inputRef"
          :id="id"
          v-model="displayValue"
          :disabled="disabled"
          :type="type"
          :inputMode="inputMode"
          class="border-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-500 block w-full text-grey-900 placeholder:text-grey-300 !p-0"
          :class="[
            {
              'cursor-not-allowed border-grey-100 focus:border-grey-100 !bg-grey-100 text-grey-300':
                disabled,
              'px-0': isClear,
              '!text-sm-2': label,
            },
          ]"
          :placeholder="placeholder"
          v-bind="$attrs"
          @input="handleInput"
        />
      </div>
      <div
        v-if="isClear && displayValue"
        class="pl-3 pr-1.5 flex items-center cursor-pointer bg-white"
        @click="clearInput"
      >
        <AkXSmall class="h-6 w-6" />
      </div>
    </div>
    <p v-if="error" class="text-sm text-red-600 mt-1">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { AkXSmall } from "@kalimahapps/vue-icons";
import { ref, watch, withDefaults, defineProps, defineEmits } from "vue";

type TInputMode =
  | "text"
  | "search"
  | "email"
  | "tel"
  | "url"
  | "none"
  | "numeric"
  | "decimal";

type TProps = {
  id?: string;
  label?: string;
  modelValue: string | number;
  type?: string;
  inputMode?: TInputMode;
  isClear?: boolean;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
};

const props = withDefaults(defineProps<TProps>(), {
  id: "input",
  type: "text",
  inputMode: "text",
});
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const displayValue = ref("");
const isFocused = ref(false);
const inputRef = ref();

const setFocus = () => {
  inputRef.value.focus();
};

watch(
  () => props.modelValue,
  () => {
    displayValue.value = props.modelValue.toString();
  },
  {
    immediate: true,
  }
);

const handleInput = (event: Event) => {
  if (!(event?.currentTarget instanceof HTMLInputElement)) {
    return;
  }
  displayValue.value = event.currentTarget.value;
  emit("update:modelValue", event.currentTarget.value);
};

const clearInput = () => {
  displayValue.value = "";
  emit("update:modelValue", "");
};
</script>
