import { NavigationProp } from "@react-navigation/native";
import { Asset } from "react-native-image-picker";

export type MainStackNavigationTemplate = {
    // describes routes and their props
    Splash: undefined;
    Auth: undefined;
    Signup: undefined;
    Tabs: undefined;
    Message: undefined;
    SingleReport: { id: number };
}

export type LocalNavigationProp = NavigationProp<MainStackNavigationTemplate>

export enum ReportStatusEnum {
    pending = 'pending',
    deniedByAdmin = 'denied_by_admin',
    processing = 'processing',
    acceptedAtGAI = 'accepted_at_gai',
    deniedAtGAI = 'denied_at_gai',
}

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