import { RESOURCE_SERVER_BASE_URL } from "$frontend/config";

export class ResourceServerRequest {
  async get(path: string, params = {}) {
    const query = new URLSearchParams(params);
    const response: Response = await fetch(`${RESOURCE_SERVER_BASE_URL}/${path}?${query}`, {
      method: "GET",
    });

    return this.handleResponse(response);
  }

  private handleResponse(response: Response) {
    if (response.ok) {
      return response.json();
    }
    throw new Error("The API request has failed.")
  }
}
