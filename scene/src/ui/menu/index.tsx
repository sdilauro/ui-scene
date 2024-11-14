import { engine, UiCanvasInformation } from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import IconButton from '../../components/iconButton'
import { UIController } from '../../controllers/ui.controller'
import { ALMOST_BLACK } from '../../utils/constants'
import { BackpackPage } from '../backpack-page'
import Canvas from '../canvas/canvas'
import { MapPage } from '../map-page'
import { SettingsPage } from '../settings-page'

export type MenuPage = 'map' | 'backpack' | 'settings'
const SELECTED_BUTTON_COLOR: Color4 = { ...Color4.Gray(), a: 0.3 }

export class MainMenu {
  public activePage: MenuPage | undefined
  private readonly uiController: UIController
  private backpackIcon: string = 'assets/images/navbar/Backpack off.png'
  private mapIcon: string = 'assets/images/navbar/Map off.png'
  private settingsIcon: string = 'assets/images/navbar/Settings off.png'

  private closeButtonColor: Color4 = ALMOST_BLACK

  private backpackHint: boolean = false
  private mapHint: boolean = false
  private settingsHint: boolean = false

  private backpackBackground: Color4 = Color4.create(0, 0, 0, 0)
  private mapBackground: Color4 = Color4.create(0, 0, 0, 0)
  private settingsBackground: Color4 = Color4.create(0, 0, 0, 0)

  private settingsPage :  SettingsPage
  private backpackPage : BackpackPage
  private mapPage : MapPage

  constructor(uiController: UIController) {
    this.uiController = uiController
    this.settingsPage = new SettingsPage()
    this.backpackPage = new BackpackPage()
    this.mapPage = new MapPage()
  }

  mapEnter(): void {
    this.mapIcon = 'assets/images/navbar/Map on.png'
    this.mapBackground = SELECTED_BUTTON_COLOR
    this.mapHint = true
    console.log('on mouse enter map')
  }

  mapLeave(): void {
    this.mapIcon = 'assets/images/navbar/Map off.png'
    this.mapBackground = Color4.create(0, 0, 0, 0)
    this.mapHint = false
    console.log('on mouse leave map')
  }

  backpackEnter(): void {
    this.backpackIcon = 'assets/images/navbar/Backpack on.png'
    this.backpackBackground = SELECTED_BUTTON_COLOR
    this.backpackHint = true
    console.log('on mouse enter backpack')
  }

  backpackLeave(): void {
    this.backpackIcon = 'assets/images/navbar/Backpack off.png'
    this.backpackBackground = Color4.create(0, 0, 0, 0)
    this.backpackHint = false
    console.log('on mouse leave backpack')
  }

  settingsEnter(): void {
    this.settingsIcon = 'assets/images/navbar/Settings on.png'
    this.settingsBackground = SELECTED_BUTTON_COLOR
    this.settingsHint = true
    console.log('on mouse enter settings')
  }

  settingsLeave(): void {
    this.settingsIcon = 'assets/images/navbar/Settings off.png'
    this.settingsBackground = Color4.create(0, 0, 0, 0)
    this.settingsHint = false
    console.log('on mouse leave settings')
  }

  hide(): void {
    this.uiController.isMainMenuVisible = false
    this.closeButtonColor = ALMOST_BLACK
  }

  show(page: MenuPage): void {
    this.activePage = page
    this.uiController.isMainMenuVisible = true
  }

  mainUi(): ReactEcs.JSX.Element | null {
    const canvasInfo = UiCanvasInformation.getOrNull(engine.RootEntity)
    if (canvasInfo === null) return null

    const sideBarHeight: number = Math.max(canvasInfo.height * 0.024, 46)
    const buttonSize: number = sideBarHeight * 0.9

    return (
      <Canvas>
        <UiEntity
          uiTransform={{
            width: '100%',
            height: '100%',
            flexDirection:'column',
            justifyContent:'flex-start',
            alignItems:'center'
          }}
          uiBackground={{
            textureMode:'stretch',
            texture:{src:'assets/images/menu/Background.png'}
          }}
        >
            <UiEntity
                uiTransform={{
                width: '100%',
                height: '10%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row'
                }}
                uiBackground={{
                color: { ...Color4.Black(), a: 1 }
                }}
            >
                <UiEntity
                uiTransform={{
                    width: '100%',
                    height: 'auto',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}
                >
                <IconButton
                    uiTransform={{ height: buttonSize, width: buttonSize }}
                    onMouseEnter={() => {
                    this.mapEnter()
                    }}
                    onMouseLeave={() => {
                    this.mapLeave()
                    }}
                    onMouseDown={() => {
                        this.show('map')
                    }}
                    backgroundColor={this.mapBackground}
                    iconSrc={this.mapIcon}
                    hintText={'Map [M]'}
                    showHint={this.mapHint}
                />

                <IconButton
                    uiTransform={{ height: buttonSize, width: buttonSize }}
                    onMouseEnter={() => {
                    this.backpackEnter()
                    }}
                    onMouseLeave={() => {
                    this.backpackLeave()
                    }}
                    onMouseDown={() => {
                    this.show('backpack')
                    }}
                    backgroundColor={this.backpackBackground}
                    iconSrc={this.backpackIcon}
                    hintText={'Backpack'}
                    showHint={this.backpackHint}
                />

                <IconButton
                    uiTransform={{ height: buttonSize, width: buttonSize }}
                    onMouseEnter={() => {
                    this.settingsEnter()
                    }}
                    onMouseLeave={() => {
                    this.settingsLeave()
                    }}
                    onMouseDown={() => {
                    this.show('settings')
                    }}
                    backgroundColor={this.settingsBackground}
                    iconSrc={this.settingsIcon}
                    hintText={'Settings'}
                    showHint={this.settingsHint}
                />
                </UiEntity>


                <IconButton
                    onMouseEnter={() => {
                    this.closeButtonColor = Color4.Gray()
                    }}
                    onMouseLeave={() => {
                    this.closeButtonColor = ALMOST_BLACK
                    }}
                    onMouseDown={() => {
                    this.hide()
                    }}
                    uiTransform={{
                    width: 20,
                    height: 20,
                    positionType: 'absolute',
                    position: { right: 45 }
                    }}
                    backgroundColor={this.closeButtonColor}
                    iconSrc={'assets/images/icons/CloseIcon.png'}
                />

            </UiEntity>
            <UiEntity
            uiTransform={{
                width: '100%',
                height: 'auto',
                flexGrow:1
            }}
            >
            
            {this.activePage === 'map' && (
                this.mapPage.mainUi()
            )}
            {this.activePage === 'backpack' && (
                this.backpackPage.mainUi()
            )}
            {this.activePage === 'settings' && (
                this.settingsPage.mainUi()
            )}
            
            </UiEntity>
        </UiEntity>
      </Canvas>
    )
  }
}
