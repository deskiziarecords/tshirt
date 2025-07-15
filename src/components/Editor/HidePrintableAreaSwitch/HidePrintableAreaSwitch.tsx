import React from "react";
import { Form } from "react-bootstrap";
import { State } from "../../../data_type/interfaces";

interface Props {
  editor: State;
  setEditor: (editorState: Record<string, any>, callback?: () => void) => void;
}

const HidePrintableAreaSwitch: React.FC<Props> = ({ editor, setEditor }) => {
  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked;
    editor.canvasController.togglePrintableArea(checked);
    setEditor({ isEditableAreaInvisible: checked });
  };

  return (
    <div className="d-flex align-items-center">
      <Form.Check
        type="switch"
        id="printable-area-switch"
        label="Hide Print Area"
        checked={editor.isEditableAreaInvisible}
        onChange={handleSwitchChange}
        className="mb-0"
      />
      <div className="ms-2">
        <small className="text-muted">
          <i className="fas fa-eye-slash me-1"></i>
          Toggle print boundaries
        </small>
      </div>
    </div>
  );
};

export default HidePrintableAreaSwitch;