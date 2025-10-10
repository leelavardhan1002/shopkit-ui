import { create } from "storybook/internal/theming";
import logo from '../src/assets/shop-kit-complete.png'

export default create({
    base: 'light',
    brandTitle: 'Shopkit UI',
    brandImage: logo,

    colorPrimary: '#000000',
    colorSecondary: '#000000'
})
