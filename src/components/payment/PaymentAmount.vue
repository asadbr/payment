<template>
  <div>
    <p class="text-xl mb-2">Укажите сумму платежа</p>
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
    <div class="flex gap-2 items-center mt-2 overflow-x-auto overflow-y-hidden">
      <div
        v-for="(amount, index) in customPaymentAmounts"
        :key="index"
        class="rounded-[10px] bg-gray-100 py-1 px-3 cursor-pointer"
        @click="paymentAmount = amount"
      >
        {{ amount }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheInput from "@/components/TheInput.vue";
import { defineProps, ref, toRefs } from "vue";
import { TPaymentMethod } from "@/types/payments";

type TProps = {
  selectedMethod: TPaymentMethod;
  customPaymentAmounts: number[];
};
const props = defineProps<TProps>();
const { selectedMethod, customPaymentAmounts } = toRefs(props);
const paymentAmount = ref<number | string>("");
</script>
