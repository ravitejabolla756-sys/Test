// MY OWL FIXTURE
// Provider: Supabase
// Rule: supabase-management-logs-all-removal-2026-09-23
// Expected MY OWL classification: AFFECTED

const fetch = (...args: unknown[]) => Promise.resolve(args);
import '@supabase/supabase-js';

export async function validate(): Promise<unknown> {
  return fetch('https://project.supabase.co/analytics/endpoints/logs.all', {
    headers: {}
  });
}
