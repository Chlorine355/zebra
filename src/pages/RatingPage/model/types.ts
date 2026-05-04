import { ReportStatusEnum } from "../../../shared/data/types";

export type StatsType = {
    [ReportStatusEnum.pending]: number;
    [ReportStatusEnum.deniedByAdmin]: number;
    [ReportStatusEnum.processing]: number;
    [ReportStatusEnum.acceptedAtGAI]: number;
    [ReportStatusEnum.deniedAtGAI]: number;
}