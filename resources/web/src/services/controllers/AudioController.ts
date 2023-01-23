export class AudioController {
  private blobs: Blob[] = [];

  private stream?: MediaStream;

  private recorder?: MediaRecorder;

  public async start() {
    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      return Promise.reject(
        new Error(
          "mediaDevices API or getUserMedia method is not supported in this browser."
        )
      );
    } else {
      return navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          this.stream = stream;

          this.recorder = new MediaRecorder(stream);
          this.recorder.addEventListener("dataavailable", (e) => {
            this.blobs.push(e.data);
          });

          this.recorder.start();
        })
        .catch((error) => {
          switch (error.name) {
            case "AbortError": //error from navigator.mediaDevices.getUserMedia
              console.log("An AbortError has occured.");
              break;
            case "NotAllowedError": //error from navigator.mediaDevices.getUserMedia
              console.log(
                "A NotAllowedError has occured. User might have denied permission."
              );
              break;
            case "NotFoundError": //error from navigator.mediaDevices.getUserMedia
              console.log("A NotFoundError has occured.");
              break;
            case "NotReadableError": //error from navigator.mediaDevices.getUserMedia
              console.log("A NotReadableError has occured.");
              break;
            case "SecurityError": //error from navigator.mediaDevices.getUserMedia or from the MediaRecorder.start
              console.log("A SecurityError has occured.");
              break;
            case "TypeError": //error from navigator.mediaDevices.getUserMedia
              console.log("A TypeError has occured.");
              break;
            case "InvalidStateError": //error from the MediaRecorder.start
              console.log("An InvalidStateError has occured.");
              break;
            case "UnknownError": //error from the MediaRecorder.start
              console.log("An UnknownError has occured.");
              break;
            default:
              console.log("An error occured with the error name " + error.name);
              break;
          }
        });
    }
  }

  public async stop() {
    return new Promise<Blob | undefined>((resolve) => {
      if (!this.recorder || !this.stream) {
        resolve(undefined);
        return;
      }

      const { mimeType } = this.recorder;
      this.recorder.addEventListener("stop", (e) => {
        const audioBlob = new Blob(this.blobs, { type: mimeType });
        resolve(audioBlob);
      });

      this.recorder.stop();
      this.stream.getTracks().forEach((track) => track.stop());
      this.reset();
    });
  }

  public async cancel() {
    if (!this.recorder || !this.stream) return;
    this.recorder.stop();
    this.stream.getTracks().forEach((track) => track.stop());
    this.reset();
  }

  private reset() {
    this.stream = undefined;
    this.recorder = undefined;
    this.blobs = [];
  }
}
