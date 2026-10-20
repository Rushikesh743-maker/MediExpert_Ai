import { AssessmentInput, AssessmentResult } from '../types';

const INPUT_STORAGE_KEY = 'mediexpert_assessment_input';
const RESULT_STORAGE_KEY = 'mediexpert_assessment_result';

export function saveAssessmentInput(input: AssessmentInput): void {
  try {
    sessionStorage.setItem(INPUT_STORAGE_KEY, JSON.stringify(input));
  } catch (err) {
    console.warn('Unable to persist assessment input to sessionStorage:', err);
  }
}

export function getAssessmentInput(): AssessmentInput | null {
  try {
    const raw = sessionStorage.getItem(INPUT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AssessmentInput;
  } catch (err) {
    console.warn('Failed to parse assessment input from sessionStorage:', err);
    return null;
  }
}

export function saveAssessmentResult(result: AssessmentResult): void {
  try {
    sessionStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(result));
  } catch (err) {
    console.warn('Unable to persist assessment result to sessionStorage:', err);
  }
}

export function getAssessmentResult(): AssessmentResult | null {
  try {
    const raw = sessionStorage.getItem(RESULT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AssessmentResult;
  } catch (err) {
    console.warn('Failed to parse assessment result from sessionStorage:', err);
    return null;
  }
}

export function clearAssessmentSession(): void {
  try {
    sessionStorage.removeItem(INPUT_STORAGE_KEY);
    sessionStorage.removeItem(RESULT_STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to clear sessionStorage:', err);
  }
}
