import React, { useState } from "react";
import "./SideMenu.css";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { faShirt, faFont, faUpload, faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageUploadModal from "./Modals/ImageUploadModal";
import { Color, DEFAULT_TEXT_INPUT } from "../../data_type/constants";
import { State } from "../../data_type/interfaces";
import TShirtSelectionGroup from "../Editor/TShirtSelectionGroup/TShirtSelectionGroup";

interface Props {
  canvas: fabric.Canvas;
  editor: State;
  setEditor: (properties: object, callback?: () => void) => void;
}

const SideMenu: React.FC<Props> = ({ canvas, editor, setEditor }) => {
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("");
  const placement = "right";

  const handleTextClick = () => {
    const fillColor =
      editor.foregroundColor !== editor.tshirtColor
        ? editor.foregroundColor
        : Color.black;

    editor.canvasController.addText(
      DEFAULT_TEXT_INPUT,
      editor.textFont,
      fillColor,
      true
    );
    const allObjects = editor.canvasController.canvas.getObjects();
    if (allObjects.length > 0) {
      const textObj: fabric.Object = allObjects[allObjects.length - 1];
      editor.canvasController.canvas.setActiveObject(textObj);
      setEditor({
        textFont: editor.textFont,
        textInput: DEFAULT_TEXT_INPUT,
        selectedObjects: [textObj],
        editing: true,
      });
    }
    setActiveTab("text");
  };

  const handleShow = (visible: boolean) => {
    setShow(visible);
  };

  const handleColorToggle = () => {
    setEditor({ fillSelected: !editor.fillSelected });
    setActiveTab(activeTab === "color" ? "" : "color");
  };

  const tools = [
    {
      id: "tshirt",
      icon: faShirt,
      label: "T-Shirt",
      hasPopover: true,
      popoverTitle: "T-Shirt Styles",
      popoverContent: <TShirtSelectionGroup editor={editor} setEditor={setEditor} />,
    },
    {
      id: "upload",
      icon: faUpload,
      label: "Upload",
      onClick: () => handleShow(true),
    },
    {
      id: "text",
      icon: faFont,
      label: "Text",
      onClick: handleTextClick,
    },
    {
      id: "color",
      icon: faPalette,
      label: "Colors",
      onClick: handleColorToggle,
    },
  ];

  return (
    <>
      <div className="side-toolbar">
        {tools.map((tool) => {
          if (tool.hasPopover) {
            return (
              <OverlayTrigger
                key={tool.id}
                trigger="click"
                placement={placement}
                overlay={
                  <Popover id={`popover-${tool.id}`}>
                    <Popover.Header className="popover-title">
                      {tool.popoverTitle}
                    </Popover.Header>
                    <Popover.Body className="popover-content">
                      {tool.popoverContent}
                    </Popover.Body>
                  </Popover>
                }
              >
                <div
                  className={`tool-item ${activeTab === tool.id ? "active" : ""}`}
                  onClick={() => setActiveTab(activeTab === tool.id ? "" : tool.id)}
                >
                  <div className="tool-icon">
                    <FontAwesomeIcon icon={tool.icon} />
                  </div>
                  <div className="tool-label">{tool.label}</div>
                </div>
              </OverlayTrigger>
            );
          }

          return (
            <div
              key={tool.id}
              className={`tool-item ${activeTab === tool.id ? "active" : ""}`}
              onClick={tool.onClick}
            >
              <div className="tool-icon">
                <FontAwesomeIcon icon={tool.icon} />
              </div>
              <div className="tool-label">{tool.label}</div>
            </div>
          );
        })}
      </div>
      <ImageUploadModal show={show} setShow={handleShow} canvas={canvas} />
    </>
  );
};

export default SideMenu;