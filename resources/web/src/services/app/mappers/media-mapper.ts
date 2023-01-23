import { FormMedia } from "@/components/shared/ctrl-forms/CtrlFormMediaPicker";
import { toBase64 } from "@/helpers/toBase64";

export class MediaMapper {
  static async fromFile(file: File) {
    return {
      isBase64: true,
      src: await toBase64(file),
      size: `${file.size}`,
      type: file.type,
    };
  }

  static async fromFiles(files: File[]) {
    return Promise.all(files.map<Promise<FormMedia>>(MediaMapper.fromFile));
  }

  static async fromFileList(fileList: FileList) {
    const files = Array.from(fileList || []);
    return this.fromFiles(files);
  }
}
