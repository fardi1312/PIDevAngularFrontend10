import { CollocationOffer } from "./CollocationOffer";
import { CollocationRequest } from "./CollocationRequest";

export interface ExternalEvent {
    id: number;
    title: string;
    start: Date;
    end: Date;
    requestStart: Date;
    requestEnd: Date;
    draggable: boolean;
    collocationRequest: CollocationRequest;
    collocationOffer: CollocationOffer;  
    

  }
  
