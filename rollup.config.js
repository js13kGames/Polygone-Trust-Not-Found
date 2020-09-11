import copy from 'rollup-plugin-copy'
import license from 'rollup-plugin-license'
import { terser } from 'rollup-plugin-terser'

const LICENSE_HEADER = `
This file is part of JS13kGames - 404.
An Offline Life is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
An Offline Life is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with An Offline Life.  If not, see <https://www.gnu.org/licenses/>.`

export default {
  input: './src/app.js',
  output: {
    file: './tmp/app.js',
    format: 'iife'
  },
  plugins: [
    copy({
      flatten: true,
      verbose: true,
      targets: [{
        src: './src/index.html',
        dest: './dist/'
      }]
    }),

    terser(),

    license({
      banner: LICENSE_HEADER
    })
  ]
}
