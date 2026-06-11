using BackendApi.Interfaces;
using BackendApi.Models;

namespace BackendApi.Services;

public class AnalysisService : IAnalysisService
{
    public string ClassifyStudent(StudentQuiz quiz)
    {
        if (quiz.KnowledgeScore >= 4 && quiz.UtilityScore >= 4 && quiz.JobFearScore <= 3)
        {
            return "The Confident Pioneer";
        }

        if (quiz.KnowledgeScore <= 3 && quiz.UtilityScore >= 4 && quiz.JobFearScore >= 4)
        {
            return "The Anxious Dependent";
        }

        if (quiz.UtilityScore <= 3 && quiz.EthicsScore >= 4)
        {
            return "The Skeptical Traditionalist";
        }

        return "Unclassified Persona";
    }
}
