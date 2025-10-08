import { DummyComponent } from './DummyComponent';
import { renderWithTheme } from '../utils/testUtils/renderWithThemeAndProps';
import { DummyComponentProps } from './types';

const defaultProps: Partial<DummyComponentProps> = {};

const setupElement = (props: DummyComponentProps) => {
    return renderWithTheme(<DummyComponent {...props} />);
}

describe('DummyComponent', () => {
    it('matches snapshot', () => {
        const { asFragment } = setupElement(defaultProps);
        expect(asFragment()).toMatchSnapshot();
    });
});
