import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { LoadingUI } from '../ui/loading-and-login/loading'
import { type GameController } from './game.controller'
import { BottomButtonsController } from './bottomButtons'
import { SettingsMenu } from '../ui/settings-menu'
import { MainHud } from '../ui/main-hud'

export class UIController {
  public isSettingsMenuVisible: boolean = false
  loadingAndLogin: LoadingUI
  // Banner
  gameController: GameController

  mainHud: MainHud | null = null
  settingsMenu: SettingsMenu | null = null

  constructor(gameController: GameController) {
    this.gameController = gameController
    this.loadingAndLogin = new LoadingUI(this)
    this.mainHud = new MainHud(this)
    this.settingsMenu = new SettingsMenu(this)

    ReactEcsRenderer.setUiRenderer(this.ui.bind(this))
  }

  hideSettingsMenu(): void {
    this.isSettingsMenuVisible = false
  }

  showSettingsMenu(): void {
    this.isSettingsMenuVisible = true
  }

  ui(): ReactEcs.JSX.Element {
    return (
      <UiEntity>
        {/* Bottom Buttons */}
        {this.mainHud?.mainUi()}
        {this.isSettingsMenuVisible && this.settingsMenu?.mainUi()}
        {/* Loading & Login */}
        {/* {this.loadingAndLogin?.mainUi()} */}
      </UiEntity>
    )
  }
}
