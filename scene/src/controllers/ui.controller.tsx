import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { LoadingUI } from '../ui/loading-and-login/loading'
import { MainHud } from '../ui/main-hud'
import { MainMenu } from '../ui/menu'
import { type GameController } from './game.controller'

export class UIController {
  public isSettingsMenuVisible: boolean = false
  public isBackpackMenuVisible: boolean = false
  public isMainMenuVisible: boolean = true
  loadingAndLogin: LoadingUI
  // Banner
  gameController: GameController

  mainHud: MainHud | null = null
  menu: MainMenu | null = null

  constructor(gameController: GameController) {
    this.gameController = gameController
    this.loadingAndLogin = new LoadingUI(this)
    this.mainHud = new MainHud(this)
    this.menu = new MainMenu(this)

    ReactEcsRenderer.setUiRenderer(this.ui.bind(this))
  }

  ui(): ReactEcs.JSX.Element {
    return (
      <UiEntity>
        {/* Bottom Buttons */}
        {this.mainHud?.mainUi()}
        {this.isMainMenuVisible && this.menu?.mainUi()}

        {/* Loading & Login */}
        {/* {this.loadingAndLogin?.mainUi()} */}
      </UiEntity>
    )
  }
}
