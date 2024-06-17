import { PrismaClient } from "@prisma/client";
import request from "supertest";
import app from "../app";

const prisma = new PrismaClient();

describe("GET /api/charts/:chartType", () => {
  beforeAll(async () => {
    await prisma.dataPoint.createMany({
      data: [
        { category: "A", value: 10, timestamp: new Date("2024-01-01") },
        { category: "B", value: 20, timestamp: new Date("2024-01-02") },
      ],
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
  it("should return pie chart data", async () => {
    const res = await request(app)
      .get("/api/charts/pie")
      .query({ startDate: "2024-01-01", endDate: "2024-01-02" });

    expect(res.status).toBe(200);
    expect(res.body.labels).toEqual(expect.arrayContaining(["A", "B"]));
    expect(res.body.datasets[0].data).toEqual(expect.arrayContaining([10, 20]));
  });

  it("should return line chart data", async () => {
    const res = await request(app)
      .get("/api/charts/line")
      .query({ startDate: "2024-01-01", endDate: "2024-01-02" });

    expect(res.status).toBe(200);
    expect(res.body.labels).toEqual(
      expect.arrayContaining(["2024-01-01", "2024-01-02"])
    );
    expect(res.body.datasets[0].data).toEqual(expect.arrayContaining([10, 0]));
  });

  it("should return 400 if dates are not provided", async () => {
    const res = await request(app).get("/api/charts/pie");
    expect(res.status).toBe(400);
  });
});
