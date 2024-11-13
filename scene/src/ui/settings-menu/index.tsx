import ReactEcs, { UiEntity } from '@dcl/react-ecs'
import { UiCanvasInformation, engine } from '@dcl/sdk/ecs'
import Canvas from '../canvas/canvas'
import { UIController } from '../../controllers/ui.controller'
import IconButton from '../../components/iconButton'
import { Color4 } from '@dcl/ecs-math'
import { ALMOST_BLACK } from '../../utils/constants'

export class SettingsMenu {
  private uiController: UIController
  private closeButtonColor: Color4 = ALMOST_BLACK

  constructor(uiController: UIController) {
    this.uiController = uiController
  }

  show(): void {
    this.uiController.isSettingsMenuVisible = true
  }

  hide(): void {
    this.uiController.isSettingsMenuVisible = false
  }

  mainUi(): ReactEcs.JSX.Element | null {
    const canvasInfo = UiCanvasInformation.getOrNull(engine.RootEntity)
    if (canvasInfo === null) return null

    return (
      <Canvas>
        <UiEntity
          uiTransform={{
            width: '100%',
            height: '100%',
            position: { left: 0, top: 0 },
            positionType: 'absolute'
          }}
          // onMouseEnter={() => (this.isSideBarVisible = true)}
          // onMouseLeave={() => (this.isSideBarVisible = false)}
          uiText={{
            value: 'Settings',
            textAlign: 'middle-center',
            fontSize: 50
          }}
          uiBackground={{ color: { ...Color4.Black(), a:1 } }}
        >
          <IconButton
            onMouseEnter={() => {
              this.closeButtonColor = Color4.Gray()
            }}
            onMouseLeave={() => {
              this.closeButtonColor = ALMOST_BLACK
            }}
            onMouseDown={() => {
              this.uiController.hideSettingsMenu()
            }}
            uiTransform={{
              width: 20,
              height: 20,
              positionType: 'absolute',
              position: { top: 45, right: 45 }
            }}
            backgroundColor={this.closeButtonColor}
            iconSrc={'assets/images/icons/CloseIcon.png'}
          />
        </UiEntity>
      </Canvas>
    )
  }
}
