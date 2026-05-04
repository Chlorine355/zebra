import { NavigationProp } from "@react-navigation/native";

export type NavigationTemplate = {
    Auth: undefined;
    Tabs: undefined;
    Message: undefined;
}

export type LocalNavigationProp = NavigationProp<NavigationTemplate>

export enum ReportStatusEnum {
    pending = 'pending',
    deniedByAdmin = 'denied_by_admin',
    processing = 'processing',
    acceptedAtGAI = 'accepted_at_gai',
    deniedAtGAI = 'denied_at_gai',
}

