using BackendApi.Data;
using BackendApi.Interfaces;
using BackendApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendApi.Controllers;

[ApiController]
[Route("api/quiz")]
public class QuizController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IAnalysisService _analysisService;

    public QuizController(AppDbContext context, IAnalysisService analysisService)
    {
        _context = context;
        _analysisService = analysisService;
    }

    [HttpPost]
    public async Task<ActionResult<StudentQuiz>> SubmitQuiz([FromBody] StudentQuizSubmissionDto submission)
    {
        var quiz = new StudentQuiz
        {
            Id = Guid.NewGuid(),
            StudentName = submission.StudentName,
            KnowledgeScore = (submission.Q1 + submission.Q2 + submission.Q3) / 3,
            UtilityScore = (submission.Q4 + submission.Q5 + submission.Q6) / 3,
            JobFearScore = (submission.Q7 + submission.Q8 + submission.Q9) / 3,
            EthicsScore = (submission.Q10 + submission.Q11 + submission.Q12) / 3,
            OpportunityScore = (submission.Q13 + submission.Q14 + submission.Q15) / 3,
            ConcreteExamplesScore = (submission.Q16 + submission.Q17 + submission.Q18) / 3
        };

        quiz.AssignedPersona = _analysisService.ClassifyStudent(quiz);

        _context.StudentQuizzes.Add(quiz);
        await _context.SaveChangesAsync();

        return Ok(quiz);
    }

    [HttpGet("dashboard")]
    public async Task<ActionResult<IEnumerable<StudentQuiz>>> GetDashboard()
    {
        var students = await _context.StudentQuizzes.ToListAsync();
        return Ok(students);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteStudent(Guid id)
    {
        var student = await _context.StudentQuizzes.FindAsync(id);
        if (student == null) return NotFound();
        _context.StudentQuizzes.Remove(student);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpPut("{id}/reset")]
    public async Task<IActionResult> ResetAttempt(Guid id)
    {
        var student = await _context.StudentQuizzes.FindAsync(id);
        if (student == null) return NotFound();

        student.KnowledgeScore = 0;
        student.UtilityScore = 0;
        student.JobFearScore = 0;
        student.EthicsScore = 0;
        student.OpportunityScore = 0;
        student.ConcreteExamplesScore = 0;
        student.AssignedPersona = "Unclassified Persona";

        await _context.SaveChangesAsync();
        return Ok(student);
    }
}
