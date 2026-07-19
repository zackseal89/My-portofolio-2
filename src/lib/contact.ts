/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// This site is a fully static build with no backend, database, or server function
// anywhere behind it. "Submitting" a lead simply builds a pre-filled mailto: link
// and hands it to the visitor's own email client. The message never touches a
// server we run. Simple, honest, and there is nothing here that can be breached.

export const CONTACT_EMAIL = 'zacharyongeri121@gmail.com';

export interface LeadPayload {
  name: string;
  email: string;
  message: string;
}

export const buildMailtoUrl = (lead: LeadPayload): string => {
  const subject = `Systems inquiry from ${lead.name}`;
  const body = `${lead.message}\n\n---\nFrom: ${lead.name}\nReply-to: ${lead.email}`;

  const params = new URLSearchParams({ subject, body });
  return `mailto:${CONTACT_EMAIL}?${params.toString()}`;
};

// Opens the visitor's default mail client with the brief pre-filled.
// Returns true if the attempt was made (there's no reliable way to confirm
// an external mail client actually opened, so callers should treat this as
// "dispatched" rather than "delivered").
export const sendLeadViaMailto = (lead: LeadPayload): boolean => {
  try {
    window.location.href = buildMailtoUrl(lead);
    return true;
  } catch {
    return false;
  }
};
