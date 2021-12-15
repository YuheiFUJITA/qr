import {
  Module,
  VuexModule,
  Mutation,
  getModule,
  Action,
} from "vuex-module-decorators";
import { LaunchView, Theme } from "../../models/types";
import store, { initialUnencryptedStorage } from "../index";

export interface ISettingsState {
  theme: Theme;
  isDark: boolean;
  launchView: LaunchView;
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

  public launchView: LaunchView = "Home";

  public get isDark(): boolean {
    return this.theme != "light";
  }

  @Mutation
  public SET_THEME(payload: Theme): void {
    this.theme = payload;
  }

  @Mutation
  public SET_LAUNCH_VIEW(payload: LaunchView): void {
    this.launchView = payload;
  }

  @Action
  public changeTheme(payload: Theme): void {
    this.SET_THEME(payload);
  }

  @Action
  public changeLaunchView(payload: LaunchView): void {
    this.SET_LAUNCH_VIEW(payload);
  }
}

export const SettingsModule = getModule(Settings);
