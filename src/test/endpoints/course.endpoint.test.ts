import request from "supertest";
import app from "../../app.js";
import AppDataSource from "../../config/db/DataSource.js";

let server: any;
let courseID : any;

const testCourse = {
      title: "Teste 2",
      category: "Teste3",
      description: "Teste 4",
    };

beforeAll(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  server = app.listen(0);

  const response = await request(server).post("/course").send(testCourse).set("Accept", "application/json");
  courseID = response.body.id
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

describe("GET /Course", () => {
  it("GET /course should return a list of courses", async () => {
    const response = await request(server).get("/course");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });
  it("GET /course/:id should return a course", async () => {
    const response = await request(server).get("/course/5");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Object));
  });
  it("GET /course/:id should return 400 when course does not exist", async () => {
    const response = await request(server).get("/course/9532");
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("This ID doesnt exists!");
  });
});

describe("POST /Course", () => {
  it("POST /course should create a course", async () => {
    const exampleCourse = {
      title: "Teste 1",
      category: "Teste2",
      description: "Teste 3",
    };

    const response = await request(server)
      .post("/course")
      .send(exampleCourse)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.message).toBe(
      "Course created! check on Courses List!",
    );

    const deleteResponse = await request(server).delete(
      `/course/${response.body.id}`,
    );
    expect(deleteResponse.statusCode).toBe(200);
  });
  it("POST /course should return a error when title < 3", async () => {
    const newCourse = {
      title: "ex",
      category: "example",
      description: "example",
    };

    const response = await request(server).post("/course").send(newCourse);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Isnt allowed 3 characters. try again!");
  });
});

describe("PUT /Course", () => {
  it("PUT /Course should edit a course", async () => {
    const editedCourse = { title: "Title edited", category: "Category Edited", description: "Description Edited"}
    const response = await request(server).put(`/course/${courseID}`).send(editedCourse).set("Accept", "application/json")

    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe("Course Edited!")
  })
  it("PUT /Course should return a error when title < 3 characters", async () => {
    const editedCourse = { title: "T", category: "Category Edited", description: "Description Edited"}
    const response = await request(server).put(`/course/${courseID}`).send(editedCourse).set("Accept", "application/json")

    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe("Isnt allowed 3 characters. try again!")
  })
  it("PUT /Course should return a error when ID is incorrect", async () => {
    const editedCourse = { title: "Title Edited", category: "Category Edited", description: "Description Edited"}
    const response = await request(server).put(`/course/-1`).send(editedCourse).set("Accept", "application/json")

    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe("This ID doesnt exists!")
  })
})

describe("DELETE /Course", () => {
  it("DELETE /Course should delete a course", async () => {
    const response = await request(server).delete(`/course/${courseID}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe("Course deleted!")
  })
  it("DELETE /Course should return a error when ID is incorrect", async () => {
    const response = await request(server).delete(`/course/9839`)

    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe("This ID doesnt exists!")
  })
})

