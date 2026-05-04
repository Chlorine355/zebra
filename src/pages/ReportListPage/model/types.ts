import { ReportStatusEnum } from "../../../shared/data/types";

export type RepordCardResponse = {
    id: string | number;
    violation: string;
    datetime: string;
    status: ReportStatusEnum;
}

export type ReportCardsResponse = RepordCardResponse[];