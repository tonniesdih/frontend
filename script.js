const API_URL = "http://localhost:8080";


// ================================
// VIEW ALL STUDENTS
// ================================

function getStudents() {

    fetch(API_URL + "/getstudents")

        .then(response => {

            if (!response.ok) {
                throw new Error("Could not get students");
            }

            return response.json();

        })

        .then(students => {

            const table =
                document.getElementById("studentTable");

            table.innerHTML = "";

            students.forEach(student => {

                const row = `
                    <tr>

                        <td>${student.id ?? ""}</td>

                        <td>${student.name}</td>

                        <td>${student.age}</td>

                        <td>${student.studentClass}</td>

                        <td>${student.admissionNumber}</td>

                        <td>${student.stream}</td>

                        <td>

                            <button
                                class="view-btn"
                                onclick="viewStudent('${student.admissionNumber}')">
                                View
                            </button>

                            <button
                                class="edit-btn"
                                onclick="editStudent('${student.admissionNumber}')">
                                Update
                            </button>

                            <button
                                class="delete-btn"
                                onclick="deleteStudent('${student.admissionNumber}')">
                                Delete
                            </button>

                        </td>

                    </tr>
                `;

                table.innerHTML += row;

            });

        })

        .catch(error => {

            console.error(error);

            showMessage(
                "Error loading students",
                "red"
            );

        });
}


// ================================
// ADD / UPDATE STUDENT
// ================================

document
    .getElementById("studentForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const id =
            document.getElementById("studentId").value;

        const student = {

            name:
                document.getElementById("name").value,

            age:
                parseInt(
                    document.getElementById("age").value
                ),

            studentClass:
                document.getElementById("studentClass").value,

            admissionNumber:
                document.getElementById("admissionNumber").value,

            stream:
                document.getElementById("stream").value

        };


        if (id) {

            updateStudent(id, student);

        } else {

            createStudent(student);

        }

    });


// ================================
// CREATE
// ================================

function createStudent(student) {

    fetch(API_URL + "/createstudent", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(student)

    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Could not create student");
        }

        return response.text();

    })

    .then(() => {

        showMessage(
            "Student added successfully!",
            "green"
        );

        clearForm();

        getStudents();

    })

    .catch(error => {

        console.error(error);

        showMessage(
            "Error adding student",
            "red"
        );

    });
}


// ================================
// VIEW ONE STUDENT
// ================================

function viewStudent(admissionNumber) {

    fetch(
        API_URL +
        "/getstudent/" +
        admissionNumber
    )

    .then(response => {

        if (!response.ok) {
            throw new Error("Student not found");
        }

        return response.json();

    })

    .then(student => {

        alert(
            "Student Details\n\n" +

            "Name: " + student.name + "\n" +

            "Age: " + student.age + "\n" +

            "Class: " + student.studentClass + "\n" +

            "Admission Number: " +
            student.admissionNumber + "\n" +

            "Stream: " + student.stream
        );

    })

    .catch(error => {

        console.error(error);

        showMessage(
            "Error finding student",
            "red"
        );

    });
}


// ================================
// UPDATE
// ================================

function editStudent(admissionNumber) {
 fetch(
        API_URL +
        "/getstudent/" +
        admissionNumber
    )
  .then(response => response.json())
.then(student => {
 document.getElementById("studentId").value =
            student.id ?? student.admissionNumber;
console.log("Update Testing")
})


alert('Testing')
}

function editStudent1(admissionNumber) {

    fetch(
        API_URL +
        "/getstudent/" +
        admissionNumber
    )

    .then(response => response.json())


    .then(student => {

        document.getElementById("studentId").value =
            student.id ?? student.admissionNumber;

        document.getElementById("name").value =
            student.name;

        document.getElementById("age").value =
            student.age;

        document.getElementById("studentClass").value =
            student.studentClass;

        document.getElementById("admissionNumber").value =
            student.admissionNumber;

        document.getElementById("stream").value =
            student.stream;


        document.getElementById("formTitle").innerText =
            "Update Student";

        document.getElementById("saveButton").innerText =
            "Update Student";

    })

    .catch(error => {

        console.error(error);

        showMessage(
            "Error loading student",
            "red"
        );

    });
}


// ================================
// UPDATE STUDENT
// ================================

function updateStudent(id, student) {

    fetch(
        API_URL +
        "/updatestudent/" +
        id,
        {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(student)

        }
    )

    .then(response => {

        if (!response.ok) {
            throw new Error("Could not update student");
        }

        return response.text();

    })

    .then(() => {

        showMessage(
            "Student updated successfully!",
            "green"
        );

        clearForm();

        getStudents();

    })

    .catch(error => {

        console.error(error);

        showMessage(
            "Error updating student",
            "red"
        );

    });
}


// ================================
// DELETE
// ================================

function deleteStudent(admissionNumber) {

    const answer =
        confirm(
            "Are you sure you want to delete " +
            admissionNumber +
            "?"
        );

    if (!answer) {
        return;
    }


    fetch(
        API_URL +
        "/deletestudent/" +
        admissionNumber,
        {
            method: "DELETE"
        }
    )

    .then(response => {

        if (!response.ok) {
            throw new Error("Could not delete student");
        }

        return response.text();

    })

    .then(() => {

        showMessage(
            "Student deleted successfully!",
            "green"
        );

        getStudents();

    })

    .catch(error => {

        console.error(error);

        showMessage(
            "Error deleting student",
            "red"
        );

    });
}


// ================================
// CLEAR FORM
// ================================

function clearForm() {

    document
        .getElementById("studentForm")
        .reset();

    document
        .getElementById("studentId")
        .value = "";

    document
        .getElementById("formTitle")
        .innerText = "Add Student";

    document
        .getElementById("saveButton")
        .innerText = "Add Student";
}


// ================================
// CANCEL
// ================================

function cancelEdit() {

    clearForm();

}


// ================================
// MESSAGE
// ================================

function showMessage(message, color) {

    const box =
        document.getElementById("message");

    box.innerText = message;

    box.style.color = color;
}