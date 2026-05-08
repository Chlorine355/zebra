import { Asset } from "react-native-image-picker";
import { ReportStatusEnum } from "../../../shared/data/types";



export type ReportDataType = {
    violation: string | null; // TODO: make enum
    date: Date | null;
    images: Asset[] | null;
    description: string | null;
    coords: { lat: number; lon: number } | null;
    agree: boolean;
}

export type ReportResponse = {
    // generated on creation
    id: number,
    creationDate: string;
    // from user
    violation: string;
    coords: { lat: number; lon: number };
    datetime: string;
    description: string;
    assets: {
        type: 'photo' | 'video',
        url: string,
    }[];
    // set by backend
    status: ReportStatusEnum;
    // created by smart backend
    gosnomer: string | null;
    address: string | null;
}