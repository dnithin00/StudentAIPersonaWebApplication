import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { CheckCircle2, LayoutDashboard, Loader2 } from 'lucide-react'
import { QUIZ_API_URL } from '../config/api'
import { LIKERT_LABELS, QUIZ_QUESTIONS } from '../quizQuestions'

const QUESTION_IDS = QUIZ_QUESTIONS.map((q) => q.id)

function createDefaultAnswers() {
  return QUESTION_IDS.reduce((acc, id) => {
    acc[id] = 3
    return acc
  }, {})
}

export default function StudentKiosk() {
  const [studentName, setStudentName] = useState('')
  const [answers, setAnswers] = useState(createDefaultAnswers)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const groupedQuestions = useMemo(() => {
    const groups = []
    let currentCategory = null

    for (const question of QUIZ_QUESTIONS) {
      if (question.category !== currentCategory) {
        currentCategory = question.category
        groups.push({ category: currentCategory, questions: [] })
      }
      groups[groups.length - 1].questions.push(question)
    }

    return groups
  }, [])

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const resetForm = () => {
    setStudentName('')
    setAnswers(createDefaultAnswers())
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    const trimmedName = studentName.trim()
    if (!trimmedName) {
      setError('Please enter your name before submitting.')
      return
    }

    const invalidQuestion = QUESTION_IDS.find(
      (id) => answers[id] < 1 || answers[id] > 5,
    )
    if (invalidQuestion) {
      setError('Please answer every question on the 1–5 scale.')
      return
    }

    const payload = {
      studentName: trimmedName,
      ...QUESTION_IDS.reduce((acc, id) => {
        acc[id.toLowerCase()] = answers[id]
        return acc
      }, {}),
    }

    setIsSubmitting(true)

    try {
      await axios.post(QUIZ_API_URL, payload)
      setShowSuccess(true)
      resetForm()
      window.setTimeout(() => setShowSuccess(false), 4500)
    } catch (err) {
      const message =
        err.response?.data?.title ??
        err.response?.data?.message ??
        err.message ??
        'Unable to submit your quiz. Please try again.'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-indigo-50">
      {showSuccess && (
        <div
          className="fixed inset-x-0 top-6 z-50 flex justify-center px-4"
          role="status"
          aria-live="polite"
        >
          <div className="flex max-w-lg items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-4 shadow-lg shadow-emerald-100/80">
            <CheckCircle2 className="h-7 w-7 shrink-0 text-emerald-600" />
            <p className="text-base font-medium text-emerald-900">
              Thank you! Your response has been recorded.
            </p>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
        <header className="mb-10">
          <div className="mb-6 flex justify-center sm:justify-end">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:border-indigo-300 hover:text-indigo-700"
            >
              <LayoutDashboard className="h-4 w-4" />
              Teacher Dashboard
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white/90 px-6 py-8 text-center shadow-lg shadow-slate-200/50 backdrop-blur-sm sm:px-10 sm:py-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Capstone Research Study
            </p>
            <h1 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-[2rem] lg:leading-snug">
              The Impact of AI on Students' Future Career Imagination
            </h1>
            <p className="mt-5 text-base font-medium text-slate-600 sm:text-lg">
               Student Name:{' '}
              <span className="text-slate-900">Nithin</span>
            </p>
            <p className="mt-5 text-base font-medium text-slate-600 sm:text-lg">
               Supervisors:{' '}
              <span className="text-slate-900">Professor Dr. Jinan Zou</span>
              <span className="text-slate-900">, Jiayu Huang</span>
              <span className="text-slate-900">, Kefan Chen</span>


            </p>
            <div className="mx-auto mt-6 h-px w-16 bg-indigo-200" aria-hidden />
            <p className="mt-6 text-sm leading-relaxed text-slate-500 sm:text-base">
              Please answer honestly. There are no right or wrong answers.
            </p>
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-10"
        >
          <div className="mb-10">
            <label
              htmlFor="studentName"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Student Name
            </label>
            <input
              id="studentName"
              type="text"
              autoComplete="name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-lg text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div className="space-y-12">
            {groupedQuestions.map((group) => (
              <section key={group.category}>
                <h2 className="mb-6 border-b border-indigo-100 pb-2 text-lg font-semibold text-indigo-900">
                  {group.category}
                </h2>

                <div className="space-y-8">
                  {group.questions.map((question) => (
                    <fieldset
                      key={question.id}
                      className="rounded-2xl bg-slate-50/80 p-5 ring-1 ring-slate-100"
                    >
                      <legend className="mb-4 text-base font-medium leading-relaxed text-slate-800">
                        <span className="mr-2 font-bold text-indigo-600">
                          {question.number}.
                        </span>
                        {question.text}
                      </legend>

                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 sm:text-sm">
                        <span>{LIKERT_LABELS[1]}</span>
                        <span>{LIKERT_LABELS[5]}</span>
                      </div>

                      <div className="mt-3 grid grid-cols-5 gap-2 sm:gap-3">
                        {[1, 2, 3, 4, 5].map((value) => {
                          const inputId = `${question.id}-${value}`
                          const isSelected = answers[question.id] === value

                          return (
                            <label
                              key={inputId}
                              htmlFor={inputId}
                              className={`flex cursor-pointer flex-col items-center rounded-xl border px-1 py-3 text-center transition sm:px-2 ${
                                isSelected
                                  ? 'border-indigo-500 bg-indigo-600 text-white shadow-md shadow-indigo-200'
                                  : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50'
                              }`}
                            >
                              <input
                                id={inputId}
                                type="radio"
                                name={question.id}
                                value={value}
                                checked={isSelected}
                                onChange={() =>
                                  handleAnswerChange(question.id, value)
                                }
                                className="sr-only"
                              />
                              <span className="text-lg font-bold">{value}</span>
                              <span className="mt-1 hidden text-[10px] leading-tight sm:block">
                                {LIKERT_LABELS[value].split(' ')[0]}
                              </span>
                            </label>
                          )
                        })}
                      </div>
                    </fieldset>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {error && (
            <p
              className="mt-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              role="alert"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-10 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-indigo-300/50 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Submitting…
              </>
            ) : (
              'Submit Quiz'
            )}
          </button>
        </form>
      </main>
    </div>
  )
}
