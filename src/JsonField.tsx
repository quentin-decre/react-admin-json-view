import React from "react";
import { FieldProps, useRecordContext } from "react-admin";
import ReactJson, { JsonViewProps } from "react18-json-view";

type Props = {
  source: string;
  jsonString?: boolean;
  reactJsonOptions?: Omit<JsonViewProps, "src">;
} & FieldProps;

export const JsonField: React.FC<Props> = ({ source, jsonString = false, reactJsonOptions = {} }) => {
  const record = useRecordContext();

  let src = record[source];

  if (jsonString) {
    src = JSON.parse(src);
  }

  return <ReactJson {...reactJsonOptions} src={src || {}} />;
};
