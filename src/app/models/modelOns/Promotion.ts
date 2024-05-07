import { CarpoolingRequest } from "../modelSM/CarpoolingRequest";

export interface Promotion {
    idPromotion: number;
    code: string;
    discountPercentage: number;
    expirationDate: Date;
    expire: boolean;
    carpoolingRequestList: CarpoolingRequest[];
  }