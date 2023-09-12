const reqUrl = process.env.NEXT_PUBLIC_REQ_URL

export const useRequest = {
  post: async (data: any, endpoint: string) => {
    try {
      const response = await fetch(reqUrl + endpoint, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Request failed with status ' + response.status);
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return {error: 'Failed to make request.'}
    }
  },
  get: async (endpoint: string, queryParams: any = {}) => {
    try {
      const query = Object.keys(queryParams)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key]))
        .join('&');

      const response = await fetch(reqUrl + endpoint + (query ? `?${query}` : ''), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Request failed with status ' + response.status);
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return {error: 'Failed to make request.'}
    }
  },
  delete: async (data: any, endpoint: string) => {
    try {
      const response = await fetch(reqUrl + endpoint, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Request failed with status ' + response.status);
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return {error: 'Failed to make request.'}
    }
  },
  patch: async (data: any, endpoint: string) => {
    try {
      const response = await fetch(reqUrl + endpoint, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Request failed with status ' + response.status);
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return {error: 'Failed to make request.'}
    }
  },
}
  