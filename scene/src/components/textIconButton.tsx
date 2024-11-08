import { UiCanvasInformation, engine } from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import ReactEcs, {
  type Callback,
  UiEntity,
  type UiTransformProps
} from '@dcl/sdk/react-ecs'

function TextButton(props: {
  uiTransform: UiTransformProps
  normalColor: Color4
  // hoverColor: Color4
  clickedColor: Color4
  isClicked: boolean
  iconSrc: string
  iconColor: Color4
  callback: Callback
  text: string
  fontSize: number
  textColor?: Color4
}): ReactEcs.JSX.Element | null {
  const canvasInfo = UiCanvasInformation.getOrNull(engine.RootEntity)
  if (canvasInfo === null) return null

  const BUTTON_MARGIN = Math.max(canvasInfo.height * 0.01, 2.5)
  //   const ICON_MARGIN = Math.max(canvasInfo.height * 0.01, 2)

  return (
    <UiEntity
      uiTransform={{
        padding: props.fontSize * 0.3,
        margin: { bottom: BUTTON_MARGIN, top: BUTTON_MARGIN },
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
          top: 0.25,
          bottom: 0.25,
          left: 0.25,
          right: 0.25
        }
      }}
      onMouseDown={props.callback}
    >
      {/* ICON */}

      <UiEntity
        uiTransform={{
          width: 2 * props.fontSize,
          height: 2 * props.fontSize
        }}
        uiBackground={{
          textureMode: 'stretch',
          color: props.iconColor,
          texture: { src: props.iconSrc }
        }}
      />
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
      />
    </UiEntity>
  )
}

export default TextButton
