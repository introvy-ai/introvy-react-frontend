import { supabase } from './supabaseClient';

export async function hasReachedSubmissionLimit(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('monthly_submission_count')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error checking submission limit:', error);
    return false;
  }

  return data.monthly_submission_count >= 3;
}
