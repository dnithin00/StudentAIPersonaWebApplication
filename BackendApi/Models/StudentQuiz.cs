namespace BackendApi.Models;

public class StudentQuiz
{
    public Guid Id { get; set; }
    public string StudentName { get; set; } = string.Empty;
    public int KnowledgeScore { get; set; }
    public int UtilityScore { get; set; }
    public int JobFearScore { get; set; }
    public int EthicsScore { get; set; }
    public int OpportunityScore { get; set; }
    public int ConcreteExamplesScore { get; set; }
    public string AssignedPersona { get; set; } = string.Empty;
}
