/**
 * This file is part of JS13kGames - 404.
 * An Offline Life is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * An Offline Life is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with An Offline Life.  If not, see <https://www.gnu.org/licenses/>.
 */

(function () {
  'use strict';

  // BIG Kudos to https://stackoverflow.com/a/16484266
  class World {
    constructor (element, data) {
      this.element = element;
      this.data = data;

      element.value = data;
      element.addEventListener('change', this, false);
      element.addEventListener('click', this, false);
    }

    handleEvent (event) {
      switch (event.type) {
        case 'change':
          this.handleChange(this.element.value);
          break
        case 'click':
          this.handleClick();
          break
          // Do nothing
      }
    }

    handleChange (value) {
      this.data = value;
      this.element.value = value;
    }

    handleClick () {
      this.element.setAttributeNS(null, 'fill', `hsl(50, 0%, ${this.data}%)`);
      this.data += 2;
    }
  }

  new World(document.querySelector('#app rect'), 50);

}());
