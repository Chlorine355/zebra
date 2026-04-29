import { StatsType } from "../model/types"

export const loadStatsData = async (): Promise<StatsType> => {
    // TODO: replace with fetching by axiosInstance with JWT
    return {
        pending: 1,
        deniedByAdmin: 0,
        processing: 4,
        acceptedAtGAI: 3,
        deniedAtGAI: 2,
    };
}