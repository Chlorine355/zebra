import { apiService } from "../../../shared/api/service/apiService";
import { StatsType } from "../model/types"

export const loadStatsData = async (): Promise<StatsType> => {
    return (await apiService.reports.stats()).data;
}