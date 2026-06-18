import request from "supertest";
import app from "../../app.js";
import AppDataSource from "../../config/db/DataSource.js";
import type { Server } from "http";

let server: Server;

let courseID: number;
let studentID: string;
let enrollmentID: number;

let anotherCID: number;

const testCourse = {
  title: "Teste 2",
  category: "Teste3",
  description: "Teste 4",
};
const testStudent = {
  name: "Example Student",
  email: "emailexample@example.com",
};
const anotherCourse = {
  title: "Teste 8",
  category: "Teste 9",
  description: "Teste 10",
};

beforeAll(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  server = app.listen(0);

  const courseResponse = await request(server)
    .post("/course")
    .send(testCourse)
    .set("Accept", "application/json");
  courseID = courseResponse.body.id;
  const studentResponse = await request(server)
    .post("/student")
    .send(testStudent)
    .set("Accept", "application/json");
  studentID = studentResponse.body.id;

  const enrollmentTest = {
    student: studentID,
    course: courseID,
  };

  const enrollmentResponse = await request(server)
    .post("/enrollment")
    .send(enrollmentTest)
    .set("Accept", "application/json");
  enrollmentID = enrollmentResponse.body.id;

  const anotherResponse = await request(server)
    .post("/course")
    .send(anotherCourse)
    .set("Accept", "application/json");
  anotherCID = anotherResponse.body.id;
});

afterAll(async () => {
  await request(server).delete(`/course/${courseID}`);
  await request(server).delete(`/student/${studentID}`);
  await request(server).delete(`/course/${anotherCID}`);
  if (server) {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
  if (AppDataSource.isInitialized) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    await AppDataSource.destroy();
  }
});

describe("GET /Enrollment", () => {
  it("GET /enrollment should return a list of enrollment", async () => {
    const response = await request(server).get("/enrollment");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });
  it("GET /enrollment/:id should return a enrollment", async () => {
    const response = await request(server).get(`/enrollment/${enrollmentID}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Object));
  });
  it("GET /enrollment/:id should return 404 when enrollment does not exist", async () => {
    const response = await request(server).get("/enrollment/9532");
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("This ID doesnt exists!");
  });
});

describe("POST /Enrollment", () => {
  it("POST /enrollment should create a enrollment", async () => {

    const simpleCourse = {
      title: "Teste 3",
      category: "Teste4",
      description: "Teste 5",
    };

    const res = await request(server).post("/course").send(simpleCourse);
    const cID = res.body.id;

    const exampleEnrollment = {
      student: studentID,
      course: cID,
    };

    const response = await request(server)
      .post("/enrollment")
      .send(exampleEnrollment)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.message).toBe("Student enrolled!");

    const deleteResponse = await request(server).delete(
      `/enrollment/${response.body.id}`,
    );
    await request(server).delete(`/course/${cID}`);
    expect(deleteResponse.statusCode).toBe(200);
  });
  it("POST /enrollment should return a error when studentID is missing", async () => {
    const newEnrollment = {
      student: "",
      course: courseID,
    };

    const response = await request(server)
      .post("/enrollment")
      .send(newEnrollment);

    expect(response.statusCode).toBe(400);
    expect(response.body[0]).toBe("Student ID Required");
  });
  it("POST /enrollment should return a error when courseID is missing", async () => {
    const newEnrollment = {
      student: studentID,
      course: "",
    };

    const response = await request(server)
      .post("/enrollment")
      .send(newEnrollment);

    expect(response.statusCode).toBe(400);
    expect(response.body[0]).toBe("Course ID Required");
  });
  it("POST /enrollment should return a error when studentID & courseID is missing", async () => {
    const newEnrollment = {
      student: "",
      course: "",
    };

    const response = await request(server)
      .post("/enrollment")
      .send(newEnrollment);

    expect(response.statusCode).toBe(400);
    expect(response.body[0]).toBe("Student ID Required");
    expect(response.body[1]).toBe("Course ID Required");
  });
  it("POST /enrollment should return a error when student already are attending a course", async () => {
    const newEnrollment = {
      student: studentID,
      course: courseID,
    };

    const response = await request(server)
      .post("/enrollment")
      .send(newEnrollment);

    expect(response.statusCode).toBe(409);
    expect(response.body.error).toBe(
      "This student is already attending this course!",
    );
  });
});

describe("PUT /Enrollment", () => {
  it("PUT /enrollment should edit a enrollment", async () => {
    const editedEnrollment = { course: `${anotherCID}` };
    const response = await request(server)
      .put(`/enrollment/${enrollmentID}`)
      .send(editedEnrollment);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Enrollment edited!");
  });
  it("PUT /enrollment should return a error when student is atteding the same course", async () => {
    const editedEnrollment = {
      course: anotherCID,
    };
    const response = await request(server)
      .put(`/enrollment/${enrollmentID}`)
      .send(editedEnrollment)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(409);
    expect(response.body.error).toBe(
      "This student is already attending this course!",
    );
  });
  it("PUT /enrollment should return a error when ID is incorrect", async () => {
    const editedEnrollment = {
      course: courseID,
    };
    const response = await request(server)
      .put(`/enrollment/-1`)
      .send(editedEnrollment)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("This ID doesnt exists!");
  });
});

describe("DELETE /Enrollment", () => {
  it("DELETE /enrollment should delete a enrollment", async () => {
    const response = await request(server).delete(
      `/enrollment/${enrollmentID}`,
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Enrollment deleted!");
  });
  it("DELETE /enrollment should return a error when ID is incorrect", async () => {
    const response = await request(server).delete(`/enrollment/9839`);

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("This ID doesnt exists!");
  });
});
