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
  return resend.emails.send(payload, options);
}
