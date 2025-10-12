import { DummyCompProps } from './types';
import { StyledDummyComp } from './DummyComp.style';

export const DummyComp: React.FC<DummyCompProps> = (props) => {
    return (
        <StyledDummyComp>
            DummyComp
        </StyledDummyComp>
    );
};