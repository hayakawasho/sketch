import AbstractPage from '~/js/abstracts/AbstractPage'
import { inject, autoInjectable } from 'tsyringe'
import { IModuleLoader, IEventBus } from '~/js/defs'
import { Services, Events } from '~/js/const'

@autoInjectable()
export default class DefaultPage extends AbstractPage {
  constructor(
    @inject(Services.MODULE_LOADER) _moduleLoader?: IModuleLoader,
    @inject(Services.EVENT_BUS) bus?: IEventBus
  ) {
    super(_moduleLoader, bus)

    this._setup()
  }

  protected initEvents() {
    this.bus.on(Events.AFTER_PAGE_BOOT, this.onAfterPageLoad)
  }

  protected destroyEvents() {
    this.bus.off(Events.AFTER_PAGE_BOOT, this.onAfterPageLoad)
  }

  private _setup() {

  }

  protected onAfterPageLoad() {

  }
}
