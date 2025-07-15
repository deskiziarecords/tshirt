import React from "react";
import { State } from "../../../data_type/interfaces";

interface Props {
  editor: State;
  setEditor: (editorState: Record<string, any>, callback?: () => void) => void;
}

const TextureButtonsGroup: React.FC<Props> = ({ editor, setEditor }) => {
  const textures = [
    "images/textures/01.jpg",
    "images/textures/02.jpg",
    "images/textures/03.jpg",
    "images/textures/04.jpg",
    "images/textures/05.jpg",
  ];

  const handleTextureSelect = (textureUrl: string) => {
    editor.canvasController.updateTexture(textureUrl);
    setEditor({ isCanvasDeselected: false });
  };

  return (
    <>
      {textures.map((texture, index) => (
        <div
          key={index}
          className="texture-item"
          onClick={() => handleTextureSelect(texture)}
          title={`Texture ${index + 1}`}
        >
          <img
            src={texture}
            alt={`Texture ${index + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      ))}
    </>
  );
};

export default TextureButtonsGroup;