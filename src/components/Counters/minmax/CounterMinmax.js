import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import styles from './styles.module.css';

const Counter = ({
    min,
    max,
    current,
    onChange,
}) => {
    const input = useRef();

    const applyCurrent = (newCnt) => {
        const newCurrent = Math.max(Math.min(newCnt, max), min);
        input.current.value = newCurrent;

        if (newCurrent !== Number(current)) {
            onChange(newCurrent);
        }
    };

    const increaseValue = () => applyCurrent(current + 1);
    const decreaseValue = () => applyCurrent(current - 1);

    const setValue = () => {
        const cnt = parseInt(input.current.value);
        applyCurrent(isNaN(cnt) ? min : cnt);
    }

    const checkEnter = (e) => {
        if (e.keyCode === 13) {
            setValue();
        }
    }

    useEffect(() => {
        if (input.current.value !== current.toString()) {
            input.current.value = current;
        }
    }, [current]);

    useEffect(() => {
        if (current > max || current < min) {
            setValue();
        }
    }, [min, max]);

    return (
      <div>
          <Button
            variant="warning"
            onClick={decreaseValue}
            disabled={current <= min}
          >
              -
          </Button>

          <input type="text"
                 defaultValue={current}
                 onBlur={setValue}
                 onKeyDown={checkEnter}
                 className={styles.input}
                 ref={input}
          />

          <Button
            variant="success"
            onClick={increaseValue}
            disabled={current >= max}
          >
              +
          </Button>
      </div>
    );
}

Counter.propTypes = {
    min: PropTypes.number,
    max: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}

Counter.defaultProps = {
    min: 1
}

export default Counter;
