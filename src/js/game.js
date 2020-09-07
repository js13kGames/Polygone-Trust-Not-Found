import { EVENTS } from './constants'
import { Canvas } from './elements/canvas'
import { Controls } from './elements/controls'
import { Time } from './elements/time'
import { WithEventListener } from './mixins/with-event-listener'

import { Navigation } from './elements/navigation'
import { TabDebug } from './elements/tab-debug'
import { TabInventory } from './elements/tab-inventory'
import { TabMemory } from './elements/tab-memory'
import { TabSettings } from './elements/tab-settings'

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

/**
 * Main instance of the game
 */
class Game {
  /**
   * @param {HTMLElement} mountPoint - Topmost element in HTML.
   */
  constructor (mountPoint) {
    // super(properties)
    /**
     * Game time
     * @public
     * @type {{}}
     * @property {Number} minute
     * @property {Number} hour
     * @property {Number} day
     */
    this.clock = {
      minute: 0,
      hour: 5,
      day: 1
    }

    // Matches <svg> viewBox
    /**
     * Render element within these dimension.
     * @protected
     * @type {{}}
     * @property {Number} x - Left edge
     * @property {Number} y - Top edge
     * @property {Number} h - Height
     * @property {Number} w - Width
     */
    this._boundingBox = {
      x: 0,
      y: 0,
      h: 100,
      w: 100
    }

    /**
     * Element, to disparch events on.
     * @protected
     * @type {HTMLElement}
     */
    this._eventNode = mountPoint

    /**
     * Element which becomes parent of this element.
     * @protected
     * @type {HTMLElement}
     */
    this._parent = mountPoint

    /**
     * Holds return value of setInterval.
     * @private
     * @type {Number|null}
     */
    this.__timeHandle = null

    /**
     * A list of all available worlds.
     * @private
     * @type {Array<World>}
     */
    this.__worlds = []

    // TODO: Read from WithEventListener!
    Object.keys(this._getEventMap()).forEach((eventName) => {
      this._eventNode.addEventListener(eventName, this, false)
    })

    this._mount(mountPoint)
  }

  /**
   * Mount all worlds on startup.
   * @public
   */
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
      parent: this.canvas.element
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
      this.__worlds.push({
        instance: world,
        name: w.ctr.worldName,
        left: w.left,
        right: w.right,
        top: w.top
      })

      world.addScene()
    })
  }

  /**
   * Update game time.
   * @public
   * @fires {Game:time:update}
   * @todo Fix Event documentation
   */
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

    /**
     * @event Game:time:update
     * @type {{}}
     * @property {{}}     detail
     * @property {Number} detail.hour
     * @property {Number} detail.minute
     * @property {Number} detail.day
     */
    const event = new CustomEvent(
      EVENTS.TICK,
      { detail: this.clock }
    )
    this._eventNode.dispatchEvent(event)
  }

  /**
   * Returns active world.
   * @public
   * @returns {BaseWorld|undefined}
   */
  getCurrentWorld () {
    return this.__worlds.find((world) => world.instance.isActive())
  }

  // TODO: Derive from WithEventListener!
  /**
   * Implements EventListener interface.
   * @param {Event} event
   */
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

  /**
   * Implements initialisation logic.
   * @public
   */
  init () {
    const firstWorld = IntroWorld.worldName

    this.addWorlds()
    // TODO: Only in debug builds?
    this.__addTime()
    this.__addControls()
    this.switchWorld({ nextWorld: firstWorld })
  }

  /**
   * Halts the game time.
   * @public
   */
  pauseTime () {
    clearInterval(this.__timeHandle)
  }

  /**
   * Starts the game time.
   * @public
   */
  startTime () {
    const fps = 33
    const self = this
    this.__timeHandle = setInterval(self.fireNewTime.bind(self), fps)
  }

  /**
   * Switches to another world
   * @param {{}} world
   * @param {string} world.nextWorld The world to switch to.
   * @todo Align with implementation of PortalWorld.
   */
  switchWorld ({ nextWorld }) {
    const world = this.__worlds.find((w) => w.name == nextWorld)
    this.__worlds.forEach((world) => world.instance.setInactive())
    console.log('Transitioning to ', nextWorld, world)
    world && world.instance.setActive()
  }

  /**
   * Lists all interesting events with their handlers.
   * @protected
   * @returns {Array<EventMap>}
   */
  _getEventMap () {
    return {
      [ EVENTS.TURN ]: this.__handleGameControlsTurn.bind(this),
      [ EVENTS.WORLD ]: this.switchWorld.bind(this)
    }
  }

  /**
   * Logic to add this element to DOM.
   * @protected
   * @param {HTMLElement} parent
   */
  _mount (parent) {
    const properties = {
      boundingBox: {
        x: 0,
        y: 0,
        height: 100,
        width: 100
      },
      parent: this._parent,
      eventNode: this._eventNode
    }

    this.navigation = new Navigation(properties)
    this.__mountTabViews(properties)
    this.canvas = new Canvas(properties)
  }

  /**
   * Adding Controls element to game.
   * @private
   */
  __addControls () {
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
      parent: this.canvas.element
    }

    const controls = new Controls(properties)
  }

  /**
   * Adds time element to game.
   * @private
   */
  __addTime () {
    const { h, w } = this._boundingBox
    const properties = {
      boundingBox: {
        x: 0.8 * h,
        y: 0.95 * w
      },
      eventNode: this._eventNode,
      parent: this.canvas.element
    }

    const time = new Time(properties)
  }

  /**
   * Triggers world switch on event.
   * @private
   * @param {{}}     eventDetail           Custom Event detail property.
   * @param {string} eventDetail.direction The clicked control.
   */
  __handleGameControlsTurn (eventDetail) {
    const currentWorld = this.getCurrentWorld()
    const nextWorld = currentWorld[ eventDetail.direction ]
    this.switchWorld({ nextWorld })
  }

  /**
   * Add Tab views to DOM.
   * @private
   * @param {{}}          properties
   * @param {{}}          properties.boundingBox
   * @param {Number}      properties.boundingBox.x
   * @param {Number}      properties.boundingBox.y
   * @param {Number}      properties.boundingBox.height
   * @param {Number}      properties.boundingBox.width
   * @param {HTMLElement} properties.eventNode
   * @param {HTMLElement} properties.parent
   */
  __mountTabViews (properties) {
    this.tabs = [{
      id: 'inventory',
      ref: new TabInventory(properties),
    }, {
      id: 'memory',
      ref: new TabMemory(properties)
    }, {
      id: 'settings',
      ref: new TabSettings(properties)
    }, {
      id: 'debug',
      ref: new TabDebug(properties)
    }]
  }
}

export { Game }
