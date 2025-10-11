import { DummyComp } from './DummyComp';
import { renderWithTheme } from '../utils/testUtils/renderWithThemeAndProps';
import { DummyCompProps } from './types';

const defaultProps: Partial<DummyCompProps> = {};

const setupElement = (props: DummyCompProps) => {
    return renderWithTheme(<DummyComp {...props} />);
}

describe('DummyComp', () => {
    it('matches snapshot', () => {
        const { asFragment } = setupElement(defaultProps);
        expect(asFragment()).toMatchSnapshot();
    });
});
