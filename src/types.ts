type InputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
type SubmitEvent = React.SyntheticEvent;
export type RemoveFunction = (id: string) => void;

export type OnChangeFuncType = (event: InputEvent) => void;
export type OnSubmitFuncType = (event: SubmitEvent) => void;

export interface NoteTrimInterface {
  id?: string;
  title: string;
  content: string;
  author: string;
}

export interface NoteInterface extends NoteTrimInterface {
  removeNote?: RemoveFunction;
}

export interface FormInterface {
  handlerOnChange: OnChangeFuncType;
  handlerOnSubmit: OnSubmitFuncType;
  note: NoteInterface;
  error: string;
}
