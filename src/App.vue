<template>
  <div class="container h-full px-[15px] md:px-0">
    <div class="py-10">
      <PaymentTitle />
      <PaymentCurrencySelection
        :selectedCurrency="selectedCurrency"
        :defaultCurrency="payment.default_currency || ''"
        :items="selectItems"
        @setCurrency="selectedCurrency = $event"
      />
      <PaymentMethodSelection
        :selectedMethod="selectedMethod"
        :paymentMethods="paymentMethods"
        @setMethod="selectedMethod = $event"
      />
      <PaymentAmount
        :customPaymentAmounts="customPaymentAmounts"
        :selectedMethod="selectedMethod"
        @setAmount="minAmount = $event"
      />
      <div class="w-full mt-6">
        <button
          class="bg-custom-gradient text-white w-full rounded-xl p-4"
          @click="setPayment"
        >
          Оплатить
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { paymentsApi } from "@/api/paymentsApi";
import { TPayment, TPaymentMethod } from "@/types/payments";
import PaymentTitle from "@/components/payment/PaymentTitle.vue";
import PaymentCurrencySelection from "@/components/payment/PaymentCurrencySelection.vue";
import PaymentMethodSelection from "@/components/payment/PaymentMethodSelection.vue";
import PaymentAmount from "@/components/payment/PaymentAmount.vue";

type TSelectItem = {
  title: string;
  value: string;
  svg?: string;
};

const loading = ref(false);
const payment = ref<TPayment>({} as TPayment);
const selectedCurrency = ref("");
const selectItems = ref<TSelectItem[]>([]);
const selectedMethod = ref<TPaymentMethod>({} as TPaymentMethod);
const paymentMethods = ref<TPaymentMethod[]>([]);
const customPaymentAmounts = ref<number[]>([]);
const minAmount = ref(0);

getPaymentMethods();

function getPaymentMethods() {
  loading.value = true;
  paymentsApi
    .getPaymentTypes()
    .then((res) => {
      payment.value = res.data;
      selectedCurrency.value = res.data.default_currency;
      selectItems.value.push(
        ...Object.keys(res.data.currencies).map((currency) => ({
          title: currency,
          value: currency,
        }))
      );
    })
    .finally(() => (loading.value = false));
}

watch(
  () => selectedCurrency.value,
  () => {
    paymentMethods.value = [
      ...payment.value.currencies[selectedCurrency.value],
    ];
  }
);

watch(
  () => selectedMethod.value,
  () => {
    customPaymentAmounts.value = [];
    for (let i = 0; i < 6; i++) {
      customPaymentAmounts.value.push(
        selectedMethod.value.min_amount + i * 1000
      );
    }
  }
);

function setPayment() {
  console.log("selectedMethod.value", selectedMethod.value.min_amount);
  if (selectedMethod.value?.min_amount > minAmount.value) {
    return;
  }
  const tagA = document.createElement("a");
  tagA.href = "https://www.github.com";
  tagA.click();
}
</script>
