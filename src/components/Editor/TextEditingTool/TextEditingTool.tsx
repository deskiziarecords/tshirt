import React, { ChangeEvent } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import FontPicker from "../CustomFontPicker";
import { google_access_key } from "../../../config.json";
import { Color } from "../../../data_type/constants";
import "./TextEditingTool.css";
import { State } from "../../../data_type/interfaces";

interface Props {
  editor: State;
  setEditor: (editorState: Record<string, any>, callback?: () => void) => void;
}

const TextEditingTool: React.FC<Props> = ({ editor, setEditor }) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditor({ [e.target.name]: e.target.value });
    if (editor.editing) {
      editor.canvasController.updateText(
        editor.selectedObjects![0] as fabric.Textbox,
        editor.textInput,
        editor.textFont
      );
    }
  };

  const handleTextAction = () => {
    const fillColor =
      editor.foregroundColor !== editor.tshirtColor
        ? editor.foregroundColor
        : Color.black;

    if (!editor.editing) {
      editor.canvasController.addText(editor.textInput, editor.textFont, fillColor);
      const allObjects = editor.canvasController.canvas.getObjects();
      if (allObjects.length > 0) {
        const textObj: fabric.Object = allObjects[allObjects.length - 1];
        editor.canvasController.canvas.setActiveObject(textObj);
        setEditor({ selectedObjects: [textObj], editing: true });
      }
    } else {
      editor.canvasController.updateText(
        editor.selectedObjects[0] as fabric.Textbox,
        editor.textInput,
        editor.textFont
      );
      setEditor({ textInput: "", editing: false });
    }
  };

  return (
    <div className="text-editing-tool">
      <div className="mb-3">
        <label className="form-label small text-muted mb-2">Font Family</label>
        <FontPicker
          apiKey={google_access_key}
          activeFontFamily={editor.textFont}
          onChange={(nextFont) => {
            setEditor({ textFont: nextFont.family });
          }}
          setActiveFontCallback={() => {
            console.log("Font changed");
          }}
        />
      </div>

      <InputGroup className="input-group-professional mb-3">
        <FormControl
          placeholder={!editor.editing ? "Enter text..." : "Update text..."}
          aria-label="text"
          name="textInput"
          onChange={handleOnChange}
          value={editor.textInput}
          type="text"
          className="form-control-professional"
        />
        <Button
          onClick={handleTextAction}
          className="btn-professional btn-primary-professional"
          disabled={!editor.textInput.trim()}
        >
          {!editor.editing ? (
            <>
              <i className="fas fa-plus me-1"></i>
              Add
            </>
          ) : (
            <>
              <i className="fas fa-check me-1"></i>
              Update
            </>
          )}
        </Button>
      </InputGroup>

      {editor.editing && (
        <div className="text-info">
          <small className="text-muted">
            <i className="fas fa-info-circle me-1"></i>
            Editing text object. Click "Update\" to apply changes.
          </small>
        </div>
      )}
    </div>
  );
};

export default TextEditingTool;