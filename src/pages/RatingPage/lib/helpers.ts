import { StatsType } from "../model/types"

export const loadStatsData = async (): Promise<StatsType> => {
    // TODO: replace with fetching by axiosInstance with JWT
    return {
        pending: 1,
        denied_at_gai: 0,
        processing: 4,
        accepted_at_gai: 3,
        denied_by_admin: 2,
    };
}