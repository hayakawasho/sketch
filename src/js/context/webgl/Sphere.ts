import * as THREE from 'three'
import { IStore } from '~/js/defs'
import { inject, injectable } from 'tsyringe'
import { Services } from '~/js/const'
import { when, reaction } from 'mobx'
import { bindAll } from 'lodash-es'
import { Ticker } from '@pixi/ticker'

const defaults = {
  radius: 13
}

@injectable()
export default class extends THREE.Group {
  private _options

  private _ticker: Ticker = new Ticker

  private _geometry: THREE.Geometry

  private _mesh: THREE.Mesh

  private get ww(): number {
    return this._store.windowWidth
  }

  private get wh(): number {
    return this._store.windowHeight
  }

  private get halfX(): number {
    return this._store.windowHalfX
  }

  private get halfY(): number {
    return this._store.windowHalfY
  }

  constructor(@inject(Services.STORE) private _store?: IStore) {
    super()

    this._options = {
      ...defaults
    }

    bindAll(this, '_update')

    this._ticker.maxFPS = 60
    this._ticker.add(this._update)

    when(
      () => this._store.state.siteLoaded,
      () => {
        this._ticker.start()
      }
    )

    reaction(
      () => [this.ww, this.wh],
      ([ww, wh]) => {
        this.position.x = 0
        this.position.y = 0
      }
    )

    this.setup()
  }

  setup() {
		this._geometry = new THREE.IcosahedronGeometry(this._options.radius, 2)

    const material = new THREE.MeshPhongMaterial({
			color: 16777215,
			fog: true,
      wireframe: true,
      opacity: .5,
			transparent: true
    })

    this._mesh = new THREE.Mesh(
      this._geometry,
      material
    )

    this._mesh.scale.set(10, 10, 10)

    this.add(this._mesh)
  }

  private _update(deltaTime) {
		this._mesh.rotation.x += .01
		this._mesh.rotation.y += .01
  }
}

