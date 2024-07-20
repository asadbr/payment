<template>
  <div>
    <p class="flex items-center gap-x-1 text-xl mb-[15px]">
      Выберите валюту оплаты
      <span title="Тут выбирается способ которым вы будете оплачивать">
        <BsQuestionCircleFill
          class="text-[#CACACA] hover:text-[#212529] h-[14px] w-[14px]"
        />
      </span>
    </p>
    <div class="flex flex-wrap gap-6 mb-[30px]">
      <div
        class="md:w-[179px] w-[160px] md:h-[68px] h-[48px]"
        @click="selectedCurrency = 'CRYPTO'"
      >
        <div
          :class="{
            '!border-[#E2C299]': selectedCurrency === 'CRYPTO',
          }"
          class="md:rounded-xl rounded-[10px] relative py-[15px] px-6 flex justify-center items-center shadow-sm h-full border-2 border-white cursor-pointer"
        >
          <div
            class="absolute rounded-[100px] md:py-0.5 py-[1px] md:px-1.5 px-1 text-white bg-custom-gradient md:text-[10px] text-[9px] right-0.5 top-0.5"
          >
            Рекомендуем
          </div>
          <div class="flex items-center h-full gap-x-2">
            <CiBitcoin class="h-6 w-6" />
            <p class="font-medium text-sm">Криптовалюты</p>
          </div>
        </div>
      </div>
      <div class="md:w-[317px] w-[275px] md:h-[68px] h-[48px]">
        <div
          class="md:rounded-xl rounded-[10px] relative py-[15px] px-6 flex justify-center items-center shadow-sm h-full w-full"
        >
          <div class="flex items-center w-full divide-x">
            <div class="flex items-center h-full md:gap-x-4 gap-x-2 px-3">
              <img
                src="./assets/svgs/russia.svg"
                alt="russia flag"
                class="min-h-6 min-w-6 h-6 w-6"
              />
              <span>{{ selectedCurrency }}</span>
            </div>
            <div class="w-full">
              <TheSelect
                :modelValue="selectedCurrency"
                :items="selectItems"
                @update:modelValue="setPaymentCurrency"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BsQuestionCircleFill, CiBitcoin } from "@kalimahapps/vue-icons";
import TheSelect from "@/components/TheSelect.vue";
import { toRefs, defineProps } from "vue";

type TSelectItem = {
  title: string;
  value: string;
  svg?: string;
};
type TProps = {
  selectedCurrency: string;
  selectItems: TSelectItem[];
};

const props = defineProps<TProps>();

const { selectedCurrency, selectItems } = toRefs(props);

function setPaymentCurrency(currency: string) {
  selectedCurrency.value = currency;
}
</script>
