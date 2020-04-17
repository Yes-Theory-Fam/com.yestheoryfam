import { createContext, Dispatch, SetStateAction } from "react";
import IDiscordUser from "./types/User";

export const UserContext = createContext((<unknown>null) as UserContext);
export interface UserContext {
  user: IDiscordUser | undefined;
  setUser: Dispatch<SetStateAction<IDiscordUser | undefined>>;
}
