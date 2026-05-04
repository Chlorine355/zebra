import { NavigationProp } from "@react-navigation/native";

export type MainStackNavigationTemplate = {
    // describes routes and their props
    Splash: undefined;
    Auth: undefined;
    Tabs: undefined;
    Message: undefined;
    SingleReport: { id: number | string };
}

export type LocalNavigationProp = NavigationProp<MainStackNavigationTemplate>

export enum ReportStatusEnum {
    pending = 'pending',
    deniedByAdmin = 'denied_by_admin',
    processing = 'processing',
    acceptedAtGAI = 'accepted_at_gai',
    deniedAtGAI = 'denied_at_gai',
}

