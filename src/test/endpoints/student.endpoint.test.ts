import request from "supertest";
import app from "../../app.js";
import AppDataSource from "../../config/db/DataSource.js";
import type { Server } from "http";

let server: Server;
let studentID: string;

const testStudent = {
  name: "Example Student",
  email: "email@example.com",
};

beforeAll(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  server = app.listen(0);

  const response = await request(server)
    .post("/student")
    .send(testStudent)
    .set("Accept", "application/json");
  studentID = response.body.id;
});

afterAll(async () => {
  if (server) {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
  if (AppDataSource.isInitialized) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    await AppDataSource.destroy();
  }
});

describe("GET /Student", () => {
  it("GET /Student should return a list of student", async () => {
    const response = await request(server).get("/student");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });
  it("GET /Student/:id should return a student", async () => {
    const response = await request(server).get(`/student/${studentID}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Object));
  });
  it("GET /Student/:id should return 404 when student does not exist", async () => {
    const response = await request(server).get(
      "/student/39c5c5bb-f478-4c2f-8417-bb826b3b4592",
    );
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("This ID doesnt exists!");
  });
});

describe("POST /Student", () => {
  it("POST /student should create a student", async () => {
    const exampleStudent = {
      name: "Example Student",
      email: "e@example.com",
    };

    const response = await request(server)
      .post("/student")
      .send(exampleStudent)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.message).toBe("Student created!");

    const deleteResponse = await request(server).delete(
      `/student/${response.body.id}`,
    );
    expect(deleteResponse.statusCode).toBe(200);
  });
  it("POST /student should return a error when name is missing", async () => {
    const newStudent = {
      name: "",
      email: "exampleemail@example.com",
    };

    const response = await request(server).post("/student").send(newStudent);

    expect(response.statusCode).toBe(400);
    expect(response.body[0]).toBe("Name is required");
  });
  it("POST /student should return a error when email is missing", async () => {
    const newStudent = {
      name: "Example Name",
      email: "",
    };

    const response = await request(server).post("/student").send(newStudent);

    expect(response.statusCode).toBe(400);
    expect(response.body[0]).toBe("Email is required");
  });
  it("POST /student should return a error when email format is incorrect", async () => {
    const newStudent = {
      name: "Example Name",
      email: "example@",
    };

    const response = await request(server).post("/student").send(newStudent);

    expect(response.statusCode).toBe(400);
    expect(response.body[0]).toBe("Invalid email format");
  });
  it("POST /student should return a error when email format is incorrect & name is missing", async () => {
    const newStudent = {
      name: "",
      email: "example@",
    };

    const response = await request(server).post("/student").send(newStudent);

    expect(response.statusCode).toBe(400);
    expect(response.body[0]).toBe("Name is required");
    expect(response.body[1]).toBe("Invalid email format");
  });
  it("POST /student should return a error when email is missing & name is missing", async () => {
    const newStudent = {
      name: "",
      email: "",
    };

    const response = await request(server).post("/student").send(newStudent);

    expect(response.statusCode).toBe(400);
    expect(response.body[0]).toBe("Name is required");
    expect(response.body[1]).toBe("Email is required");
  });
  it("POST /student should return a error when email is duplicated", async () => {
    const newStudent = {
      name: "example Student",
      email: "email@example.com",
    };

    const response = await request(server).post("/student").send(newStudent);

    expect(response.statusCode).toBe(409);
    expect(response.body.error).toBe("Already have this Email");
  });
});

describe("PUT /Student", () => {
  it("PUT /Student should edit a student", async () => {
    const editedStudent = {
      name: "Name Edited",
      email: "EmailEdited@example.com",
    };
    const response = await request(server)
      .put(`/student/${studentID}`)
      .send(editedStudent)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Student edited!");
  });
  it("PUT /Student should return a error when email is duplicated", async () => {
    const editedStudent = { email: "EmailEdited@example.com" };
    const response = await request(server)
      .put(`/student/${studentID}`)
      .send(editedStudent)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(409);
    expect(response.body.error).toBe("Already have this Email");
  });
  it("PUT /Student should return a error when email format is invalid", async () => {
    const editedStudent = { email: "EmailEdited" };
    const response = await request(server)
      .put(`/student/${studentID}`)
      .send(editedStudent)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(400);
    expect(response.body[0]).toBe("Invalid email format");
  });
  it("PUT /Student should return a error when ID is incorrect", async () => {
    const editedStudent = {
      title: "Title Edited",
      category: "Category Edited",
      description: "Description Edited",
    };
    const response = await request(server)
      .put(`/student/39c5c5bb-f478-4c2f-8417-bb826b3b4592`)
      .send(editedStudent)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("This ID doesnt exists!");
  });
});

describe("DELETE /Student", () => {
  it("DELETE /Student should delete a course", async () => {
    const response = await request(server).delete(`/student/${studentID}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Student deleted!");
  });
  it("DELETE /Student should return a error when ID is incorrect", async () => {
    const response = await request(server).delete(
      `/student/39c5c5bb-f478-4c2f-8417-bb826b3b4592`,
    );

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("This ID doesnt exists!");
  });
});
