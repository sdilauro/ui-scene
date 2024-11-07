import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { LoadingUI } from '../ui/loading-and-login/loading'
import { type GameController } from './game.controller'
import { type MainHudController } from './mainhud'
// import Canvas from '../ui/canvas/canvas'
// import * as ui from 'dcl-ui-toolkit'
import { BottomButtonsController } from './bottomButtons'

export class UIController {
  loadingUI: LoadingUI
  // Banner
  gameController: GameController

  mainHud: MainHudController | null = null
  bottomButtons: BottomButtonsController | null = null

  constructor(gameController: GameController) {
    this.gameController = gameController
    this.loadingUI = new LoadingUI(this)

    ReactEcsRenderer.setUiRenderer(this.ui.bind(this))
  }

  showBottomButtons(): void {
    this.bottomButtons = new BottomButtonsController()
  }

  ui(): ReactEcs.JSX.Element {
    return (
      <UiEntity>
        {/* Bottom Buttons */}
        {this.bottomButtons?.render()}
        {/* Loading & Login */}
        {this.loadingUI?.mainUi()}
      </UiEntity>
    )
  }
}
