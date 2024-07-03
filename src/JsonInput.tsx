import { FormHelperText } from "@mui/material";
import React from "react";
import { InputHelperText, InputProps, Labeled, useInput } from "react-admin";
import ReactJson, { JsonViewProps } from "react18-json-view";

type Props = {
  source: string;
  label?: string;
  helperText?: string;
  jsonString?: boolean;
  reactJsonOptions?: Omit<JsonViewProps, "src"> & {
    onEdit?: JsonViewProps["onEdit"] | false;
    onAdd?: JsonViewProps["onAdd"] | false;
    onDelete?: JsonViewProps["onDelete"] | false;
  };
} & InputProps;

export const JsonInput: React.FC<Props> = (props) => {
  const {
    field: { value, onChange },
    fieldState: { isTouched, error },
    formState: { isSubmitted },
    isRequired,
  } = useInput(props);

  const { source, label, helperText, jsonString = false, reactJsonOptions } = props;

  function change(updatedSrc: any) {
    let updatedValue = updatedSrc;

    if (jsonString) {
      updatedValue = Object.keys(updatedSrc).length === 0 ? null : JSON.stringify(updatedSrc);
    }

    onChange(updatedValue);
  }

  const onEdit: JsonViewProps["onEdit"] = (edit) => {
    change(edit.src);

    if (reactJsonOptions?.onEdit) {
      reactJsonOptions.onEdit(edit);
    }
  };

  const onAdd: JsonViewProps["onAdd"] = (add) => {
    change(add.src);

    if (reactJsonOptions?.onAdd) {
      reactJsonOptions.onAdd(add);
    }
  };

  const onDelete: JsonViewProps["onDelete"] = (del) => {
    change(del.src);

    if (reactJsonOptions?.onDelete) {
      reactJsonOptions.onDelete(del);
    }
  };

  let src = value;

  if (jsonString) {
    src = value ? JSON.parse(value) : value;
  }

  return (
    <div>
      <Labeled source={source} label={label} isRequired={isRequired}>
        <ReactJson
          {...reactJsonOptions}
          src={src || {}}
          editable={{
            edit: reactJsonOptions?.onEdit !== false,
            add: reactJsonOptions?.onAdd !== false,
            delete: reactJsonOptions?.onDelete !== false,
          }}
          onEdit={reactJsonOptions?.onEdit === false ? undefined : onEdit}
          onAdd={reactJsonOptions?.onAdd === false ? undefined : onAdd}
          onDelete={reactJsonOptions?.onDelete === false ? undefined : onDelete}
        />
      </Labeled>
      <FormHelperText error={(isTouched || isSubmitted) && !!error}>
        <InputHelperText touched={isTouched || isSubmitted} error={error?.message} helperText={helperText} />
      </FormHelperText>
    </div>
  );
};
