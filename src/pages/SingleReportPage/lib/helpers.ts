import { apiService } from '../../../shared/api/service/apiService';
import { ReportResponse } from '../../../shared/data/types';


export const loadReportData = async (id: number): Promise<ReportResponse> => {
    return (await apiService.reports.getOne({ id })).data
}