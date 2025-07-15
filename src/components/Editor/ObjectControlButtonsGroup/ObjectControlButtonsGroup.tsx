import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { State } from "../../../data_type/interfaces";
import { CanvasOrderDirection } from "../../../data_type/constants";

interface Props {
  editor: State;
  setEditor: (editorState: Record<string, any>, callback?: () => void) => void;
}

const ObjectControlButtonsGroup: React.FC<Props> = ({ editor, setEditor }) => {
  const isDisabled = editor.selectedObjects.length === 0;

  return (
    <div className="object-controls">
      <Button
        variant="danger"
        size="sm"
        disabled={isDisabled}
        onClick={() => {
          editor.canvasController.deleteObjects(editor.selectedObjects!);
          setEditor({
            selectedObjects: [] as fabric.Object[],
            textInput: "",
            editing: false,
          });
        }}
        className="btn-professional btn-danger-professional"
      >
        <i className="fas fa-trash me-1"></i>
        Delete
      </Button>

      <ButtonGroup size="sm" className="flex-wrap">
        {Object.entries(CanvasOrderDirection).map(([key, direction]) => (
          <Button
            key={direction}
            variant="outline-secondary"
            disabled={isDisabled}
            onClick={() =>
              editor.canvasController.changeObjectOrder(
                editor.selectedObjects,
                direction
              )
            }
            title={`Move ${direction}`}
            className="btn-sm"
          >
            <i
              className={`fas fa-arrow-${
                direction === "front"
                  ? "up"
                  : direction === "back"
                  ? "down"
                  : direction === "forwards"
                  ? "up"
                  : "down"
              }`}
            ></i>
          </Button>
        ))}
      </ButtonGroup>

      {editor.selectedObjects.length > 0 && (
        <div className="mt-2">
          <small className="text-muted">
            {editor.selectedObjects.length} object(s) selected
          </small>
        </div>
      )}
    </div>
  );
};

export default ObjectControlButtonsGroup;