// CONTROL FIXTURE: Unrelated Business Logic
// Expected MY OWL classification: CLEAN / UNAFFECTED

export interface CourseScore {
  studentId: string;
  midtermScore: number;
  finalScore: number;
  assignmentScore: number;
}

export function calculateWeightedMarks(score: CourseScore): number {
  const midtermWeight = 0.3;
  const assignmentWeight = 0.2;
  const finalWeight = 0.5;

  const total =
    score.midtermScore * midtermWeight +
    score.assignmentScore * assignmentWeight +
    score.finalScore * finalWeight;

  return Math.round(total * 100) / 100;
}

export function formatStudentReport(studentName: string, calculatedMarks: number): string {
  return `Student: ${studentName} | Final Weighted Marks: ${calculatedMarks.toFixed(2)}`;
}
