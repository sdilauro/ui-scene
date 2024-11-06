import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import { type UIController } from '../../controllers/ui.controller'
import Canvas from '../canvas/canvas'
import { getGreater } from '../../utils/ui-utils'
import { TextAlignMode, UiCanvasInformation, engine } from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import {
  CLICKED_PRIMARY_COLOR,
  DCL_DAO_EXPLORERS_DS,
  FAKE_WHITE_COLOR,
  PRIMARY_COLOR,
  SECONDARY_COLOR
} from '../../utils/constants'
import { openExternalUrl } from '~system/RestrictedActions'
import TextButton from '../../utils/textButton'
import * as utils from '@dcl-sdk/utils'



export class LoadingUI {
  private status: 'loading' | 'menu' | 'secure-step' | 'fetching-data' | 'ready-to-start' = 'loading'
  private startIsClicked: boolean = false
  private isVisible: boolean
  private countDown: string = '5:00'
  public timer: number = 2

  private readonly uiController: UIController

  constructor(uiController: UIController) {
    this.uiController = uiController
    this.isVisible = false
  }

  startLoading(): void {
    this.status = 'loading'
    this.isVisible = true
  }

  finishLoading(): void {
    this.status = 'menu'
  }

  visible(): boolean {
    return this.isVisible
  }

  async openLink(url: string): Promise<void> {
    await openExternalUrl({ url })
  }

  mainUi(): ReactEcs.JSX.Element | null {
    const canvasInfo = UiCanvasInformation.getOrNull(engine.RootEntity)
    if (canvasInfo === null) return null

    const LOGO_SIZE: number = getGreater(canvasInfo.height * 0.1, 64)

    // FONT SIZES
    const TITLE_FONT_SIZE: number = getGreater(canvasInfo.height * 0.036, 36)
    const SUBTITLE_FONT_SIZE: number = getGreater(canvasInfo.height * 0.03, 30)
    const PARAGRAPH_FONT_SIZE: number = getGreater(canvasInfo.height * 0.02, 20)
    const BUTTON_FONT_SIZE: number = getGreater(canvasInfo.height * 0.018, 18)
    const CODE_FONT_SIZE: number = getGreater(canvasInfo.height * 0.1, 100)
    
    // BUTTON SIZES
    const BUTTON_HIGHT: number = BUTTON_FONT_SIZE * 3
    const BUTTON_WIDTH: number = BUTTON_HIGHT * 5.7

    return (
      <Canvas>
        <UiEntity
          uiTransform={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          uiBackground={{
            textureMode: 'stretch',
            texture: { src: this.status === 'loading'?'assets/images/login/gradiant-background.png':'assets/images/login/background.png' }
          }}
        >
          {this.status === 'loading' && (
            <UiEntity
              uiTransform={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
              }}
            >
              <UiEntity
                uiTransform={{
                  width: LOGO_SIZE,
                  height: LOGO_SIZE,
                  display: 'flex'
                }}
                uiBackground={{
                  textureMode: 'stretch',
                  texture: { src: 'assets/images/Logo.png' }
                }}
              />

              <UiEntity
                uiTransform={{
                  width: '150',
                  height: '30',
                  positionType: 'absolute',
                  position: { bottom: '5%', right: '5%' }
                }}
                uiBackground={{ color: Color4.create(0, 0, 0, 0.1) }}
                uiText={{ value: 'skip loading screen' }}
                onMouseDown={() => {
                  this.status = 'menu'
                }}
              />
            </UiEntity>
          )}
          {this.status === 'menu' && (
            <UiEntity
              uiTransform={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'flex-start',
                flexDirection: 'column',
                padding: { left: '15%' }
              }}
              uiBackground={{
                textureMode: 'stretch',
                texture: { src: 'assets/images/login/HorizontalVioletGradient.png' }
              }}
            >
              <UiEntity
                uiTransform={{
                  width: 2 * TITLE_FONT_SIZE * 5.3,
                  height: 2 * TITLE_FONT_SIZE,
                  display: 'flex',
                  margin: { bottom: SUBTITLE_FONT_SIZE }
                }}
                uiBackground={{
                  textureMode: 'stretch',
                  texture: { src: 'assets/images/login/LogoWithText.png' }
                }}
              />
              <UiEntity
                uiTransform={{
                  width: '100%',
                  height: 'auto'
                }}
                uiText={{
                  value: 'Discover a virtual social world',
                  fontSize: TITLE_FONT_SIZE,
                  textAlign: 'middle-left'
                }}
              />
              <UiEntity
                uiTransform={{
                  width: '100%',
                  height: 'auto'
                }}
                uiText={{
                  value: 'shaped by its community of',
                  fontSize: SUBTITLE_FONT_SIZE,
                  textAlign: 'middle-left'
                }}
              />
              <UiEntity
                uiTransform={{
                  width: '100%',
                  height: 'auto',
                  margin: { bottom: SUBTITLE_FONT_SIZE }
                }}
                uiText={{
                  value: 'creators & explorers.',
                  fontSize: SUBTITLE_FONT_SIZE,
                  textAlign: 'middle-left'
                }}
              />

              <TextButton
                uiTransform={{
                  width: BUTTON_WIDTH,
                  height: BUTTON_HIGHT
                }}
                normalColor={PRIMARY_COLOR}
                clickedColor={CLICKED_PRIMARY_COLOR}
                isClicked={this.startIsClicked}
                isLoading={this.startIsClicked}
                callback={()=>{
                  this.startIsClicked = true
                  console.log('click start')
                  utils.timers.setTimeout(() => {
                    this.status = 'secure-step'
                  }, 3000)
                }}
                text={'START'}
                fontSize={BUTTON_FONT_SIZE}
              />

  	          {!this.startIsClicked &&
              <TextButton
                uiTransform={{
                  width: BUTTON_WIDTH,
                  height: BUTTON_HIGHT
                }}
                normalColor={SECONDARY_COLOR}
                clickedColor={SECONDARY_COLOR}
                isClicked={false}
                isLoading={false}
                callback={()=>{console.log('Close Explorer')}}
                text={'EXIT'}
                fontSize={BUTTON_FONT_SIZE}
              />}

              {/* THIS IS FOR KEEPING THE FORMAT */}
              {this.startIsClicked &&
              <UiEntity
                uiTransform={{
                  height: BUTTON_HIGHT,
                  margin: getGreater(canvasInfo.height * 0.01, 2.5)
                }}
              />}
            </UiEntity>
          )}
          {this.status === 'secure-step' && 
          (
            <UiEntity
              uiTransform={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'flex-start',
                flexDirection: 'column',
                padding: { left: '15%' }
              }}
              uiBackground={{
                textureMode: 'stretch',
                texture: { src: 'assets/images/login/HorizontalVioletGradient.png' }
              }}
            >
              <TextButton
                uiTransform={{
                  width: BUTTON_HIGHT * 0.7 * 2,
                  height: BUTTON_HIGHT * 0.7
                }}
                normalColor={FAKE_WHITE_COLOR}
                clickedColor={FAKE_WHITE_COLOR}
                isClicked={false}
                isLoading={false}
                callback={()=>{
                  this.startIsClicked = false
                  console.log('click back')
                  utils.timers.setTimeout(() => {
                    this.status = 'menu'
                  }, 100)
                }}
                text={'BACK'}
                fontSize={BUTTON_FONT_SIZE * 0.7}
                textColor={Color4.Black()}
              />
              <UiEntity
                uiTransform={{
                  width: '100%',
                  height: 'auto'
                }}
                uiText={{
                  value: 'Secure sign-in step',
                  fontSize: TITLE_FONT_SIZE,
                  textAlign: 'middle-left'
                }}
              />
              
              <UiEntity
                uiTransform={{
                  width: '100%',
                  height: PARAGRAPH_FONT_SIZE * 3.5 
                }}
                uiText={{
                  value: 'Remember the verification number below.\nYou’ll be prompted to confirm it in your\nweb browser to securely link your sign in.',
                  fontSize: PARAGRAPH_FONT_SIZE,
                  textAlign: 'middle-left'
                }}
              />
              <UiEntity 
                uiTransform={{
                  width: CODE_FONT_SIZE * 1.8,
                  height: CODE_FONT_SIZE,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  flexDirection: 'row',
                  margin: { top: CODE_FONT_SIZE * 0.25 }
                }}
              >
               <UiEntity
                uiTransform={{
                  width: 'auto',
                  height: CODE_FONT_SIZE
                }}
                uiText={{
                  value: '29',
                  fontSize: CODE_FONT_SIZE,
                  textAlign: 'bottom-left'
                }}
              />
              <UiEntity
                uiTransform={{
                  width: PARAGRAPH_FONT_SIZE,
                  height: PARAGRAPH_FONT_SIZE,
                }}
                uiBackground={{
                  textureMode: 'stretch',
                  texture: { src: 'assets/images/InfoButton.png' }
                }}
            />
              </UiEntity>
              <UiEntity
                uiTransform={{
                  width: '100%',
                  height: PARAGRAPH_FONT_SIZE * 0.7
                }}
                uiText={{
                  value: 'Verification number will expire in '+ this.countDown + ' minutes',
                  fontSize: PARAGRAPH_FONT_SIZE * 0.7,
                  textAlign: 'middle-left'
                }}
              />

            </UiEntity>
          )}
          {this.status !== 'loading' && <UiEntity
                uiTransform={{
                  width: (LOGO_SIZE * 4.46) / 2,
                  height: LOGO_SIZE / 2,
                  positionType: 'absolute',
                  position: { bottom: '5%', right: '5%' }
                }}
                uiBackground={{
                  textureMode: 'stretch',
                  texture: { src: 'assets/images/login/DiscordCTA.png' }
                }}
                onMouseDown={() => {
                  this.openLink(DCL_DAO_EXPLORERS_DS)
                }}
              />}
        </UiEntity>
      </Canvas>
    )
  }
}
