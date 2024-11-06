import ReactEcs, { ReactEcsRenderer } from '@dcl/sdk/react-ecs'
import MainHud from '../../ui/main-hud/mainHudComponent'
import { openExternalUrl } from '~system/RestrictedActions'


export class UI {
  public isVisible: boolean
  public isPlayerRollOpen: boolean
  public isInfoOpen: boolean

  constructor() {
    this.isVisible = true
    this.isPlayerRollOpen = false
    this.isInfoOpen = false
    const uiComponent = (): ReactEcs.JSX.Element[] => [this.mainHudUI()]
    ReactEcsRenderer.setUiRenderer(uiComponent)
  }

  mainHudUI(): ReactEcs.JSX.Element {
    return (
      <MainHud
        isPlayerRollOpen={this.isPlayerRollOpen}
        isInfoOpen={this.isInfoOpen}
        playerRollOnClick={this.playerRollVisibility.bind(this)}
        showInfo={this.showInfo.bind(this)}
        openLink={() => this.openLink.bind(this)}
        lastRoll={{
          gainedExperience: 25,
          playerRoll: 12,
          enemyRoll: 4,
          playerAttack: 50,
          EnemyAttack: 'MISSED'
        }}
        playerProfessions={{
          lumberjackLevel: 1,
          butcherLevel: 0,
          miningLevel: 1,
          assasinLevel: 0
        }}
      />
    )
  }

  playerRollVisibility(visibility: boolean): void {
    this.isPlayerRollOpen = visibility
  }

  showInfo(visibility: boolean): void {
    this.isInfoOpen = visibility
  }

  async openLink(url: string): Promise<void> {
    await openExternalUrl({ url })
  }
}

export let gameUi: UI
export function main(): void {
  // all the initializing logic
  gameUi = new UI()
}
