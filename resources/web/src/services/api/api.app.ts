import { FormMedia } from "@/components/shared/ctrl-forms/CtrlFormMediaPicker";
import { HttpClient } from "../external/http";

export class ApiApp {
  private client = new HttpClient(import.meta.env.VITE_API_URL);

  private _user?: ApiApp.Entities.User;

  public get isAuth() {
    return !!this._user;
  }

  private withApiUrl(path: string) {
    if (this.isAuth) {
      return path.replace("/api", "/api/oauth");
    }

    return path;
  }

  public async getSettings() {
    return this.client
      .send<ApiApp.Response<ApiApp.Response$Settings>>(`/api/settings`)
      .then((res) => res);
  }

  public async findMusic(musicId: string | number) {
    return this.client
      .send<ApiApp.Response<ApiApp.Response$Music>>(`/api/musics/${musicId}`)
      .then((res) => res.body.data.music);
  }

  public async findArtist(artistId: string | number) {
    return this.client
      .send<ApiApp.Response<{ artist: ApiApp.Entities.Artist }>>(
        `/api/artists/${artistId}`
      )
      .then((res) => res.body.data.artist);
  }

  public async getRequests(filter?: any) {
    return this.filter<ApiApp.Entities.RequestMusic>(
      `/api/oauth/requests`,
      filter
    );
  }

  public async getMusics(filter?: any) {
    return this.filter<ApiApp.Entities.Music>(`/api/musics`, filter);
  }

  public async getArtists(filter?: any) {
    return this.filter<ApiApp.Entities.Artist>(`/api/artists`, filter);
  }

  public async getUsers(filter?: any) {
    return this.filter<ApiApp.Entities.User>(`/api/oauth/users`, filter);
  }

  public async getSubscriptions(filter?: any) {
    return this.filter<ApiApp.Entities.Subscription>(
      `/api/oauth/subscriptions`,
      filter
    );
  }

  private async filter<T>(url: string, filter?: any) {
    return this.client.send<ApiApp.ResponsePagination<T[]>>(url, {
      qs: filter,
    });
  }

  public async requestMusic(body: any) {
    return this.client
      .send<ApiApp.Response<ApiApp.Response$RequestMusic>>(
        this.withApiUrl(`/api/musics`),
        {
          method: "post",
          body,
        }
      )
      .then((res) => res);
  }

  public async updateUser(userId: string | number, userData: any) {
    return this.client
      .send<ApiApp.Response<{ user: ApiApp.Entities.User }>>(
        `/api/oauth/users/${userId}`,
        { body: userData, method: "put" }
      )
      .then((res) => res.body.data);
  }

  public async updatePassword(data: any) {
    return this.client
      .send<ApiApp.Response<{ user: ApiApp.Entities.User }>>(
        `/api/oauth/password`,
        { body: data, method: "put" }
      )
      .then(() => true)
      .catch(() => false);
  }

  public async addUser(user: any) {
    return this.client
      .send<ApiApp.Response<{ user: ApiApp.Entities.User }>>(
        `/api/oauth/register`,
        { method: "post", body: user }
      )
      .then((res) => res.body.data.user);
  }

  public async recoveryPassword(data: any) {
    return this.client
      .send<ApiApp.Response<{}>>(`/api/password-recovery`, {
        method: "post",
        body: data,
      })
      .then(() => true);
  }

  public async resetPassword(data: any) {
    return this.client
      .send<ApiApp.Response<{}>>(`/api/password-reset`, {
        method: "post",
        body: data,
      })
      .then(() => true);
  }

  public async addArtist(artist: any) {
    return this.client
      .send<ApiApp.Response<ApiApp.Entities.Artist>>(`/api/oauth/artists`, {
        body: artist,
        method: "post",
      })
      .then((res) => res.body);
  }

  private async sendPayment(
    url: string,
    requestId: string | number,
    result: any
  ) {
    return this.client
      .send<ApiApp.Response<{ success: boolean }>>(url, {
        body: { id: requestId, result },
        method: "post",
      })
      .then(() => true)
      .catch(() => false);
  }

  public async sendPaypalPayment(requestId: string | number, result: any) {
    return this.sendPayment(`/api/callbacks/paypal`, requestId, result);
  }

  public async updateArtist(artistId: string | number, artist: any) {
    return this.client
      .send<ApiApp.Response<ApiApp.Entities.Artist>>(
        `/api/oauth/artists/${artistId}`,
        {
          body: artist,
          method: "put",
        }
      )
      .then((res) => res.body);
  }

  public async addSubscription(subscription: any) {
    return this.client
      .send<ApiApp.Response<{ subscription: ApiApp.Entities.Subscription }>>(
        `/api/subscriptions`,
        {
          body: subscription,
          method: "post",
        }
      )
      .then((res) => res.body);
  }

  public resolveFileUrl(src: string) {
    return `${import.meta.env.VITE_API_URL}/storage${src}`;
  }

  public async setMusicRequest(requestId: string | number, data: any) {
    return this.client
      .send<ApiApp.Response<{ request: ApiApp.Entities.RequestMusic }>>(
        `/api/oauth/requests/${requestId}`,
        {
          method: "put",
          body: data,
        }
      )
      .then((res) => res.body.data.request);
  }

  public async findRequestMusic(requestId: string | number) {
    return this.client
      .send<ApiApp.Response<{ request: ApiApp.Entities.RequestMusic }>>(
        this.withApiUrl(`/api/requests/${requestId}`)
      )
      .then((res) => res.body.data.request);
  }

  public async registerMusicRequestOrder(
    requestId: number | string,
    provider: "paypal" | "pagseguro"
  ) {
    return this.client
      .send<
        ApiApp.Response<{
          request: ApiApp.Entities.RequestMusic;
          external_data: any;
          checkout_url: string;
        }>
      >(`/api/oauth/orders`, {
        body: { requestId, provider },
        method: "post",
      })
      .then((res) => res.body.data);
  }

  public async sendMusicRequestMedias(requestId: string | number, data: any) {
    return this.client.send(`/api/oauth/requests/${requestId}/medias`, {
      body: data,
      method: "post",
    });
  }

  public async authenticateByEmail({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<ApiApp.Response$Auth> {
    return this.client
      .send<ApiApp.Response<ApiApp.Response$Auth>>("/api/oauth/login", {
        method: "post",
        body: { email, password },
      })
      .then((res) => res.body.data)
      .then((res) => {
        this.client.setToken(res.token);
        this._user = res.user;
        return res;
      });
  }

  public async authenticateByToken(
    token: string
  ): Promise<ApiApp.Response$Auth> {
    const user = await this.getAuthUser(token);
    this._user = user;

    return {
      user,
      token,
    };
  }

  public async getAuthUser(token?: string) {
    token && this.client.setToken(token);
    return this.client
      .send<ApiApp.Response<{ user: ApiApp.Entities.User }>>(`/api/oauth`)
      .then((res) => res.body.data.user);
  }

  public async findUser(userId: string | number) {
    return this.client
      .send<ApiApp.Response<{ user: ApiApp.Entities.User }>>(
        `/api/oauth/users/${userId}`
      )
      .then((res) => res.body.data.user);
  }
}

export namespace ApiApp {
  export namespace Entities {
    interface Model {
      id: number;
      created_at: string;
      updated_at: string;
    }

    export interface AppTag extends Model {
      key: string;
      value: string;
      type: string;
      bg?: string;
      color?: string;
    }

    export interface RequestMusic extends Model {
      artist_id: number;
      choice_artist: boolean;
      is_payed: boolean;
      delivery_type: boolean;
      payment_status: "waiting" | "payed" | "canceled" | "error";
      payment_reference: string;
      payed_at: string;
      delivered_at: string;
      delivery_date: string;
      price_total: string;
      status:
        | "waiting_payment"
        | "waiting_images"
        | "waiting_production"
        | "finished";
      data: any;
      privacy: "public" | "private";
      user?: ApiApp.Entities.User;
      artist?: ApiApp.Entities.Artist;
      is_main: boolean;
      music?: ApiApp.Entities.Music;
    }

    export interface Music extends Model {
      name: string;
      file: FormMedia;
      lyrics: string;
      link_music_app: string;
      video_file: FormMedia;
      video_youtube: string;
      visualizer_file: FormMedia;
      visualizer_youtube: string;
      artist_record_file: FormMedia;
      artist: ApiApp.Entities.Artist;
      occasion: string;
      is_main: boolean;
    }

    export interface User extends Model {
      name: string;
      email: string;
      phone_number?: string;
      from_where?: string;
      cpf?: string;
      email_verified_at: string;
      role: "admin" | "user";
      address_street?: string;
      requests?: ApiApp.Entities.RequestMusic[];
    }

    export interface Subscription extends Model {
      name: string;
      type: "newsletter";
      email: string;
      phone_number: string;
    }

    export interface Artist extends Model {
      full_name: string;
      voice_gender: "M" | "F";
      phone_number: string;
      email: string;
      description: string;
      medias: FormMedia[];
      data?: {
        images?: (FormMedia & { isMain: boolean })[];
        musicalStyles?: string[];
        musics?: (FormMedia & { isMain: boolean })[];
      };
      social_youtube: string;
      social_tiktok: string;
      social_instagram: string;
      musics?: ApiApp.Entities.RequestMusic[];
      music?: ApiApp.Entities.RequestMusic;
    }
  }

  export interface Response$Settings {
    tags: ApiApp.Entities.AppTag[];
    artists: ApiApp.Entities.Artist[];
  }

  export interface Response$RequestMusic {
    request: ApiApp.Entities.RequestMusic;
  }

  export interface Response$Music {
    music: ApiApp.Entities.Music;
  }

  export interface Response$Auth {
    user: ApiApp.Entities.User;
    token: string;
  }

  export interface Response<T> {
    data: T;
    message: string | null;
  }

  export interface ResponsePagination<T> extends Response<T> {
    meta: {
      current_page: number;
      last_page: number;
    };
  }
}
