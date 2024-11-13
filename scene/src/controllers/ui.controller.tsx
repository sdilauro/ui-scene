import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { LoadingUI } from '../ui/loading-and-login/loading'
import { type GameController } from './game.controller'
import { MainHud } from '../ui/main-hud/mainHud'
import { BottomButtonsController } from './bottomButtons'

export class UIController {
  loadingAndLogin: LoadingUI
  // Banner
  gameController: GameController

  mainHud: MainHud | null = null
  bottomButtons: BottomButtonsController | null = null

  constructor(gameController: GameController) {
    this.gameController = gameController
    this.loadingAndLogin = new LoadingUI(this)
    this.mainHud = new MainHud(this)

    ReactEcsRenderer.setUiRenderer(this.ui.bind(this))
  }

  showBottomButtons(): void {
    this.bottomButtons = new BottomButtonsController()
  }

  ui(): ReactEcs.JSX.Element {
    return (
      <UiEntity>
        {/* Bottom Buttons */}
        {this.mainHud?.mainUi()}
        {/* Loading & Login */}
        {/* {this.loadingAndLogin?.mainUi()} */}
      </UiEntity>
    )
  }
}
