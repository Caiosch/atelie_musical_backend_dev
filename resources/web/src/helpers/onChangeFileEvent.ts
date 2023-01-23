type Callback = (medias: File[]) => void;

export function onChangeFileEvent(cb: Callback) {
  const input = document.createElement("input");
  input.type = "file";

  input.addEventListener("change", async (e: any) => {
    const files: File[] = Array.from(e.target.files || []);
    cb(files);

    input.remove();
  });

  return input;
}
