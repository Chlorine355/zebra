import { ReportStatusEnum } from "../../../shared/data/types";

export type RepordCardResponse = {
    id: number;
    violation: string;
    datetime: string;
    status: ReportStatusEnum;
}

export type ReportCardsResponse = RepordCardResponse[];