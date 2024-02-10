class MapHttp {
  http200(message: string = "Fetching ok!", data?: any) {
    return {
      code: 200,
      response: {
        ok: true,
        message,
        data,
      },
    };
  }
  http201(message: string = "Register succesfully!", data?: any) {
    return {
      code: 201,
      response: {
        ok: true,
        message,
        data,
      },
    };
  }

  http400(message: string = "Error file not found!", data?: any) {
    return {
      code: 400,
      response: {
        ok: false,
        message,
        data,
      },
    };
  }

  http401(message: string = "Error, no authorization!", data?: any) {
    return {
      code: 401,
      response: {
        ok: false,
        message,
        data,
      },
    };
  }

  http403(message: string = "Error forbidden", data?: any) {
    return {
      code: 403,
      response: {
        ok: false,
        message,
        data,
      },
    };
  }

  http500(message: string = "Error server", error?: any) {
    return {
      code: 500,
      response: {
        ok: false,
        message,
        data: error,
      },
    };
  }
}

export const http = new MapHttp();
