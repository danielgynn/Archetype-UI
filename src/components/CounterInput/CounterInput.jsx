import React from 'react';
import Styled from 'styled-components';
import PropTypes from 'prop-types';

import { Box } from '../../';

class CounterInput extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            count: props.count,
            inputValue: props.count
        };
    }

    componentDidUpdate(prevProps) {
        const { count } = this.props;
        
        if (prevProps.count !== count) {

            this.setState({
                count: count,
                inputValue: count.toString()
            }, this.handleChangeCount);
        }
    }

    decrement = (incrementor) => {
        const { count } = this.state;
        const { min } = this.props;

        if (count <= min) {
            return;
        }

        this.setState(state => {
            const count = state.count - incrementor < min ? min : state.count - incrementor;

            return {
                count,
                inputValue: count.toString()
            };
        }, this.handleChangeCount);
    };

    increment = (incrementor) => {
        const { count } = this.state;
        const { max } = this.props;

        if (count >= max) {
            return;
        }

        this.setState(state => {
            const count = state.count + incrementor > max ? max : state.count + incrementor;

            return {
                count,
                inputValue: count.toString()
            };
        }, this.handleChangeCount);
    };

    handleBlur  = () => {
        const { inputValue, count } = this.state;

        let num = parseInt(inputValue);
        num = num > this.props.max ? this.props.max : num;
        num = num < this.props.min ? this.props.min : num;

        if (isNaN(num) === true) {
            this.setState({
                inputValue: count
            });
        } else {
            this.setState({
                count: num,
                inputValue: num.toString()
            }, this.handleChangeCount);
        }
    };

    handleChangeCount = () => {
        const { onCountChange } = this.props;
        const { count } = this.state;

        if (onCountChange !== undefined) {
            onCountChange(count);
        }
    };

    handleChangeInput = ({ target: { value: inputValue }}) => {
        this.setState({ inputValue });
    };

    render() {
        const { children, hidden, incrementor, min, max } = this.props;

        return children({
            decrement: this.decrement,
            handleChangeInput: this.handleChangeInput,
            handleBlur: this.handleBlur,
            increment: this.increment,
            hidden,
            incrementor,
            min,
            max,
            state: this.state
        });
    }
}

const Wrapper =  Styled(Box)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 45px;
`;

const Button = Styled(Box)`
    cursor: pointer;
    border: 1px solid ${ props => props.theme.colors.accentTwo };
    padding: 2px 5px;
    font-size: .75rem;
    border-radius: 8px;
    margin: 2px 0;
    opacity: ${ props => props.disabled ? .65 : 1 };
`;

const Counter = Styled.input`
    width: 40px;
    height: 20px;
    background: none;
    border: none;
    padding: 5px;
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
`;

const renderChildren = ({
    decrement,
    handleChangeInput,
    handleBlur,
    increment,
    hidden,
    incrementor,
    min,
    max,
    state: { inputValue, count }
}) => (
    <Wrapper>
        { !hidden && 
            <Box>
                { incrementor.map((inc, index) => (
                    <Button key={ index } disabled={ count <= min } onClick={ () => decrement(inc) }>&#8722;{ inc }</Button>
                )) }
            </Box>
        }
        
        { !hidden && (
            <Counter
                type="text"
                value={ inputValue }
                onChange={ handleChangeInput }
                onBlur={ handleBlur }
                readOnly
            />
        ) }
        
        { !hidden && 
            <Box>
                { incrementor.map((inc, index) => (
                    <Button key={ index } disabled={ count >= max } onClick={ () => increment(inc) }>&#43;{ inc }</Button>
                )) }
            </Box>
        }
    </Wrapper>
);

CounterInput.defaultProps = {
    children: renderChildren,
    count: 0,
    max: Infinity,
    min: -Infinity,
    incrementor: 1,
    hidden: false
};

CounterInput.propTypes = {
    count: PropTypes.number,
    max: PropTypes.number,
    min: PropTypes.number,
    incrementor: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
    onCountChange: PropTypes.func,
    hidden: PropTypes.bool
};

export default CounterInput;