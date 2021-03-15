type InputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
type SubmitEvent = React.SyntheticEvent;
type RemoveFunction = (id: string) => void;
export type OnChangeFuncType = (event: InputEvent) => void;
export type OnSubmitFuncType = (event: SubmitEvent) => void;

export interface NoteInterface {
  id?: string;
  title: string;
  content: string;
  author: string;
  removeNote?: RemoveFunction;
}
