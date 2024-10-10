import axios from "axios";
import { GetQrCode } from "./getQrCode";
import { odkAxios } from "./useAxios";

export const qrSettings = async (
  xmlFormId: string,
  draftToken: string,
  title: string,
  projectId: string
) => {
  const encodedFormId = encodeURIComponent(xmlFormId);
  const baseUrl = `/v1/test/${draftToken}/projects/${projectId}/forms/${encodedFormId}/draft`;
  const qr = await axios.post("/api/get-qr-code", {
    url: `${process.env.NEXT_PUBLIC_ODK_CENTRAL_REST_API}${baseUrl}`,
    name: title,
  });

  return GetQrCode(qr.data.base64);
};

export const qrSettingPublish = async (
  title: string,
  projectId: string,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const appUserRes = await odkAxios.get(
      `/v1/projects/${projectId}/app-users`,
      config
    );

    const appUserToken = appUserRes.data[0].token;
    const baseUrl = `/v1/key/${appUserToken}/projects/${projectId}`;
    const qr = await axios.post("/api/get-qr-code", {
      url: `${process.env.NEXT_PUBLIC_ODK_CENTRAL_REST_API}${baseUrl}`,
      name: title,
    });

    return GetQrCode(qr.data.base64);
  } catch (error) {}
};

export const handleQRForPublished = async ({
  name,
  projectId,
  token,
  xmlFormId,
}: {
  projectId: string;
  xmlFormId: string;
  name: string;
  token: string;
}) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data: existingRoles } = await odkAxios.get<TokenResponse[]>(
      `/v1/projects/${projectId}/app-users`,
      config
    );

    const matchedData =
      existingRoles.find(i => i.displayName === `${xmlFormId}-user`) ||
      undefined;

    if (matchedData) {
      const baseUrl = `/v1/key/${matchedData.token}/projects/${projectId}`;
      const qr = await axios.post("/api/get-qr-code", {
        url: `${process.env.NEXT_PUBLIC_ODK_CENTRAL_REST_API}${baseUrl}`,
        name: name,
      });

      return { error: false, data: GetQrCode(qr.data.base64) };
    }

    const { data } = await odkAxios.post(
      `/v1/projects/${projectId}/app-users`,
      { displayName: `${xmlFormId}-user` },
      config
    );

    await odkAxios.post(
      `/v1/projects/${projectId}/forms/${xmlFormId}/assignments/2/${data.id}`,
      {},
      config
    );

    const baseUrl = `/v1/key/${data.token}/projects/${projectId}`;
    const qr = await axios.post("/api/get-qr-code", {
      url: `${process.env.NEXT_PUBLIC_ODK_CENTRAL_REST_API}${baseUrl}`,
      name: name,
    });

    return { error: false, data: GetQrCode(qr.data.base64) };
  } catch (error) {
    return { error: true, data: null };
  }
};

export type TokenResponse = {
  projectId: number;
  id: number;
  type: string;
  displayName: string;
  createdAt: string;
  updatedAt: any;
  deletedAt: any;
  token: string;
};
