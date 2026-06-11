const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5251'

export const QUIZ_API_URL = `${API_BASE}/api/quiz`
export const DASHBOARD_API_URL = `${API_BASE}/api/quiz/dashboard`

export function quizStudentUrl(id) {
  return `${QUIZ_API_URL}/${id}`
}

export function quizResetUrl(id) {
  return `${QUIZ_API_URL}/${id}/reset`
}
