import { ChangeEvent, KeyboardEvent } from "react";

export type dailyReportType = {
  title: string;
  items: string[];
  description: string;
};

export type changeHandler = (e: ChangeEvent<HTMLInputElement>) => void;
export type keydownHandler = (e: KeyboardEvent<HTMLInputElement>) => void;

export type MUIDate = ChangeEvent<HTMLSelectElement> | undefined;
export type MUIDateChangeHandler = (
  value: ChangeEvent<HTMLSelectElement> | null,
  keyboardInputValue?: string | undefined
) => void;

export type userData = {
  name: string;
  job: string;
  image: string;
};
