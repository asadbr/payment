<template>
  <div>
    <p class="md:text-xl text-sm mb-2">Укажите сумму платежа</p>
    <TheInput
      v-model="paymentAmount"
      :placeholder="`Минимальная сумма платежа: ${
        selectedMethod.min_amount || 1000
      }₽`"
      isClear
      :error="
        paymentAmount && paymentAmount < selectedMethod.min_amount
          ? `Внимание, минимальная сумма ${selectedMethod.min_amount}₽ `
          : ''
      "
      type="number"
    />
    <div
      class="flex gap-2 items-center mt-2 overflow-x-auto overflow-y-hidden no-scrollbar"
    >
      <div
        v-for="(amount, index) in customPaymentAmounts"
        :key="index"
        class="rounded-[10px] bg-gray-100 py-1 px-3 cursor-pointer border border-white"
        @click="setPayment(amount)"
        :class="{
          '!border-[#E2C299]': paymentAmount === amount,
        }"
      >
        {{ amount }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheInput from "@/components/TheInput.vue";
import { defineEmits, defineProps, ref, toRefs } from "vue";
import { TPaymentMethod } from "@/types/payments";

const emit = defineEmits<{
  (e: "setAmount", value: number): void;
}>();

type TProps = {
  selectedMethod: TPaymentMethod;
  customPaymentAmounts: number[];
};
const props = defineProps<TProps>();
const { selectedMethod, customPaymentAmounts } = toRefs(props);
const paymentAmount = ref<number | string>("");

function setPayment(amount: number) {
  paymentAmount.value = amount;
  emit("setAmount", amount);
}
</script>
