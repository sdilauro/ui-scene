import { UiCanvasInformation, engine } from '@dcl/sdk/ecs'
import ReactEcs, {
  UiEntity,
  type UiTransformProps
} from '@dcl/sdk/react-ecs'
import { ALMOST_BLACK, ALMOST_WHITE } from '../utils/constants'
import { Color4 } from '@dcl/sdk/math'

function ArrowToast(props: {
  uiTransform: UiTransformProps
  text: string
  fontSize: number
}): ReactEcs.JSX.Element | null {
  const canvasInfo = UiCanvasInformation.getOrNull(engine.RootEntity)
  if (canvasInfo === null) return null

  return (
    <UiEntity
      uiTransform={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        ...props.uiTransform
      }}
      uiBackground={{
        color:Color4.Black(),
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
    >
      {/* ARROW */}
      <UiEntity
        uiTransform={{
          width: props.fontSize * 3,
          height: props.fontSize * 3,
          positionType: 'absolute',
          position: { top: '30%', left: -props.fontSize * 1 }
        }}
        uiBackground={{
          color: ALMOST_BLACK,
          textureMode:'stretch',
          texture: {
            src: 'assets/images/toastArrow.png'
          }
        }}
      />
      {/* TEXT */}
      <UiEntity
        uiTransform={{
          width: '100%',
          height: '100%'
        }}
        uiText={{
          value: props.text,
          fontSize: props.fontSize,
          color: ALMOST_WHITE,
          textWrap: 'wrap',
          textAlign: 'middle-center'
        }}
        
      ></UiEntity>
    </UiEntity>
  )
}

export default ArrowToast
