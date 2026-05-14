import { apiService } from "../../../shared/api/service/apiService";
import { ReportCardsResponse } from "./../model/types";

export const loadReportCardsData = async (): Promise<ReportCardsResponse> => {
    return (await apiService.reports.getAll()).data;
}