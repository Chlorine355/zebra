import { ReportDataType } from "../model/data";

type ValidationReturnType = {
    isValid: boolean;
    message?: string;
}

export const validateReport = (report: ReportDataType): ValidationReturnType => {
    if (!report.violation) return { isValid: false, message: 'Не указано нарушение!' }
    if (!report.date) return { isValid: false, message: 'Не указаны дата и время!' }
    if (!report.coords) return { isValid: false, message: 'Не указано примерное местоположение!' }
    if (!report.images?.length) return { isValid: false, message: 'Не прикреплены файлы, подтверждающие нарушение!' }
    if (!report.description) return { isValid: false, message: 'Не указано подробное описание нарушения!' }
    return { isValid: true }
}