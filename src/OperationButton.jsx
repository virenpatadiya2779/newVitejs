// import { ACTIONS } from "./App"
// export default function OperationButton({ dispatch, operation }) {
//   return (
//     <button
//       onClick={() =>{
//        if (operation === "+/-") {
//          dispatch({ type: ACTIONS.TOGGLE_SIGN });
//        } else {
//          dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } });
//        }
//       }
//     }
//       style={{ color: 'rgb(207, 207, 52)' , backgroundColor : 'rgb(59, 55, 55)',   height: '40px',
//       width: '25px',
//       borderRadius: '90%' }}
//     >
//       {operation}
//     </button>
//   )
// }

import { ACTIONS } from "./App";

export default function OperationButton({ dispatch, operation }) {
  const handleClick = () => {
    if (operation === "+/-") {
      dispatch({ type: ACTIONS.TOGGLE_SIGN });
    } else {
      dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } });
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{ 
        color: 'rgb(207, 207, 52)',
        backgroundColor: 'rgb(59, 55, 55)',
        height: '40px',
        width: '25px',
        borderRadius: '90%'
      }}
    >
      {operation}
    </button>
  );
}
