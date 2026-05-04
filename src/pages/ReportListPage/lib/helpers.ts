import { VIOLATION_OPTIONS } from "../../../shared/data/common";
import { ReportStatusEnum } from "../../../shared/data/types";
import { ReportCardsResponse } from "./../model/types";

export const loadReportCardsData = async (): Promise<ReportCardsResponse> => {
    // TODO: replace with fetching by axiosInstance with JWT
    const mockData: ReportCardsResponse = [
        {
            id: '57',
            datetime: (new Date()).toISOString(),
            status: ReportStatusEnum.pending,
            violation: VIOLATION_OPTIONS[1].label
        },
        {
            id: '56',
            datetime: (new Date()).toISOString(),
            status: ReportStatusEnum.deniedByAdmin,
            violation: VIOLATION_OPTIONS[1].label
        },
        {
            id: '54',
            datetime: (new Date()).toISOString(),
            status: ReportStatusEnum.processing,
            violation: VIOLATION_OPTIONS[1].label
        },
        {
            id: '55',
            datetime: (new Date()).toISOString(),
            status: ReportStatusEnum.deniedAtGAI,
            violation: VIOLATION_OPTIONS[1].label
        },
        {
            id: '53',
            datetime: (new Date()).toISOString(),
            status: ReportStatusEnum.acceptedAtGAI,
            violation: VIOLATION_OPTIONS[1].label
        },]
    return mockData;
}