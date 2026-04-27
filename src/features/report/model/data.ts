import { Asset } from "react-native-image-picker";

export type ReportDataType = {
    violation: string | null; // TODO: make enum
    date: Date | null;
    images: Asset[] | null;
    description: string | null;
    coords: { lat: number; lon: number } | null;
}