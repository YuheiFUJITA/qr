import {
  Module,
  VuexModule,
  Mutation,
  getModule,
  Action,
} from "vuex-module-decorators";
import { Theme } from "../../models/types";
import store, { initialUnencryptedStorage } from "../index";

export interface ISettingsState {
  theme: Theme;
  isDark: boolean;
}

const name = "settings";

@Module({
  dynamic: true,
  store,
  name,
  preserveState: Boolean(initialUnencryptedStorage[name]),
})
class Settings extends VuexModule {
  public theme: Theme = "system";

  public get isDark(): boolean {
    return this.theme != "light";
  }

  @Mutation
  public SET_THEME(payload: Theme): void {
    this.theme = payload;
  }

  @Action
  public changeTheme(payload: Theme): void {
    this.SET_THEME(payload);
  }
}

export const SettingsModule = getModule(Settings);
