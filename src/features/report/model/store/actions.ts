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
        description: report.description!,
        lat: report.coords!.lat,
        lon: report.coords!.lon,
        agree: report.agree,
    }
    const formData = new FormData();
    Object.entries(dataForSending).forEach(([key, value]) => { formData.append(key, value) })
    // report.images?.forEach((image, index) => {
    //     formData.append(`assets[${index}]`, image.base64)
    // });
    formData.append(`asset`, report.images![0].base64)
    return (await apiService.reports.create(formData)).data
});
