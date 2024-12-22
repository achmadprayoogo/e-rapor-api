import { PrismaClient } from "@prisma/client";
import { seedScores, setPrismaClient } from "../prisma/seeders/scoresSeeder";

// Mock the PrismaClient
jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn(() => ({
      students: {
        findMany: jest.fn(),
      },
      subject: {
        findMany: jest.fn(),
      },
      scores: {
        createMany: jest.fn(),
      },
      $disconnect: jest.fn(),
    })),
  };
});

describe("seedScores", () => {
  let prismaClient;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Get the mocked instance
    prismaClient = new PrismaClient();
    setPrismaClient(prismaClient);
  });

  it("should successfully seed scores when students and subjects exist", async () => {
    // Mock data
    const mockStudents = [
      { id: 1, name: "Student 1" },
      { id: 2, name: "Student 2" },
    ];
    const mockSubjects = [
      { id: 1, name: "Subject 1" },
      { id: 2, name: "Subject 2" },
    ];
    const mockCreateManyResult = { count: 4 }; // 2 students * 2 subjects = 4 scores

    // Setup mock implementations
    prismaClient.students.findMany.mockResolvedValue(mockStudents);
    prismaClient.subject.findMany.mockResolvedValue(mockSubjects);
    prismaClient.scores.createMany.mockResolvedValue(mockCreateManyResult);

    // Execute the seeder
    const result = await seedScores();

    // Verify the results
    expect(result).toEqual(mockCreateManyResult);
    expect(prismaClient.students.findMany).toHaveBeenCalledTimes(1);
    expect(prismaClient.subject.findMany).toHaveBeenCalledTimes(1);
    expect(prismaClient.scores.createMany).toHaveBeenCalledTimes(1);
    expect(prismaClient.$disconnect).toHaveBeenCalledTimes(1);

    // Verify the structure of the data passed to createMany
    const createManyCall = prismaClient.scores.createMany.mock.calls[0][0];
    expect(createManyCall).toHaveProperty('data');
    expect(createManyCall.data).toHaveLength(4);
    expect(createManyCall.skipDuplicates).toBe(true);

    // Verify the structure of each score object
    createManyCall.data.forEach(score => {
      expect(score).toHaveProperty('student_id');
      expect(score).toHaveProperty('subject_id');
      expect(score).toHaveProperty('score');
      expect(score).toHaveProperty('created_at');
      expect(score).toHaveProperty('updated_at');
      expect(score.score).toBeGreaterThanOrEqual(60);
      expect(score.score).toBeLessThanOrEqual(100);
    });
  });

  it("should throw error when no students found", async () => {
    // Mock empty students array
    prismaClient.students.findMany.mockResolvedValue([]);
    prismaClient.subject.findMany.mockResolvedValue([{ id: 1 }]);

    // Execute and expect error
    await expect(seedScores()).rejects.toThrow(
      "No students or subjects found. Please seed them first."
    );
    expect(prismaClient.$disconnect).toHaveBeenCalledTimes(1);
  });

  it("should throw error when no subjects found", async () => {
    // Mock empty subjects array
    prismaClient.students.findMany.mockResolvedValue([{ id: 1 }]);
    prismaClient.subject.findMany.mockResolvedValue([]);

    // Execute and expect error
    await expect(seedScores()).rejects.toThrow(
      "No students or subjects found. Please seed them first."
    );
    expect(prismaClient.$disconnect).toHaveBeenCalledTimes(1);
  });

  it("should handle database errors properly", async () => {
    const dbError = new Error("Database connection failed");
    prismaClient.students.findMany.mockRejectedValue(dbError);

    // Execute and expect error
    await expect(seedScores()).rejects.toThrow(dbError);
    expect(prismaClient.$disconnect).toHaveBeenCalledTimes(1);
  });
});
