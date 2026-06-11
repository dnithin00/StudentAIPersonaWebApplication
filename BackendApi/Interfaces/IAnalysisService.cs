using BackendApi.Models;

namespace BackendApi.Interfaces;

public interface IAnalysisService
{
    string ClassifyStudent(StudentQuiz quiz);
}
