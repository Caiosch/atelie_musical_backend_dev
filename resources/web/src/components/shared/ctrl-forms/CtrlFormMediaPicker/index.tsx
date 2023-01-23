import React, { useState } from "react";

interface RenderProps {
  media: FormMedia;
  index: number;
  remove: () => void;
  update: (nextData: Partial<FormMedia>) => void;
  updateMany: (
    nextData: Partial<FormMedia>,
    current: Partial<FormMedia>
  ) => void;
}

interface CtrlFormMediaPickerProps {
  medias: FormMedia[];
  onChange: (medias: FormMedia[]) => void;
  render: (props: RenderProps) => React.ReactNode;
}

export interface FormMedia {
  isBase64: boolean;
  src: string;
  type?: string;
  size?: string;
  [key: string]: any;
}

const CtrlFormMediaPicker: React.FC<CtrlFormMediaPickerProps> = ({
  medias,
  onChange,
  render,
}) => {
  const removeMedia = (index: number) => {
    onChange(medias.filter((_, keyM) => keyM !== index));
  };

  const updateMedia = (index: number, data: Partial<FormMedia>) => {
    onChange(
      medias.map((media, keyM) => {
        if (index !== keyM) return media;
        return { ...media, ...data };
      })
    );
  };

  return (
    <>
      {medias.map((media, keyMedia) => (
        <React.Fragment key={`media${keyMedia}`}>
          {render({
            media,
            index: keyMedia,
            remove: () => removeMedia(keyMedia),
            update: (data) => updateMedia(keyMedia, data),
            updateMany: (data, currentData) => {
              const nextMedias = medias.map((media, indexMedia) => {
                if (keyMedia === indexMedia) {
                  return { ...media, ...currentData };
                } else {
                  return { ...media, ...data };
                }
              });

              onChange(nextMedias);
            },
          })}
        </React.Fragment>
      ))}
    </>
  );
};

export function mediaSrc(media: FormMedia) {
  return media.isBase64 ? media.src : media.src;
}

export function useMediaPicker() {
  const [medias, setMedias] = useState<FormMedia[]>([]);

  return {
    push: (...medias: FormMedia[]) => {
      setMedias((old) => [...old, ...medias]);
    },
    remove: (index: number) => {
      setMedias((old) => old.filter((_, i) => i !== index));
    },
    update: (index: number, data: Partial<FormMedia>) => {
      setMedias((old) =>
        old.map((v, i) => {
          if (i !== index) return v;
          return { ...v, ...data };
        })
      );
    },
    props: {
      onChange: setMedias,
      medias,
    },
    medias,
    set: setMedias,
  };
}

export default CtrlFormMediaPicker;
