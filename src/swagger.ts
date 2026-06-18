import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Express Api Restful",
      version: "1.0.0",
      description:
        "Documentation of a Restful API made in Express that contains Student, Course and Enrollment routes",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    paths: {
      "/course": {
        post: {
          tags: ["Course"],
          summary: "Create a Course",
          requestBody: {
            content: {
              "application/json": {
                example: {
                  title: "Example",
                  category: "Logic",
                  description: "Example Course",
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Course Created",
            },
            "400": {
              description: "Title < 3 Characters",
            },
            "500": {
              description: "API error",
            },
          },
        },
        get: {
          tags: ["Course"],
          summary: "Course List",
          responses: {
            "200": {
              description: "OK",
            },
            "500": {
              description: "API error",
            },
          },
        },
      },
      "/course/{courseID}": {
        get: {
          tags: ["Course"],
          summary: "Find course by ID",
          parameters: [
            {
              name: "courseID",
              in: "path",
              required: true,
              description: "Course ID",
            },
          ],
          responses: {
            "200": {
              description: "Course was found",
            },
            "404": {
              description: "Course not found",
            },
            "500": {
              description: "API error",
            },
          },
        },
        put: {
          tags: ["Course"],
          summary: "Edit an existing course",
          parameters: [
            {
              name: "courseID",
              in: "path",
              required: true,
              description: "Course ID",
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                example: {
                  title: "Example 2",
                  category: "Logic II",
                  description: "Course Edited",
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Course edited",
            },
            "400": {
              description: "Course Title < 3 Characters",
            },
            "4o4": {
              description: "Course not found",
            },
            "500": {
              description: "API error",
            },
          },
        },
        delete: {
          tags: ["Course"],
          summary: "Delete an existing course",
          parameters: [
            {
              name: "courseID",
              in: "path",
              required: true,
              description: "Course ID",
            },
          ],
          responses: {
            "200": {
              description: "Course deleted",
            },
            "404": {
              description: "Couse not found",
            },
            "500": {
              description: "API error",
            },
          },
        },
      },
      "/student": {
        post: {
          tags: ["Student"],
          summary: "Create a Student",
          requestBody: {
            content: {
              "application/json": {
                example: {
                  name: "Student Example",
                  email: "StudentExample@example.com",
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Student created",
            },
            "400": {
              description:
                "Name Required | Email format invalid | Email Required",
            },
            "409": {
              description: "Already exists this Email",
            },
            "500": {
              description: "API error",
            },
          },
        },
        get: {
          tags: ["Student"],
          summary: "Student List",
          responses: {
            "200": {
              description: "Students List",
            },
            "500": {
              description: "API error",
            },
          },
        },
      },
      "/student/{studentID}": {
        get: {
          tags: ["Student"],
          summary: "Find student by ID",
          parameters: [
            {
              name: "studentID",
              in: "path",
              required: true,
              description: "Student ID",
            },
          ],
          responses: {
            "200": {
              description: "Student was found",
            },
            "404": {
              description: "Student not found",
            },
            "500": {
              description: "API error",
            },
          },
        },
        put: {
          tags: ["Student"],
          summary: "Edit an existing student",
          parameters: [
            {
              name: "studentID",
              in: "path",
              required: true,
              description: "Student ID",
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                example: {
                  name: "Student Edited",
                  email: "StudentEdited@edited.com",
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Student edited",
            },
            "400": {
              description: "Email invalid format",
            },
            "404": {
              description: "Student not found",
            },
            "409": {
              description: "Email duplicated",
            },
            "500": {
              description: "API error",
            },
          },
        },
        delete: {
          tags: ["Student"],
          summary: "Delete an existing Student",
          parameters: [
            {
              name: "studentID",
              in: "path",
              required: true,
              description: "Student ID",
            },
          ],
          responses: {
            "200": {
              description: "Student deleted",
            },
            "404": {
              description: "Student not found",
            },
            "500": {
              description: "API error",
            },
          },
        },
      },
      "/enrollment": {
        post: {
          tags: ["Enrollment"],
          summary: "Create an Enrollment",
          requestBody: {
            content: {
              "application/json": {
                example: {
                  student: "Put a StudentID here",
                  course: "Put a CourseID here",
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Enrollment created",
            },
            "400": {
              description: "StudentID Missing | CourseID Missing",
            },
            "409": {
              description: "Student already attending this course",
            },
            "500": {
              description: "API error",
            },
          },
        },
        get: {
          tags: ["Enrollment"],
          summary: "Enrollment List",
          responses: {
            "200": {
              description: "Enrollment List",
            },
            "500": {
              description: "API error",
            },
          },
        },
      },
      "/enrollment/{enrollmentID}": {
        get: {
          tags: ["Enrollment"],
          summary: "Find enrollment by ID",
          parameters: [
            {
              name: "enrollmentID",
              in: "path",
              required: true,
              description: "Enrollment ID",
            },
          ],
          responses: {
            "200": {
              description: "Enrollment was found",
            },
            "404": {
              description: "Enrollment not found",
            },
            "500": {
              description: "API error",
            },
          },
        },
        put: {
          tags: ["Enrollment"],
          summary: "Edit an existing enrollment",
          parameters: [
            {
              name: "enrollmentID",
              in: "path",
              required: true,
              description: "Enrollment",
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                example: {
                  student: "Put another student ID here",
                  course: "Put another course ID here",
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Enrollment edited",
            },
            "404": {
              description: "Enrollment not found",
            },
            "409": {
              description: "Attending same course",
            },
            "500": {
              description: "API error",
            },
          },
        },
        delete: {
          tags: ["Enrollment"],
          summary: "Delete an existing Enrollment",
          parameters: [
            {
              name: "enrollmentID",
              in: "path",
              required: true,
              description: "Enrollment ID",
            },
          ],
          responses: {
            "200": {
              description: "Enrollment deleted",
            },
            "404": {
              description: "Enrollment not found",
            },
            "500": {
              description: "API error",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
