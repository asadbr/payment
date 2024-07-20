<template>
  <div class="mb-[30px]">
    <p class="mb-2">Выберите способ оплаты</p>
    <div
      class="flex flex-wrap gap-4 max-h-[214px] overflow-y-auto overflow-x-hidden mb-[15px]"
    >
      <div
        :class="{
          '!border-[#E2C299]': selectedMethod.title === method.title,
        }"
        class="md:rounded-xl rounded-[10px] relative py-[15px] px-6 flex justify-center items-center shadow-sm h-full border-2 border-white cursor-pointer"
        v-for="(method, index) in paymentMethods"
        :key="index"
        @click="setPaymentMethod(method)"
      >
        <div class="flex items-center h-full gap-x-2">
          <MdRoundAttachMoney class="h-6 w-6" />
          <div class="flex flex-col">
            <p class="font-medium">{{ method.title }}</p>
            <p class="text-gray-400 text-[13px]">
              <span class="text-gray-300">Комиссия: </span>
              {{ method.commission }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center gap-x-2">
      <span :title="`Минимальная сумма: ${selectedMethod.min_amount}`">
        <CaWarningFilled
          class="text-[#CACACA] hover:text-[#212529] min-h-[15px] min-w-[15px] h-[15px] w-[15px]"
        />
      </span>
      <div
        class="flex items-center gap-x-2 cursor-pointer"
        @click="isOpenPaymentInfo = !isOpenPaymentInfo"
      >
        <p class="font-medium text-sm">
          Внимание, при нажатии раскрывается информация про страны
        </p>
        <BsChevronDown
          v-if="!isOpenPaymentInfo"
          class="h-[14px] w-[14px] min-h-[14px] min-w-[14px]"
        />
        <BsChevronUp
          v-else
          class="h-[14px] w-[14px] min-h-[14px] min-w-[14px]"
        />
      </div>
    </div>
    <p v-if="isOpenPaymentInfo">
      {{ selectedMethod.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import {
  BsChevronDown,
  BsChevronUp,
  CaWarningFilled,
  MdRoundAttachMoney,
} from "@kalimahapps/vue-icons";
import { TPaymentMethod } from "@/types/payments";
import { toRefs, defineProps, ref, defineEmits } from "vue";

const emit = defineEmits<{
  (e: "setMethod", value: TPaymentMethod): void;
}>();

type TProps = {
  paymentMethods: TPaymentMethod[];
  selectedMethod: TPaymentMethod;
};
const props = defineProps<TProps>();

const { selectedMethod, paymentMethods } = toRefs(props);
const isOpenPaymentInfo = ref(false);

function setPaymentMethod(method: TPaymentMethod) {
  emit("setMethod", method);
}
</script>
