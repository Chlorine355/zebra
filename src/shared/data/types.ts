import { NavigationProp } from "@react-navigation/native";

export type NavigationTemplate = {
    Auth: undefined;
    Tabs: undefined;
    Message: undefined;
}

export type LocalNavigationProp = NavigationProp<NavigationTemplate>