import { mainApi } from "./mainApi";
import { TPayment } from "@/types/payments";
import { AxiosResponse } from "axios";

export const paymentsApi = {
  getPaymentTypes(): Promise<AxiosResponse<TPayment>> {
    return mainApi.get("data");
  },
};
