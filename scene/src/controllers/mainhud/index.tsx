import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import { openExternalUrl } from '~system/RestrictedActions'
import MainHud from '../../ui/main-hud/mainHudComponent'

export class MainHudController {
  public isVisible: boolean = true
  public isPlayerRollOpen: boolean = false
  public isInfoOpen: boolean = false
  public lastPlayerAttack: number | 'MISSED' = 0
  public lastEnemyAttack: number | 'MISSED' = 0
  public lastPlayerRoll: number = 0
  public lastEnemyRoll: number = 0
  public gainedXP: number = 0

  render(): ReactEcs.JSX.Element {
    return (
      <UiEntity>
        <MainHud
          isPlayerRollOpen={this.isPlayerRollOpen}
          isInfoOpen={this.isInfoOpen}
          playerRollOnClick={this.playerRollVisibility.bind(this)}
          showInfo={this.showInfo.bind(this)}
          openLink={this.openLink.bind(this)}
          // TODO: add player roll
          lastRoll={{
            gainedExperience: this.gainedXP,
            playerRoll: this.lastPlayerRoll,
            enemyRoll: this.lastEnemyRoll,
            playerAttack: this.lastPlayerAttack,
            EnemyAttack: this.lastEnemyAttack
          }}
          // TODO: Add player professions
          playerProfessions={{
            lumberjackLevel: 1,
            butcherLevel: 0,
            miningLevel: 1,
            assasinLevel: 0
          }}
        />
      </UiEntity>
    )
  }

  playerRollVisibility(visibility: boolean): void {
    this.isPlayerRollOpen = visibility
  }

  showInfo(visibility: boolean): void {
    this.isInfoOpen = visibility
  }

  openLink(url: string): void {
    openExternalUrl({ url }).catch(console.error)
  }
}
