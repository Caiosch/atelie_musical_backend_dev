import { createReactLink } from "@/helpers/app/createReactLink";

export const ArtistsLink = createReactLink(() => `/artists`);
export const ArtistLink = createReactLink<{ id: string }>(
  ({ id }) => `/artist/${id}`
);
export const RequestMusicLink = createReactLink(() => `/music/request`);
export const MusicLink = createReactLink<{ id: string }>(
  ({ id }) => `/music/${id}`
);
