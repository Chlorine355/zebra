import { createEvent } from "effector";
import { ReportDataType } from "../data";
import { Asset } from "react-native-image-picker";

export const changeReportStoreEv = createEvent<Partial<ReportDataType>>();
export const addImagesEv = createEvent<Asset[]>()
export const removeImageEv = createEvent<string>()