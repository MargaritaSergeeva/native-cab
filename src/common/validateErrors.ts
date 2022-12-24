interface ErrorResponse {
  message: string,
  errors: { [key: string]: string }
}

interface ValidateData {
  [key: string]: string | null,
}

export class Validate {
  response: ErrorResponse;
  data: ValidateData;

  constructor(response: ErrorResponse, data: ValidateData) {
    this.response = response;
    this.data = data;
    this.parse();
  }

  parse() {
    for (const key in this.data) {
      this.data[key] = this.response.errors[key] ? this.response.errors[key][0] : null;
    }
  }
}
