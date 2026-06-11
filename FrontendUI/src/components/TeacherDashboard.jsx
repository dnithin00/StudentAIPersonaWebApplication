import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  AlertCircle,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Loader2,
  RefreshCw,
  UserCircle,
  Users,
  X,
} from 'lucide-react'
import { DASHBOARD_API_URL, quizResetUrl, quizStudentUrl } from '../config/api'
import {
  getInterventionGuidance,
  SCORE_CATEGORIES,
} from '../utils/personaGuidance'

function personaBadgeClass(persona) {
  switch (persona) {
    case 'The Confident Pioneer':
      return 'bg-emerald-100 text-emerald-800 ring-emerald-200'
    case 'The Anxious Dependent':
      return 'bg-amber-100 text-amber-900 ring-amber-200'
    case 'The Skeptical Traditionalist':
      return 'bg-violet-100 text-violet-900 ring-violet-200'
    default:
      return 'bg-slate-100 text-slate-700 ring-slate-200'
  }
}

function ScoreBar({ label, score }) {
  const safeScore = Math.min(5, Math.max(0, score ?? 0))
  const percent = (safeScore / 5) * 100

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="font-semibold text-slate-900">
          {safeScore} <span className="font-normal text-slate-500">/ 5</span>
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

function StudentProfilePanel({
  student,
  onClose,
  onResetAttempt,
  onDeleteStudent,
  actionInProgress,
}) {
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false)

  useEffect(() => {
    setShowDetailedAnalysis(false)
  }, [student?.id])

  if (!student) return null

  const guidance = getInterventionGuidance(student.assignedPersona)

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close profile"
      />

      <aside
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col border-l border-slate-200 bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-title"
      >
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Student Profile
            </p>
            <h2
              id="profile-title"
              className="mt-1 text-2xl font-bold text-slate-900"
            >
              {student.studentName}
            </h2>
            <span
              className={`mt-3 inline-flex rounded-full px-3 py-1 text-sm font-semibold ring-1 ring-inset ${personaBadgeClass(student.assignedPersona)}`}
            >
              {student.assignedPersona}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Category Scores
          </h3>
          <div className="space-y-5">
            {SCORE_CATEGORIES.map(({ key, label }) => (
              <ScoreBar
                key={key}
                label={label}
                score={student[key]}
              />
            ))}
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-amber-200 bg-amber-50 shadow-sm transition-all duration-300">
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Intervention Guidelines
              </p>
              <p className="mt-3 text-sm font-semibold text-amber-900">
                Actionable Advice
              </p>
              <p className="mt-2 text-base leading-relaxed text-amber-950">
                {guidance.advice}
              </p>

              <button
                type="button"
                onClick={() => setShowDetailedAnalysis((prev) => !prev)}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-amber-300 bg-white px-4 py-2.5 text-sm font-semibold text-amber-900 shadow-sm transition hover:border-amber-400 hover:bg-amber-100/60"
                aria-expanded={showDetailedAnalysis}
              >
                {showDetailedAnalysis ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    Hide Detailed Analysis
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    View Detailed Analysis
                  </>
                )}
              </button>
            </div>

            <div
              className={`grid transition-all duration-300 ease-in-out ${
                showDetailedAnalysis
                  ? 'grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="space-y-5 border-t border-amber-200 bg-white/70 px-5 py-5">
                  <section>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Current Psychological State
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      {guidance.state}
                    </p>
                  </section>
                  <section>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      AI Impact / Influence on Career Imagination
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      {guidance.careerInfluence}
                    </p>
                  </section>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t border-slate-200 pt-6 sm:flex-row">
            <button
              type="button"
              disabled={actionInProgress === student.id}
              onClick={() => onResetAttempt(student.id)}
              className="flex-1 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-900 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Reset Attempt
            </button>
            <button
              type="button"
              disabled={actionInProgress === student.id}
              onClick={() => onDeleteStudent(student.id)}
              className="flex-1 rounded-xl border border-red-300 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Delete Student
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default function TeacherDashboard() {
  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [actionInProgress, setActionInProgress] = useState(null)
  const [actionError, setActionError] = useState('')

  const fetchStudents = async () => {
    setIsLoading(true)
    setError('')

    try {
      const { data } = await axios.get(DASHBOARD_API_URL)
      setStudents(Array.isArray(data) ? data : [])
    } catch (err) {
      const message =
        err.response?.data?.title ??
        err.response?.data?.message ??
        err.message ??
        'Failed to load dashboard data. Is the backend running?'
      setError(message)
      setStudents([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const handleDeleteStudent = async (id) => {
    const student = students.find((s) => s.id === id)
    if (
      !window.confirm(
        `Delete ${student?.studentName ?? 'this student'}? This cannot be undone.`,
      )
    ) {
      return
    }

    setActionInProgress(id)
    setActionError('')

    try {
      await axios.delete(quizStudentUrl(id))
      setStudents((prev) => prev.filter((s) => s.id !== id))
      if (selectedStudent?.id === id) {
        setSelectedStudent(null)
      }
    } catch (err) {
      setActionError(
        err.response?.data?.title ??
          err.message ??
          'Failed to delete student.',
      )
    } finally {
      setActionInProgress(null)
    }
  }

  const handleResetAttempt = async (id) => {
    if (
      !window.confirm(
        'Reset this student\'s scores and persona to baseline values?',
      )
    ) {
      return
    }

    setActionInProgress(id)
    setActionError('')

    try {
      const { data } = await axios.put(quizResetUrl(id))
      setStudents((prev) =>
        prev.map((s) => (s.id === id ? data : s)),
      )
      if (selectedStudent?.id === id) {
        setSelectedStudent(data)
      }
    } catch (err) {
      setActionError(
        err.response?.data?.title ??
          err.message ??
          'Failed to reset attempt.',
      )
    } finally {
      setActionInProgress(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-indigo-100">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-12">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
              Instructor Portal
            </p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Teacher Dashboard
            </h1>
            <p className="mt-2 text-slate-600">
              Review student personas and plan targeted interventions.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-indigo-300 hover:text-indigo-700"
            >
              <ClipboardList className="h-4 w-4" />
              Student Kiosk
            </Link>
            <button
              type="button"
              onClick={fetchStudents}
              disabled={isLoading}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-indigo-700 disabled:opacity-60"
            >
              <RefreshCw
                className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
              />
              Refresh
            </button>
          </div>
        </header>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/80 bg-white p-6 shadow-lg shadow-slate-200/50 sm:col-span-1">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
                <Users className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Students Surveyed
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {isLoading ? '—' : students.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {actionError && (
          <p
            className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {actionError}
          </p>
        )}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-slate-500">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
              <p>Loading student records…</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
              <AlertCircle className="h-10 w-10 text-red-500" />
              <p className="max-w-md text-red-700">{error}</p>
              <button
                type="button"
                onClick={fetchStudents}
                className="mt-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Try Again
              </button>
            </div>
          ) : students.length === 0 ? (
            <div className="flex flex-col items-center gap-3 px-6 py-20 text-center text-slate-500">
              <UserCircle className="h-12 w-12 text-slate-300" />
              <p className="font-medium text-slate-700">No submissions yet</p>
              <p className="text-sm">
                Students can complete the quiz at the kiosk to appear here.
              </p>
              <Link
                to="/"
                className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
              >
                Go to Student Kiosk →
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Assigned Persona</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students.map((student) => (
                    <tr
                      key={student.id}
                      className="transition hover:bg-slate-50/80"
                    >
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {student.studentName}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${personaBadgeClass(student.assignedPersona)}`}
                        >
                          {student.assignedPersona}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedStudent(student)}
                            className="rounded-lg bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700 ring-1 ring-indigo-100 transition hover:bg-indigo-100"
                          >
                            View Full Profile
                          </button>
                          <button
                            type="button"
                            disabled={actionInProgress === student.id}
                            onClick={() => handleResetAttempt(student.id)}
                            className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            Reset Attempt
                          </button>
                          <button
                            type="button"
                            disabled={actionInProgress === student.id}
                            onClick={() => handleDeleteStudent(student.id)}
                            className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            Delete Student
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <StudentProfilePanel
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
        onResetAttempt={handleResetAttempt}
        onDeleteStudent={handleDeleteStudent}
        actionInProgress={actionInProgress}
      />
    </div>
  )
}
