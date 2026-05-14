import { createEffect, createEvent } from "effector";
import { Asset } from "react-native-image-picker";
import { ReportDataType } from "../../../../shared/data/types";
import { apiService } from "../../../../shared/api/service/apiService";

export const changeReportStoreEv = createEvent<Partial<ReportDataType>>();
export const addImagesEv = createEvent<Asset[]>()
export const removeImageEv = createEvent<string>()



export const sendReportFx = createEffect(async (report: ReportDataType) => {
    // report came here validated
    const dataForSending = {
        violation: report.violation!,
        datetime: report.date!.toISOString(),
        assets: [], // TODO: use images
        description: report.description!,
        lat: report.coords!.lat,
        lon: report.coords!.lon,
        agree: report.agree
    }
    return (await apiService.reports.create(dataForSending)).data
});