/**
 * @file
 * Let me take the chance to share a bit about the history of this game.
 * When reading the source code, you might wonder, why there are 3- elements
 * and worlds. Well, I started developing this code during vacation.
 * I had next to no internet connection and English isn't my first language.
 * So I picked a naming convention, that made sense.
 * In the beginning, the class names started with digits as well.
 * However, I couldn't target those with CSS for some reason, so I changed
 * them to their long form.
 *
 * I normally have a single place, where all other moving parts are started.
 * This is this file, game.js.
 * It sets up the basic structure and initialises the game logic.
 *
 * During those two weeks of vacation, I realised, that there is quite some
 * duplicated logic. But I couldn't look up the
 * {@link https://javascript.info/mixins|Mixin Pattern}, so I went with
 * what I knew by heart: class inheritance
 * If you look below, you can see, that there are almost all classes
 * inheriting from WithParent.
 * For the GameClass, I couldn't do that, since that would end up in a
 * recursion. Here, a mixin would have been helpful.
 *
 * I said to myself, that I could adjust it once I transfer the code back to
 * my laptop. But then work happened. And life caught me. So sad …
 *
 * @author André Jaenisch
 * @license GPL v3 or newer
 *
 * @mermaid
 *   classDiagram
 *     class Game
 *     BaseWorld         <|-- FivePortalWorld
 *     BaseWorld         <|-- FiveTownWorld
 *     BaseWorld         <|-- FourCastleWorld
 *     BaseWorld         <|-- FourPortalWorld
 *     BaseWorld         <|-- IntroWorld
 *     BaseWorld         <|-- PortalWorld
 *     BaseWorld         <|-- SixMountainWorld
 *     BaseWorld         <|-- SixPortalWorld
 *     BaseWorld         <|-- ThreePortalWorld
 *     BaseWorld         <|-- ThreeVillageWorld
 *     BaseWorld         <|-- TitleWorld
 *     Person            <|-- Fisherwoman
 *     Person            <|-- Knight
 *     Person            <|-- Narrator
 *     Person            <|-- Pilot
 *     Person            <|-- Scribe
 *     Tab               <|-- TabDebug
 *     Tab               <|-- TabInventory
 *     Tab               <|-- TabMemory
 *     Tab               <|-- TabSettings
 *     TextBox           <|-- Person
 *     WithBoundingBox   <|-- WithEventListener
 *     WithEventListener <|-- WithLife
 *     WithLife          <|-- WithSympathy
 *     WithParent        <|-- Background
 *     WithParent        <|-- BaseWorld
 *     WithParent        <|-- Canvas
 *     WithParent        <|-- Castle
 *     WithParent        <|-- Controls
 *     WithParent        <|-- FivePortal
 *     WithParent        <|-- Foreground
 *     WithParent        <|-- FourPortal
 *     WithParent        <|-- Guild
 *     WithParent        <|-- Hut
 *     WithParent        <|-- Middleground
 *     WithParent        <|-- Mill
 *     WithParent        <|-- Navigation
 *     WithParent        <|-- Sea
 *     WithParent        <|-- SixPortal
 *     WithParent        <|-- Sun
 *     WithParent        <|-- Tab
 *     WithParent        <|-- TextBox
 *     WithParent        <|-- ThreePortal
 *     WithParent        <|-- Time
 *     WithSympathy      <|-- WithParent
 *
 *     WithBoundingBox   : Object _boundingBox
 *     WithEventListener : HTMLElement _eventNode
 *     WithEventListener : _getEventMap() Object
 *     WithEventListener : _handleEvent(event)
 *     WithLife          : Number _life
 *     WithLife          : _updateView()
 *     WithParent        : _createHtmlElement (String name, Object attributes, Array classes): HTMLElement
 *     WithParent        : _createSvgElement (String name, Object attributes, Array classes): SVGElement
 *     WithParent        : _mount(HTMLElement)*
 *     WithSympathy      : Number _sympathy
 *     WithSympathy      : _mapSympathyToLuminance() : Number
 */

import { EVENTS } from './constants'
import { Canvas } from './elements/canvas'
import { Controls } from './elements/controls'
import { Time } from './elements/time'
import { WithEventListener } from './mixins/with-event-listener'

import { Navigation } from './elements/navigation'

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
     * This is the height of the controls element.
     * @private
     */
    this.__controlsHeight = 5 * 2

    /**
     * This is the width of the controls element.
     * @private
     */
    this.__controlsWidth = 5 * 3

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
        width: w,
      },
      controls: {
        // TODO: Consider left-handedness
        x: x + w - this.__controlsWidth,
        y: y + h - this.__controlsHeight,
        height: this.__controlsHeight,
        width: this.__controlsWidth,
        isOnRight: true
      },
      eventNode: this._eventNode,
      parent: this.canvas.element,
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
   * @fires {game:time:update}
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
     * @event game:time:update
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
    this.__respondToDevice()

    this.addWorlds()
    // TODO: Only in debug builds?
    this.__addTime()
    this.__addControls()
    this.startTime()
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
    const fps = 1000
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
    this.canvas = new Canvas(properties)
  }

  /**
   * Adding Controls element to game.
   * @private
   */
  __addControls () {
    // TODO: Consider left-handers!
    const controlsWidth = this.__controlsWidth
    const controlsHeight = this.__controlsHeight

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

  __respondToDevice () {
    let factor = 5

    const pointer = window.matchMedia('(pointer: coarse)')
    if (pointer.matches) {
      factor = 10
    }

    this.__controlsHeight = factor * 2
    this.__controlsWidth = factor * 3
  }
}

export { Game }
