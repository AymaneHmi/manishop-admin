'use client';

import { useReducer } from "react";

type FormAction =
  | { type: 'UPDATE_FIELD'; field: string; value: any }
  | { type: 'CLEAR_FORM'; initialState: any };

type FormState = Record<string, any>;

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'CLEAR_FORM':
      return action.initialState;
    default:
      return state;
  }
}

export const useForm = (initialState: FormState) => {
  const [formData, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (field: string, value: any) => {
    dispatch({ type: 'UPDATE_FIELD', field, value });
  };

  const resetForm = (newInitialState: FormState) => {
    dispatch({ type: 'CLEAR_FORM', initialState: newInitialState });
  };

  return { formData, handleChange, resetForm };
};
