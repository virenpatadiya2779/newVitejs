  import { useReducer , useEffect } from 'react' ;
  import './App.css'
  import DigitButton from './DigitButton';
  import OperationButton from './OperationButton';

  export const ACTIONS = {
    ADD_DIGIT: "add-digit",
    CHOOSE_OPERATION: "choose-operation",
    CLEAR: "clear",
    EVALUATE: "evaluate",
    TOGGLE_SIGN: "toggle-sign",
  }
  function reducer(state , {type , payload}) {
    switch (type) {
      case ACTIONS.ADD_DIGIT:
        if (state.overwrite) {
          return {
            ...state,
            currentOperand: payload.digit,
            overwrite: false,
          }
        }
        if (payload.digit === "0" && state.currentOperand === "0") {
          return state
        }
        if (payload.digit === "." && state.currentOperand.includes(".")) {
          return state
        }
          return {
            ...state,
            currentOperand: `${state.currentOperand || ""}${payload.digit}`
          }
      case ACTIONS.CLEAR : 
      return  {};

      case ACTIONS.CHOOSE_OPERATION:
    if (state.previousOperand != null) {
      const result = evaluate(state);
      return {
        ...state,
        operation: payload.operation,
        previousOperand: result,
        currentOperand: null,
        overwrite: false,
      };
    }
    return {
      ...state,
      operation: payload.operation,
      previousOperand: state.currentOperand,
      currentOperand: null,
      overwrite: false,
    };

case ACTIONS.EVALUATE:
  if (state.operation === "%") {
    const prev = parseFloat(state.previousOperand);
    const current = parseFloat(state.currentOperand);
    const result = (prev / 100) * current;
    return {
      ...state,
      previousOperand: `${prev} ${state.operation} ${current}`,
      currentOperand: result.toString(),
      overwrite: true,
    };
  } else {
    let result = evaluate(state);
    return {
      ...state,
      previousOperand: `${state.previousOperand} ${state.operation} ${state.currentOperand}`,
      currentOperand: result,
      overwrite: true,
    };
  }
      case ACTIONS.TOGGLE_SIGN:
          return {
            ...state,
            currentOperand: state.currentOperand !== null ? (-parseFloat(state.currentOperand)).toString() : null,
          };

      default:
            return state;
  }}
  function evaluate({ currentOperand, previousOperand, operation }) {
    const prev = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)
    if (isNaN(prev) || isNaN(current)) return ""
    let computation = ""
    switch (operation) {
      case "+":
        computation = prev + current
        break
      case "-":
        computation = prev - current
        break
      case "*":
        computation = prev * current;
        break
      case "/":
        computation = prev / current
        break
      case "%":
        computation = (prev % current) / 100 ;
        break
      default:
        return "";
    }
    return computation.toString()
  }
  const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
  })
  function formatOperand(operand) {
    if (operand == null) return
    const [integer, decimal] = operand.split(".")
    if (decimal == null) return INTEGER_FORMATTER.format(integer)
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
  }
  function App() {
    const [{currentOperand , previousOperand , operation} , dispatch] = useReducer(reducer , {}) ; 

    useEffect(() => {
      const handleKeyDown = (event) => {
        const key = event.key;
        if (!isNaN(key) || key === '.') {
          dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: key } });
        } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
          dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: key } });
        } else if (key === 'Enter') {
          dispatch({ type: ACTIONS.EVALUATE });
        } else if (key === 'Escape') {
          dispatch({ type: ACTIONS.CLEAR });
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);10 
      };
    }, []);
    return (
      <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand}</div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      <button className='btn' onClick={() => dispatch({ type: ACTIONS.CLEAR })}> C</button>
      <OperationButton className='btn' operation="+/- " dispatch={dispatch} />
      <OperationButton className='btn' operation="%" dispatch={dispatch} />
      <OperationButton className='btn btn-color-yellow' operation="/" dispatch={dispatch} />
      <DigitButton className='btn' digit="7" dispatch={dispatch}  />
      <DigitButton className='btn' digit="8" dispatch={dispatch} />
      <DigitButton className='btn' digit="9" dispatch={dispatch} />
      <OperationButton className='btn btn-color-yellow' operation="*" dispatch={dispatch} />
      <DigitButton className='btn' digit="4" dispatch={dispatch} />
      <DigitButton className='btn' digit="5" dispatch={dispatch} />
      <DigitButton className='btn' digit="6" dispatch={dispatch} />
      <OperationButton className='btn btn-color-yellow' operation="-" dispatch={dispatch} />
      <DigitButton className='btn' digit="1" dispatch={dispatch} />
      <DigitButton className='btn' digit="2" dispatch={dispatch} />
      <DigitButton className='btn' digit="3" dispatch={dispatch} />
      <OperationButton className='btn btn-color-yellow' operation="+" dispatch={dispatch} />
      <DigitButton className='btn' digit="0" dispatch={dispatch} />
      <DigitButton className="btn span-two" digit="."    dispatch={dispatch} />
      <button  className="btn btn-back-yellow"  onClick={() => dispatch({ type: ACTIONS.EVALUATE })} >=</button>
    </div>
    )
  }
  export default App ;
