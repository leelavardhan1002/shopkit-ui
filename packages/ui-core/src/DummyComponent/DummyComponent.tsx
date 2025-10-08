import { DummyComponentProps } from './types';
import { StyledDummyComponent } from './DummyComponent.style';

export const DummyComponent: React.FC<DummyComponentProps> = (props) => {
    return (
        <StyledDummyComponent>
            DummyComponent
        </StyledDummyComponent>
    );
};