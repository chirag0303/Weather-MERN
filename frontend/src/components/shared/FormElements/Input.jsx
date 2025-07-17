import { useReducer, useEffect } from 'react';
import { validate } from '../util/validators.js';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
      case 'TOUCH':
        return {
          ...state,
          isTouched: true
        }
      default:
        return state;
  }
};

const Input = props => {
  console.log('Input props:', props);

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isTouched: false,
    isValid: false
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid)
  }, [id, value, isValid, onInput]);

  const changeHandler = event => {
    console.log("Typing input", props.id, event.target.value)
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    });
  };

  // const element = props.element === 'textarea' ? (
  const elementType = props.element?.toLowerCase() || 'input'
  const isTextarea = elementType === 'textarea';

  const element = isTextarea ? (
    <textarea 
      id={ props.id }
      rows={ props.rows || 3 }
      value={ inputState.value }
      onChange={ changeHandler }
      onBlur={ touchHandler }
      placeholder={ props.placeholder }
      className="w-full p-2 rounded bg-white text-black"
    />
  ) : (
    <input 
      id={ props.id }
      type={ props.type }
      value={ inputState.value }
      onChange={ changeHandler }
      onBlur={ touchHandler }
      placeholder={ props.placeholder }
      className="w-full p-2 rounded bg-white text-black"
    />
  )

  return (
    <div  className="mb-4">
      <label htmlFor={props.id} className="block text-sm font-medium mb-1">{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && (
        <p className="text-red-400 text-sm mt-1">{props.errorText}</p>
      )}
    </div>
  )
}

export default Input;