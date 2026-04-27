import { createStore } from "effector";
import { ReportDataType } from "../data";
import { addImagesEv, changeReportStoreEv, removeImageEv } from "./actions";



const INITIAL_DATA: ReportDataType = {
    violation: null,
    date: null,
    images: null,
    description: null,
    coords: null
}

export const $reportStore = createStore<ReportDataType>(INITIAL_DATA);

$reportStore
    .on(changeReportStoreEv, (state, payload) => ({ ...state, ...payload }))
    .on(addImagesEv, (state, payload) => ({
        ...state,
        images: [...state.images ?? [], ...payload]
    }))
    .on(removeImageEv, (state, payload) => ({
        ...state,
        images: state.images ? state.images?.filter((image) => image.uri !== payload) : null,
    }))

