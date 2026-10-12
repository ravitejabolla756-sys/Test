import sgMail from '@sendgrid/mail';

export function configureSendGrid(): typeof sgMail {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? 'SG.fixture_key_placeholder');
  return sgMail;
}

export async function sendTransactionalEmail(
  client: typeof sgMail,
  to: string,
  from: string,
  subject: string,
  text: string
) {
  return client.send({
    to,
    from,
    subject,
    text
  });
}
