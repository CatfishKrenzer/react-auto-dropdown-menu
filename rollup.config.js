import babel from 'rollup-plugin-babel' 
import postcss from 'rollup-plugin-postcss'

const config = {
  input: 'src/DropdownMenu.js',
  external: ['react'],
  output: {
      format: 'umd',
      name: 'DropdownMenu',
      globals: {
          react: "React"
      }
  },
  plugins: [
    babel({
        exclude: "node_modules/**"
    }),
    postcss({
      plugins: []
    })
],
}
export default config;