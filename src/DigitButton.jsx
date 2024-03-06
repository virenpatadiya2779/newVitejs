import { ACTIONS } from "./App"

export default function DigitButton({ dispatch, digit }) {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
      style={{ color: 'white' , backgroundColor : 'rgb(59, 55, 55)',   height: '15px',
      width: '15px',
      borderRadius: '50%'  }}
    >
      {digit}
    </button>
  )
}