import { ReportStatusEnum } from '../../../shared/data/types';
import { ReportResponse } from '../../../features/report/model/types'


export const loadReportData = async (id: number): Promise<ReportResponse> => {
    // TODO: replace with fetching by axiosInstance with JWT
    return {
        id: id,
        creationDate: 'today',
        violation: 'Проезд на красный',
        coords: { lat: 56, lon: 43 },
        datetime: 'yesterday',
        description: 'Опсиание длинное-длинное',
        status: ReportStatusEnum.pending,
        gosnomer: 'С777ВО152',
        address: null,
        assets: [],
    };
}