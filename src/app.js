// BIG Kudos to https://stackoverflow.com/a/16484266
class World {
  constructor (element, data) {
    this.element = element
    this.data = data

    element.value = data
    element.addEventListener('change', this, false)
    element.addEventListener('click', this, false)
  }

  handleEvent (event) {
    switch (event.type) {
      case 'change':
        this.handleChange(this.element.value)
        break
      case 'click':
        this.handleClick()
        break
      default:
        // Do nothing
    }
  }

  handleChange (value) {
    this.data = value
    this.element.value = value
  }

  handleClick () {
    this.element.setAttributeNS(null, 'fill', `hsl(50, 0%, ${this.data}%)`)
    this.data += 2
  }
}

// TODO: Assign this to different children of #app
// Modify World class to pass in the property to change. Perhaps a mapping of event to properties?
// Allow for callbacks?
new World(document.querySelector('#app rect'), 50)

/* Feature detection of Sensors API */
if (typeof Gyroscope === 'function') {
}

if ('ProximitySensor' in window) {
}

if (window.Accelerometer) {
  console.log('Asking for permission to accelerometer')
  navigator.permissions.query({ name: 'accelerometer' })
           .then((result) => {
             if (result.state === 'denied') {
             console.log('Permission to use accelerometer sensor is denied.')
             return
           }
           console.log('Permission to use accelerometer sensor is granted.')

           let acl = new Accelerometer({ frequency: 60 })

           acl.addEventListener('reading', () => {
             console.log('Acceleration along the X-axis ' + acl.x)
             console.log('Acceleration along the Y-axis ' + acl.y)
             console.log('Acceleration along the Z-axis ' + acl.z)
           })

           acl.start()
           console.log('ACL', acl)
  })
} else {
  console.info('No Accelerometer available')
}

if (window.AmbientLightSensor) {
  console.log('Asking for permission to ambient light sensor')
  navigator.permissions.query({ name: 'ambient-light-sensor' })
           .then((result) => {
             if (result.state === 'denied') {
             console.log('Permission to use ambient-light-sensor sensor is denied.')
             return
           }
           console.log('Permission to use ambient-light-sensor sensor is granted.')

           let sensor = new AmbientLightSensor()
           sensor.onreading = () => {
             console.log('Current light level: ', sensor.illuminance)
           }
           sensor.onerror = (event) => {
             console.error(event.error.name, event.error.message)
           }
           sensor.start()
           console.log('Ambient Light sensor', sensor)
  })
} else {
  console.info('No AmbientLightSensor available')
}

if (window.Gyroscope) {
  console.log('Asking for permission to gyroscope')
  navigator.permissions.query({ name: 'gyroscope' })
           .then((result) => {
             if (result.state === 'denied') {
             console.log('Permission to use gyroscope sensor is denied.')
             return
           }
           console.log('Permission to use gyroscope sensor is granted.')

           let gyroscope = new Gyroscope({ frequency: 60 })

           gyroscope.addEventListener('reading', () => {
             console.log('Angular velocity along the X-axis ' + gyroscope.x)
             console.log('Angular velocity along the Y-axis ' + gyroscope.y)
             console.log('Angular velocity along the Z-axis ' + gyroscope.z)
           })

           gyroscope.start()
           console.log('Gyroscope', gyroscope)
  })
} else {
  console.info('No Gyroscope available')
}

if (window.Magnetometer) {
  console.log('Asking for permission to magnetometer')
  navigator.permissions.query({ name: 'magnetometer' })
           .then((result) => {
             if (result.state === 'denied') {
             console.log('Permission to use magnetometer sensor is denied.')
             return
           }
           console.log('Permission to use magnetometer sensor is granted.')

           let magnetometer = new Magnetometer({ frequency: 60 })

           magnetometer.addEventListener('reading', () => {
             console.log('Magnetic field along the X-axis ' + magnetometer.x)
             console.log('Magnetic field along the Y-axis ' + magnetometer.y)
             console.log('Magnetic field along the Z-axis ' + magnetometer.z)
           })

           magnetometer.start()
           console.log('Magnetometer', magnetometer)
  })
} else {
  console.info('No Magnetometer available')
}

/* Sensors have the fields:
 * activated: Boolean
 * hasReading: Boolean
 * timestamp
 *
 * Sensors have the events:
 * reading
 * error
 * activated
 *
 * Sensors have the methods:
 * start()
 * stop()
 */

document.addEventListener("cat", function(e) { process(e.detail) })

// create and dispatch the event
const event = new CustomEvent("cat", {
  detail: {
    hazcheeseburger: true
  }
})
document.dispatchEvent(event)

const rect document.createElementNS("http://www.w3.org/2000/svg", "rect")
