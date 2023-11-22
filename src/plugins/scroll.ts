import plugin from 'tailwindcss/plugin';

const HideScroll = plugin(
  ({addUtilities}) => {
    addUtilities(
      {
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',

          /* Firefox */
          'scrollbar-width': 'none',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      }
    )
  }
)

export {
  HideScroll
}