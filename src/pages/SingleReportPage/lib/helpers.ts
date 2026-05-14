import { apiService } from '../../../shared/api/service/apiService';
import { ReportResponse } from '../../../shared/data/types';


export const loadReportData = async (id: number): Promise<ReportResponse> => {
    // TODO: replace with fetching by axiosInstance with JWT
    return (await apiService.reports.getOne({ id })).data
}