import { createEvent } from "effector";

export type AuthInstanceType = {
    token?: string;
    username?: string;
    password?: string;
}

export const resetAuthInstanceEv = createEvent();
export const clearAuthInstanceEv = createEvent();
export const setAuthInstanceEv = createEvent<AuthInstanceType>();