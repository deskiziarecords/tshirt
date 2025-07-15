import React, { Component } from "react";
import { Col, Row, Alert } from "react-bootstrap";

import Canvas from "./Canvas/Canvas";
import "./Editor.css";

import ColorSelector from "./ColorSelector/SketchPicker";
import TextEditingTool from "./TextEditingTool/TextEditingTool";
import SideMenu from "../SideMenu/SideMenu";
import TextLoader from "./TextLoader/TextLoader";
import TextureButtonsGroup from "./TextureButtonsGroup/TextureButtonsGroup";
import HidePrintableAreaSwitch from "./HidePrintableAreaSwitch/HidePrintableAreaSwitch";

import { DEFAULT_FG, DEFAULT_FONT } from "../../data_type/constants";

import { State, CanvasController } from "../../data_type/interfaces";
import ObjectControlButtonsGroup from "./ObjectControlButtonsGroup/ObjectControlButtonsGroup";

interface Props {
  editor: State;
  setEditor: (editorState: Record<string, any>, callback?: () => void) => void;
}

class Editor extends Component<Props, State> {
  syncText = (textbox: any) => {
    const self = this as Editor;
    textbox.on("change", function () {
      self.props.setEditor({ textInput: textbox.text });
    });
  };

  setEditorState = (stateProperties: object, callback?: () => void) => {
    this.props.setEditor({ ...stateProperties }, callback);
  };

  handleColorSelection = (color: any) => {
    this.props.setEditor(
      {
        foregroundColor: color.hex,
      },
      () => {
        const inputElements = document.querySelectorAll("input");
        const allNotActive = Array.from(inputElements).every(
          (element) => !element.disabled
        );

        if (this.props.editor.selectedObjects.length === 0 && allNotActive) {
          this.props.editor.canvasController.updateTShirtColor(
            this.props.editor.foregroundColor
          );
          this.props.setEditor({
            tshirtColor: this.props.editor.foregroundColor,
          });
        } else if (this.props.editor.editing) {
          this.props.editor.canvasController.updateTextColor(
            this.props.editor.selectedObjects[0] as fabric.Textbox,
            this.props.editor.foregroundColor
          );
        }
        this.props.setEditor({ isCanvasDeselected: false });
      }
    );
  };

  initCanvasController = (controller: CanvasController) => {
    const self = this as Editor;
    controller.canvas.on("mouse:down", () => {
      const selected = controller.canvas.getActiveObjects();
      const textbox = selected[0];
      const canEdit = selected.length === 1 && textbox.isType("textbox");
      if (selected.length > 0) {
        this.props.setEditor(
          {
            selectedObjects: selected,
            editing: canEdit,
            textInput: canEdit ? (textbox as any).text : "",
            textFont: canEdit ? (textbox as any).fontFamily : DEFAULT_FONT,
            foregroundColor: canEdit ? (textbox as any).fill : DEFAULT_FG,
          },
          () => {
            if (canEdit) this.syncText(textbox);
          }
        );
      } else {
        this.props.setEditor({
          selectedObjects: [],
          editing: false,
          textInput: "",
          textFont: DEFAULT_FONT,
          foregroundColor: DEFAULT_FG,
        });
      }
      self.props.setEditor({ isCanvasDeselected: false });
    });

    controller.canvas.on("mouse:up", () => {
      const selected = controller.canvas.getActiveObjects();
      if (selected.length > 0)
        this.props.setEditor({
          selectedObjects: selected,
        });
    });

    controller.canvas.on("selection:created", function () {
      self.props.setEditor({ isCanvasDeselected: false });
    });

    document.addEventListener("click", (event: MouseEvent) => {
      const canvas = this.props.editor.canvasController.canvas;
      const canvasRect = canvas.getElement().getBoundingClientRect();
      const isClickOutsideCanvas =
        event.clientX < canvasRect.left ||
        event.clientX > canvasRect.right ||
        event.clientY < canvasRect.top ||
        event.clientY > canvasRect.bottom;

      if (isClickOutsideCanvas)
        this.props.setEditor({ isCanvasDeselected: true });
    });

    this.props.setEditor({ canvasController: controller, editorReady: true });
  };

  render() {
    const { editor } = this.props;
    
    return (
      <div className="main-content">
        <div className="main-body">
          {/* Left Sidebar - Tools */}
          <div className="side-menu-container">
            <SideMenu
              canvas={editor.canvasController.canvas}
              editor={editor}
              setEditor={this.setEditorState}
            />
          </div>

          {/* Properties Panel */}
          <div className="properties-menu-container">
            <h5>
              <i className="fas fa-cog me-2"></i>
              Design Properties
            </h5>

            {editor.editorReady && (
              <>
                {/* Object Controls */}
                <div className="property-section">
                  <h6>Object Controls</h6>
                  <ObjectControlButtonsGroup
                    editor={editor}
                    setEditor={this.setEditorState}
                  />
                </div>

                {/* Text Editing */}
                {editor.editing && (
                  <div className="property-section">
                    <h6>Text Properties</h6>
                    <TextEditingTool
                      setEditor={this.setEditorState}
                      editor={editor}
                    />
                  </div>
                )}

                {/* Color Selection */}
                {editor.fillSelected && !editor.isCanvasDeselected && (
                  <div className="property-section">
                    <h6>Color Selection</h6>
                    <div className="color-picker-wrapper">
                      <ColorSelector
                        color={editor.foregroundColor}
                        handleChangeComplete={(color: string) => {
                          this.handleColorSelection(color);
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Texture Selection */}
                {editor.fillSelected &&
                  editor.selectedObjects.length === 0 &&
                  !editor.isCanvasDeselected && (
                    <div className="property-section">
                      <h6>Texture Options</h6>
                      <div className="texture-grid">
                        <TextureButtonsGroup
                          editor={editor}
                          setEditor={this.setEditorState}
                        />
                      </div>
                    </div>
                  )}

                {/* Design Info */}
                <div className="property-section">
                  <h6>Design Information</h6>
                  <div className="text-muted small">
                    <div className="d-flex justify-content-between mb-1">
                      <span>Objects:</span>
                      <span>{editor.selectedObjects.length}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                      <span>T-Shirt:</span>
                      <span>{editor.tshirtId.replace('_', ' ')}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Status:</span>
                      <span className={editor.editing ? "text-warning" : "text-success"}>
                        {editor.editing ? "Editing" : "Ready"}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {!editor.editorReady && (
              <Alert variant="info">
                <i className="fas fa-spinner fa-spin me-2"></i>
                Loading design studio...
              </Alert>
            )}
          </div>

          {/* Main Canvas Area */}
          <div className="editor-container">
            <div className="canvas-controls">
              <div className="d-flex align-items-center">
                <h5 className="mb-0 text-muted">
                  <i className="fas fa-paint-brush me-2"></i>
                  Design Canvas
                </h5>
              </div>
              <HidePrintableAreaSwitch
                editor={editor}
                setEditor={this.props.setEditor}
              />
            </div>

            <div className="canvas-wrapper">
              <Canvas
                initCanvasController={(controller) =>
                  this.initCanvasController(controller)
                }
                editor={editor}
                setEditor={this.props.setEditor}
              />
              <TextLoader className="spinner-off" />
            </div>

            <div className="design-actions">
              <button className="btn btn-professional btn-secondary-professional">
                <i className="fas fa-undo me-2"></i>
                Reset Design
              </button>
              <button className="btn btn-professional btn-primary-professional">
                <i className="fas fa-eye me-2"></i>
                Preview
              </button>
              <button className="btn btn-professional btn-success-professional">
                <i className="fas fa-download me-2"></i>
                Export Design
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;