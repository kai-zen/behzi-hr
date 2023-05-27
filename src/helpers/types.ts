import { ChangeEvent, KeyboardEvent } from "react";

export type dailyReportType = {
  id: number;
  title: string;
  items: string[];
  description: string;
};
export type weeklyReportType = {
  id: number;
  title: string;
  items: string[];
  description: string;
  immediateLevel: "1" | "2" | "3";
  importanceLevel: "1" | "2" | "3";
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
