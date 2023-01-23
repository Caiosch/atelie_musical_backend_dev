import { ApiApp } from "@/services/api/api.app";

export class AppTagMapper {
  public static toBadgeOptions(tag: ApiApp.Entities.AppTag): {
    label: string;
    value: string;
  } {
    return {
      label: tag.value,
      value: tag.key,
    };
  }
}
