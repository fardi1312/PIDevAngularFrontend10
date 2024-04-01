
export interface Schedule {
  scheduleId: number;
  title: string;
  startDate: Date;
  endDate: Date;
  description: string; 
  qrCodeOfferer: string[]; // Array of strings for qrCodeOfferer
  qrCodeRequester: string[]; // Array of strings for qrCodeRequester

}

