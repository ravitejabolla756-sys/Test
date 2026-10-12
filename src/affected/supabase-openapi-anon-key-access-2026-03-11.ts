// MY OWL FIXTURE
// Provider: Supabase
// Rule: supabase-openapi-anon-key-access-2026-03-11
// Expected MY OWL classification: AFFECTED

const fetch = (...args: unknown[]) => Promise.resolve(args);
import '@supabase/supabase-js';

export async function validate(): Promise<unknown> {
  return fetch('https://project.supabase.co/rest/v1/', {
    headers: { 'anon key': 'static-class-evidence' }
  });
}
