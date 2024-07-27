<template>
  <div>
    <p
      class="flex items-center gap-x-1.5 md:text-xl text-sm md:mb-[15px] mb-2.5"
    >
      Выберите валюту оплаты
      <span title="Тут выбирается способ которым вы будете оплачивать">
        <BsQuestionCircleFill
          class="text-[#CACACA] hover:text-[#212529] h-[14px] w-[14px] hidden md:block"
        />
      </span>
    </p>
    <div class="flex flex-wrap gap-x-4 gap-y-[14px] mb-[30px]">
      <div
        class="md:w-[179px] w-[160px] md:h-[68px] h-12"
        @click="setPaymentCurrency('CRYPTO')"
      >
        <div
          @click="isShownOtherCurrencies = false"
          class="md:rounded-xl rounded-[10px] relative py-[15px] px-6 flex justify-center items-center shadow-[0_0_15px_0_rgba(0,0,0,0.06)] h-full border-2 border-white cursor-pointer"
        >
          <div
            class="absolute rounded-[100px] text-white bg-custom-gradient right-[1px] top-[1px] md:text-[10px] text-[9px] md:px-1.5 md:py-[2px] px-[5px] py-[1.5px]"
          >
            Рекомендуем
          </div>
          <div class="flex items-center h-full gap-x-2">
            <IcBitcoinCircle class="h-6 w-6" />
            <p class="font-medium md:text-sm text-[13px] py-0.5">
              Криптовалюты
            </p>
          </div>
        </div>
      </div>
      <div class="md:w-[317px] w-[275px] md:h-[68px] h-12">
        <div
          class="md:rounded-xl rounded-[10px] relative px-2.5 flex justify-center items-center shadow-[0_0_15px_0_rgba(0,0,0,0.06)] h-full w-full"
        >
          <div class="flex items-center w-full h-full py-2">
            <div
              class="flex items-center h-full gap-x-2.5 px-2.5 border-r border-[rgba(0,0,0,0.1)]"
            >
              <img
                src="../../assets/svgs/russia.svg"
                alt="russia flag"
                class="min-h-6 min-w-6 h-6 w-6"
              />
              <span>{{ defaultCurrency }}</span>
            </div>
            <div
              class="px-2.5 flex items-center gap-x-2.5 cursor-pointer"
              @click="isShownOtherCurrencies = !isShownOtherCurrencies"
            >
              <MiRubelCircle class="min-h-6 min-w-6 h-6 w-6" />
              <span class="whitespace-nowrap text-sm"> Другие валюты </span>
              <AkChevronDown
                v-if="!isShownOtherCurrencies"
                class="min-h-4 min-w-4 h-4 w-4"
              />
              <AkChevronUp v-else class="min-h-4 min-w-4 h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isShownOtherCurrencies" class="my-6">
      <div class="flex flex-wrap gap-4">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="md:h-[68px] h-12"
          @click="setPaymentCurrency(item.value)"
        >
          <div
            :class="{
              '!border-[#E2C299]': selectedCurrency === item.value,
            }"
            class="md:rounded-xl rounded-[10px] relative py-[15px] px-6 flex justify-center items-center shadow-[0_0_15px_0_rgba(0,0,0,0.06)] h-full border-2 border-white cursor-pointer"
          >
            <div class="flex items-center h-full gap-x-2">
              <MdRoundAttachMoney class="h-6 w-6" />
              <p class="font-medium text-sm">{{ item.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  BsQuestionCircleFill,
  IcBitcoinCircle,
  MdRoundAttachMoney,
  MiRubelCircle,
  AkChevronDown,
  AkChevronUp,
} from "@kalimahapps/vue-icons";
import { toRefs, defineProps, defineEmits, ref } from "vue";

const emit = defineEmits<{
  (e: "setCurrency", value: string): void;
}>();

type TSelectItem = {
  title: string;
  value: string;
  svg?: string;
};
type TProps = {
  selectedCurrency: string;
  defaultCurrency: string;
  items: TSelectItem[];
};

const isShownOtherCurrencies = ref(false);

const props = defineProps<TProps>();

const { selectedCurrency, items } = toRefs(props);

function setPaymentCurrency(currency: string) {
  emit("setCurrency", currency);
}
</script>
