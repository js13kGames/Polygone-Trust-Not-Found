import { EVENTS } from './constants'
import { Controls } from './elements/controls'
import { Time } from './elements/time'
import { WithEventListener } from './mixins/with-event-listener'

import { IntroWorld } from './worlds/intro'

import { FivePortalWorld } from './worlds/5-portal'
import { FourPortalWorld } from './worlds/4-portal'
import { PortalWorld } from './worlds/portal'
import { SixPortalWorld } from './worlds/6-portal'
import { ThreePortalWorld } from './worlds/3-portal'

import { FiveTownWorld } from './worlds/5-town'
import { FourCastleWorld } from './worlds/4-castle'
import { SixMountainWorld } from './worlds/6-mountain'
import { ThreeVillageWorld } from './worlds/3-village'

class Game {
  constructor (mountPoint) {
    // super(properties)
    this.clock = {
      minute: 0,
      hour: 5,
      day: 1
    }

    // Matches <svg> viewPort
    this._boundingBox = {
      x: 0,
      y: 0,
      h: 100,
      w: 100
    }

    this._eventNode = mountPoint
    this._parent = mountPoint
    this._timeHandle = null
    this._worlds = []

    // TODO: Read from WithEventListener!
    Object.keys(this._getEventMap()).forEach((eventName) => {
      this._eventNode.addEventListener(eventName, this, false)
    })
  }

  addWorlds () {
    const { x, y, h, w } = this._boundingBox

    const properties = {
      boundingBox: {
        x,
        y,
        height: h,
        width: w
      },
      eventNode: this._eventNode,
      parent: this._parent
    }

    const worlds = [{
      ctr: IntroWorld,
      left: PortalWorld.worldName,
      right: PortalWorld.worldName,
      top: PortalWorld.worldName
    }, {
      ctr: PortalWorld,
      left: PortalWorld.worldName,
      right: PortalWorld.worldName,
      top: PortalWorld.worldName
    }, {
      ctr: ThreePortalWorld,
      left: ThreeVillageWorld.worldName,
      right: ThreeVillageWorld.worldName,
      top: PortalWorld.worldName
    }, {
      ctr: ThreeVillageWorld,
      left: ThreePortalWorld.worldName,
      right: ThreePortalWorld.worldName,
      top: ThreeVillageWorld.worldName
    }, {
      ctr: FourPortalWorld,
      left: FourCastleWorld.worldName,
      right: FourCastleWorld.worldName,
      top: PortalWorld.worldName
    }, {
      ctr: FourCastleWorld,
      left: FourPortalWorld.worldName,
      right: FourPortalWorld.worldName,
      top: FourCastleWorld.worldName
    }, {
      ctr: FivePortalWorld,
      left: FiveTownWorld.worldName,
      right: FiveTownWorld.worldName,
      top: FivePortalWorld.worldName
    }, {
      ctr: FiveTownWorld,
      left: FivePortalWorld.worldName,
      right: FivePortalWorld.worldName,
      top: FiveTownWorld.worldName,
    }, {
      ctr: SixPortalWorld,
      left: SixMountainWorld.worldName,
      right: SixMountainWorld.worldName,
      top: SixPortalWorld.worldName
    }, {
      ctr: SixMountainWorld,
      left: SixPortalWorld.worldName,
      right: SixPortalWorld.worldName,
      top: SixMountainWorld.worldName
    }]

    worlds.forEach((w) => {
      const world = new w.ctr(properties)
      this._worlds.push({
        instance: world,
        name: w.ctr.worldName,
        left: w.left,
        right: w.right,
        top: w.top
      })

      world.addScene()
    })
  }

  fireNewTime () {
    this.clock.minute += 1

    if (this.clock.minute >= 60) {
      this.clock.hour += 1
      this.clock.minute -= 60
    }

    if (this.clock.hour >= 24) {
      this.clock.day += 1
      this.clock.hour -= 24
    }

    const event = new CustomEvent(
      EVENTS.TICK,
      { detail: this.clock }
    )
    this._eventNode.dispatchEvent(event)
  }

  getCurrentWorld () {
    return this._worlds.find((world) => world.instance.isActive())
  }

  // TODO: Derive from WithEventListener!
  handleEvent (event) {
    const { detail, isTrusted, target, type } = event
    const callback = this._getEventMap()[ type ]

    if (callback) {
      // Native Events
      if (isTrusted && target) {
        callback(target)
        return
      }

      // Custom Events
      if (!isTrusted && detail) {
        callback(detail)
        return
      }

      // Everything else
      console.warn(`Unknown event type ${type}`)
      callback(event)
      return
    } else {
      console.warn(`No callback for ${event.type}`)
    }
  }

  init () {
    const firstWorld = IntroWorld.worldName

    this.addWorlds()
    // TODO: Only in debug builds?
    this._addTime()
    this._addControls()
    this.switchWorld({ nextWorld: firstWorld })
  }

  pauseTime () {
    clearInterval(this._timeHandle)
  }

  startTime () {
    const fps = 33
    const self = this
    this._timeHandle = setInterval(self.fireNewTime.bind(self), fps)
  }

  switchWorld ({ nextWorld }) {
    const world = this._worlds.find((w) => w.name == nextWorld)
    this._worlds.forEach((world) => world.instance.setInactive())
    console.log('Transitioning to ', nextWorld, world)
    world && world.instance.setActive()
  }

  _addControls () {
    const controlsHeight = 5 * 2
    const controlsWidth = 5 * 3

    // TODO: Consider left-handers!
    const controlsX = this._boundingBox.x + this._boundingBox.w - controlsWidth
    const controlsY = this._boundingBox.y + this._boundingBox.h - controlsHeight

    const properties = {
      boundingBox: {
        x: controlsX,
        y: controlsY,
        height: controlsHeight,
        width: controlsWidth
      },
      eventNode: this._eventNode,
      parent: this._parent
    }

    const controls = new Controls(properties)
  }

  _addTime () {
    const { h, w } = this._boundingBox
    const properties = {
      boundingBox: {
        x: 0.8 * h,
        y: 0.95 * w
      },
      eventNode: this._eventNode,
      parent: this._parent
    }

    const time = new Time(properties)
  }

  _getEventMap () {
    return {
      [ EVENTS.TURN ]: this._handleGameControlsTurn.bind(this),
      [ EVENTS.WORLD ]: this.switchWorld.bind(this)
    }
  }

  _handleGameControlsTurn (eventDetail) {
    const currentWorld = this.getCurrentWorld()
    const nextWorld = currentWorld[ eventDetail.direction ]
    this.switchWorld({ nextWorld })
  }
}

export { Game }
