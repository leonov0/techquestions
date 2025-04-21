import {
  type CreateEmailOptions,
  type CreateEmailRequestOptions,
  type CreateEmailResponse,
  Resend,
} from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export function sendEmail(
  payload: CreateEmailOptions,
  options?: CreateEmailRequestOptions,
): Promise<CreateEmailResponse> {
  if (process.env.NODE_ENV === "development") {
    console.info("Sending email: ", payload);

    return Promise.resolve({
      data: {
        id: "mocked_email_id",
      },
      error: null,
    });
  }

  return resend.emails.send(payload, options);
}
