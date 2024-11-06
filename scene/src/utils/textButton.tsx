import { UiCanvasInformation, engine } from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import ReactEcs, {
  type Callback,
  UiEntity,
  type UiTransformProps
} from '@dcl/sdk/react-ecs'
import { getGreater } from './ui-utils'

function TextButton(props: {
  uiTransform: UiTransformProps
  normalColor: Color4
  // hoverColor: Color4
  clickedColor: Color4
  isClicked: boolean
  isLoading: boolean
  callback: Callback
  text: string
  fontSize: number
  textColor?: Color4
}): ReactEcs.JSX.Element | null {
  const canvasInfo = UiCanvasInformation.getOrNull(engine.RootEntity)
  if (canvasInfo === null) return null

  const BUTTON_MARGIN = getGreater(canvasInfo.height * 0.01, 2.5)
  //   const ICON_MARGIN = getGreater(canvasInfo.height * 0.01, 2)

  return (
    <UiEntity
      uiTransform={{
        margin: BUTTON_MARGIN,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        ...props.uiTransform
      }}
      uiBackground={{
        color: props.isClicked ? props.clickedColor : props.normalColor,
        textureMode: 'nine-slices',
        texture: {
          src: 'assets/images/buttonBackground100.png'
        },
        textureSlices: {
          top: 0.375,
          bottom: 0.375,
          left: 0.375,
          right: 0.375
        }
      }}
      onMouseDown={props.callback}
    >
      {/* TEXT */}
      <UiEntity
        uiTransform={{
          width: 'auto',
          height: 'auto'
        }}
        uiText={{
          value: props.text,
          fontSize: props.fontSize,
          color: props.textColor ?? Color4.White()
        }}
      >
        {/* ICON */}
        {props.isLoading && (
          <UiEntity
            uiTransform={{
              width: props.fontSize,
              height: props.fontSize,
              positionType: 'absolute',
              position: { top: '25%', left: -1.25 * props.fontSize }
            }}
            uiBackground={{
              textureMode: 'stretch',
              texture: { src: 'assets/images/Spinner.png' }
            }}
          />
        )}
      </UiEntity>
    </UiEntity>
  )
}

export default TextButton
