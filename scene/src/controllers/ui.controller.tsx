import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { LoadingUI } from '../ui/loading/loading'
import { type GameController } from './game.controller'
import { MainHudController } from './mainhud'
import Canvas from '../ui/canvas/canvas'
import * as ui from 'dcl-ui-toolkit'

export class UIController {
  loadingUI: LoadingUI
  // Banner
  gameController: GameController

  mainHud: MainHudController | null = null

  constructor(gameController: GameController) {
    this.gameController = gameController
    this.loadingUI = new LoadingUI(this)

    ReactEcsRenderer.setUiRenderer(this.ui.bind(this))
  }

  showMainHud(): void {
    this.mainHud = new MainHudController()
  }

  ui(): ReactEcs.JSX.Element {
    return (
      <UiEntity>
        {/* Main HUD */}
        {this.mainHud?.render()}

        {/* ui utils library */}
        <Canvas>{ui.render()}</Canvas>

        {/* Loadin screen */}
        {this.loadingUI.visible() && this.loadingUI.mainUi()}
      </UiEntity>
    )
  }
}
