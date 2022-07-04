export interface Message {
  text: string;
  type: MessageType;
}
export enum MessageType {
  Success = "success",
  Error = "error",
}
export interface Action {
  name: string;
  handler: () => void;
}
