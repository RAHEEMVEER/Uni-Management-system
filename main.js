#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const students = [];
const teachers = [];
const courses = [];
const departments = [];
class Person {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getName() {
        return this.name;
    }
}
class Student extends Person {
    rollNumber = 0;
    courses = [];
    constructor(name, age) {
        super(name, age);
    }
    registerForCourse(course) {
        this.courses.push(course);
        course.addStudent(this);
    }
}
class Teacher extends Person {
    salary = 200000;
    courses = [];
    constructor(name, age) {
        super(name, age);
    }
    assignCourse(course) {
        this.courses.push(course);
        course.setInstructor(this);
    }
    setSalary(salary) {
        this.salary = salary;
    }
}
class Course {
    id;
    name;
    students = [];
    instructors = [];
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    addStudent(student) {
        this.students.push(student);
        student.rollNumber = this.students.length;
    }
    setInstructor(instructor) {
        this.instructors.push(instructor);
    }
}
class Department {
    name;
    courses = [];
    constructor(name) {
        this.name = name;
    }
    addCourse(course) {
        this.courses.push(course);
    }
}
let universityName = "KARACHI UNIVERSITY";
console.log(chalk.yellow.bold.italic(`\n\t===========================================================`));
console.log(chalk.green.bold.italic(`\t     WELLCOME TO ${universityName} MANAGEMENET SYSTEM:`));
console.log(chalk.yellow.bold.italic(`\t===========================================================\n`));
async function Main() {
    async function addDepartment() {
        let depart = await inquirer.prompt([
            {
                name: "department",
                type: "input",
                message: chalk.greenBright.bold.italic("ENTER DEPARTMENT NAME: "),
            },
        ]);
        let upperCaseDepart = depart.department.toUpperCase();
        let departData = new Department(upperCaseDepart);
        departments.push(departData);
        console.log(chalk.yellow.bold.italic(`\n\t  DEPARTMENT `) +
            chalk.green.bold.italic(`"${upperCaseDepart}"`) +
            chalk.yellow.bold.italic(` CREATED SUCCESFULLY.\n`));
    }
    async function addCourse() {
        if (departments.length === 0) {
            console.log(chalk.red.bold.italic(`\n\t FIRST ADD DEPARTMENT TO ADD IN THE COURSE.\n`));
        }
        else {
            let selectDept = await inquirer.prompt([
                {
                    name: "department",
                    type: "list",
                    choices: departments.map((transform) => chalk.green.bold.italic(transform.name.toUpperCase())),
                    message: chalk.yellow.bold.italic("SELECT DEPARTMENT TO ADD COURSE."),
                },
            ]);
            let course = await inquirer.prompt([
                {
                    name: "id",
                    type: "input",
                    message: chalk.gray.bold.italic("ENTER THE COURSE ID: "),
                },
                {
                    name: "course",
                    type: "input",
                    message: chalk.grey.bold.italic("ENTER COURSE NAME YOU WANT TO ADD: "),
                },
            ]);
            let courseUpperCase = course.course.toUpperCase();
            let courseData = new Course(course.id.toString(), courseUpperCase);
            courses.push(courseData);
            let selectedDepartment = departments.find((dept) => chalk.green.bold.italic(dept.name) === selectDept.department);
            if (selectedDepartment) {
                selectedDepartment.addCourse(courseData);
                console.log(chalk.cyan.bold.italic(`\n\t\tADDED COURSE: `) +
                    chalk.green.bold.italic(`"${courseData.name}"`) +
                    chalk.cyan.bold.italic(`\n\t\tCOURSE ID: `) +
                    chalk.green.bold.italic(`"${courseData.id.toUpperCase()}"`) +
                    chalk.cyan.bold.italic(`\n\t\tDEPARTMENT NAME: `) +
                    chalk.green.bold.italic(`"${selectedDepartment.name}"\n`));
            }
            else {
                console.log(chalk.redBright.bold.italic(`\n\t  DEPARTMENT ` +
                    chalk.yellow.bold.italic(`"${selectDept.department}"`) +
                    ` NOT FOUND.\n`));
            }
        }
    }
    async function addStudent() {
        let student = await inquirer.prompt([
            {
                name: "name",
                type: "input",
                message: chalk.yellow.bold.italic("ENTER STUDENT NAME: "),
            },
            {
                name: "age",
                type: "number",
                message: chalk.yellow.bold.italic("ENTER STUDENT AGE: "),
            },
        ]);
        let upperCaseStudent = student.name.toUpperCase();
        let studentData = new Student(upperCaseStudent, student.age);
        students.push(studentData);
        console.log(chalk.blue.bold.italic("\n\t\tADDED STUDENT: ") +
            chalk.green.bold.italic(`"${upperCaseStudent}"`) +
            chalk.blue.bold.italic(`\n\t\tSTUDENT AGE: `) +
            chalk.green.bold.italic(`"${studentData.age}"\n`));
    }
    async function addTeacher() {
        let teacher = await inquirer.prompt([
            {
                name: "name",
                type: "input",
                message: chalk.yellow.bold.italic("ENTER TEACHER NAME: "),
            },
            {
                name: "age",
                type: "number",
                message: chalk.yellow.bold.italic("ENTER TEACHER AGE: "),
            },
        ]);
        let upperCaseTeacher = teacher.name.toUpperCase();
        let teacherData = new Teacher(upperCaseTeacher, teacher.age);
        teachers.push(teacherData);
        console.log(chalk.blue.bold.italic("\n\t\tADDED TEACHER: ") +
            chalk.green.bold.italic(`"${upperCaseTeacher}"`) +
            chalk.blue.bold.italic(`\n\t\tTEACHER AGE: `) +
            chalk.green.bold.italic(`"${teacherData.age}"\n`));
    }
    async function removeStudent() {
        if (students.length === 0) {
            console.log(chalk.redBright.bold.italic(`\n\t  STUDENTS IS ALREADY EMPTY IN UNIVERITY DATA BASE.\n`));
        }
        else {
            let remStudent = await inquirer.prompt([
                {
                    name: "removeStudent",
                    type: "list",
                    choices: students.map((remStudent) => chalk.redBright.bold.italic(remStudent.getName())),
                    message: chalk.magentaBright.bold.italic("SELECT STUDENT YOU WANT TO REMOVE FROM UNIVERSITY."),
                },
            ]);
            let studentIndex = students.findIndex((student) => chalk.redBright.bold.italic(student.getName()) ===
                remStudent.removeStudent);
            if (studentIndex !== -1) {
                let removeFromData = students.splice(studentIndex, 1)[0];
                console.log(chalk.redBright.bold.italic(`\n\t STUDENT `) +
                    chalk.yellow.bold.italic(`"${removeFromData.getName()}"`) +
                    chalk.redBright.bold.italic(` SUCCESSFULLY REMOVE FROM UNIVERSITY.\n`));
            }
        }
    }
    async function removeTeacher() {
        if (teachers.length === 0) {
            console.log(chalk.redBright.bold.italic(`\n\t  TEACHERS IS ALREADY EMPTY IN UNIVERITY DATA BASE.\n`));
        }
        else {
            let remTeacher = await inquirer.prompt([
                {
                    name: "removeTeacher",
                    type: "list",
                    choices: teachers.map((remTeacher) => chalk.redBright.bold.italic(remTeacher.getName())),
                    message: chalk.magentaBright.bold.italic("SELECT TEACHER YOU WANT TO REMOVE FROM UNIVERSITY."),
                },
            ]);
            let teacherIndex = teachers.findIndex((teacherIndex) => chalk.redBright.bold.italic(teacherIndex.getName()) ===
                remTeacher.removeTeacher);
            if (teacherIndex !== -1) {
                let removeFromData = teachers.splice(teacherIndex, 1)[0];
                console.log(chalk.redBright.bold.italic(`\n\t TEACHER `) +
                    chalk.yellow.bold.italic(`"${removeFromData.getName()}"`) +
                    chalk.redBright.bold.italic(` SUCCESSFULLY REMOVE FROM UNIVERSITY.\n`));
            }
        }
    }
    async function enrollStudentCourse() {
        if (students.length === 0) {
            console.log(chalk.redBright.bold.italic("\n\t  STUDENT NOT FOUND TO ENROLL FOR COURSE.\n"));
        }
        else if (courses.length === 0) {
            console.log(chalk.redBright.bold.italic("\n\t  COURSE NOT FOUND TO ENROLL STUDENT.\n"));
        }
        else {
            let studentNames = students.map((student) => chalk.green.bold.italic(student.getName()));
            let courseNames = courses.map((course) => chalk.yellow.bold.italic(course.name));
            let studentChoice = await inquirer.prompt([
                {
                    name: "enrollStudent",
                    type: "list",
                    choices: studentNames,
                    message: chalk.yellow.bold.italic("SELECT STUDENT TO ENROLL FOR COURSE."),
                },
            ]);
            let selectedStudent = students.find((student) => chalk.green.bold.italic(student.getName()) ===
                studentChoice.enrollStudent);
            let courseChoice = await inquirer.prompt([
                {
                    name: "enrollCourse",
                    type: "list",
                    choices: courseNames,
                    message: chalk.green.bold.italic("SELECT COURSE TO ENROLL STUDENT FOR."),
                },
            ]);
            let selectedCourse = courses.find((course) => chalk.yellow.bold.italic(course.name) === courseChoice.enrollCourse);
            if (selectedStudent && selectedCourse) {
                selectedStudent.registerForCourse(selectedCourse);
                console.log(chalk.magentaBright.bold.italic(`\n\t STUDENT `) +
                    chalk.green.bold.italic(`"${selectedStudent.name}"`) +
                    chalk.magentaBright.bold.italic(` SUCCESSFULLY ENROLLED FOR `) +
                    chalk.yellow.bold.italic(`"${selectedCourse.name}"`) +
                    chalk.magentaBright.bold.italic(` COURSE.\n`));
            }
        }
    }
    async function assingCourseTeacher() {
        if (teachers.length === 0) {
            console.log(chalk.redBright.bold.italic("\n\t  TEACHER NOT FOUND TO ASSIGN.\n"));
        }
        else if (courses.length === 0) {
            console.log(chalk.redBright.bold.italic("\n\t  COURSE NOT FOUND TO ASSIGN.\n"));
        }
        else {
            let teacherNames = teachers.map((teacher) => chalk.magentaBright.bold.italic(teacher.getName()));
            let courseNames = courses.map((course) => chalk.cyanBright.bold.italic(course.name));
            let teacherChoice = await inquirer.prompt([
                {
                    name: "assignTeacher",
                    type: "list",
                    choices: teacherNames,
                    message: chalk.cyan.bold.italic("SELECT TEACHER TO ASSIGN COURSE TO."),
                },
            ]);
            let selectedTeacher = teachers.find((teacher) => chalk.magentaBright.bold.italic(teacher.getName()) ===
                teacherChoice.assignTeacher);
            let courseChoice = await inquirer.prompt([
                {
                    name: "assignCourse",
                    type: "list",
                    choices: courseNames,
                    message: chalk.green.bold.italic("SELECT COURSE TO ASSIGN TEACHER."),
                },
            ]);
            let selectedCourse = courses.find((coursee) => chalk.cyanBright.bold.italic(coursee.name) ===
                courseChoice.assignCourse);
            if (selectedTeacher && selectedCourse) {
                selectedTeacher.assignCourse(selectedCourse);
                console.log(chalk.yellow.bold.italic(`\n\tASSIGNED `) +
                    chalk.cyanBright.bold.italic(`"${selectedCourse.name}"`) +
                    chalk.yellow.bold.italic(` COURSE TO TEACHER `) +
                    chalk.magentaBright.bold.italic(`"${selectedTeacher.name}"\n`));
            }
        }
    }
    async function viewCourseStudentTeacher() {
        let choiceOptions = [
            chalk.green.bold.italic("VIEW COURSES:"),
            chalk.green.bold.italic("VIEW STUDENTS:"),
            chalk.green.bold.italic("VIEW TEACHERS:"),
        ];
        for (let i = 0; i < choiceOptions.length; i++) {
            let options = await inquirer.prompt([
                {
                    name: "option",
                    type: "list",
                    choices: choiceOptions,
                    message: "SELECT AN OPTION TO VIEW.",
                },
            ]);
            switch (options.option) {
                case chalk.green.bold.italic("VIEW COURSES:"):
                    if (courses.length === 0) {
                        console.log(chalk.redBright.bold.italic(`\n\t  COURSES NOT FOUND IN DATA BASE.\n`));
                    }
                    else {
                        console.log(chalk.cyan.bold.italic(`\n\t COURSES QUANTITY IS: `) +
                            chalk.yellow.bold.italic(`${courses.length}`));
                        for (let course of courses) {
                            console.log(chalk.magentaBright.bold.italic(`\n\t\tCOURSE ID: `) +
                                chalk.green.bold.italic(`"${course.id.toUpperCase()}"`) +
                                chalk.magentaBright.bold.italic(`\n\t\tCOURSE NAME: `) +
                                chalk.green.bold.italic(`"${course.name}"\n`));
                        }
                    }
                    break;
                case chalk.green.bold.italic("VIEW STUDENTS:"):
                    if (students.length === 0) {
                        console.log(chalk.redBright.bold.italic("\n\t  STUDENTS NOT FOUND IN OUR DATA BASE.\n"));
                    }
                    else {
                        console.log(chalk.cyan.bold.italic(`\n\t STUDENTS QUANTITY IS: `) +
                            chalk.yellow.bold.italic(`${students.length}`));
                        for (let student of students) {
                            console.log(chalk.magentaBright.bold.italic(`\n\t\tSTUDENT NAME: `) +
                                chalk.green.bold.italic(`"${student.getName()}"`) +
                                chalk.magentaBright.bold.italic(`\n\t\tSTUDENT AGE: `) +
                                chalk.green.bold.italic(`${student.age}\n`));
                        }
                    }
                    break;
                case chalk.green.bold.italic("VIEW TEACHERS:"):
                    if (teachers.length === 0) {
                        console.log(chalk.redBright.bold.italic("\n\t  TEACHERS NOT FOUND IN OUR DATA BASE.\n"));
                    }
                    else {
                        console.log(chalk.cyan.bold.italic(`\n\t TEACHERS QUANTITY IS: `) +
                            chalk.yellow.bold.italic(`${teachers.length}`));
                        for (let teacher of teachers) {
                            console.log(chalk.magentaBright.bold.italic(`\n\t\tTEACHER NAME: `) +
                                chalk.green.bold.italic(`"${teacher.getName()}"`) +
                                chalk.magentaBright.bold.italic(`\n\t\tTEACHER AGE: `) +
                                chalk.green.bold.italic(`${teacher.age}\n`));
                        }
                    }
                    break;
            }
        }
    }
    function printStudentCoursesAndInstructors(student) {
        console.log(chalk.yellowBright(`\nSTUDENTS:`));
        console.log(chalk.bold.greenBright(`\n\t\tSTUDENT NAME: "${student.name}"\n\t\tSTUDENT AGE: "${student.age}"\n`));
        if (student.courses.length === 0) {
            console.log(chalk.redBright("\t\tSTUDENT NOT REGISTER FOR COURSE:\n"));
        }
        else {
            console.log(chalk.yellowBright(`\nCOURSES:`));
            student.courses.forEach((course) => {
                console.log(chalk.greenBright(`\n\t\tCOURSE NAME: "${course.name}"\n\t\tCOURSE ID: "${course.id}"\n`));
                if (course.instructors.length === 0) {
                    console.log(chalk.redBright("\n\tTEACHER NOT ASSIGN FOR COURSE:\n"));
                }
                else {
                    console.log(chalk.yellowBright("\nTEACHERS:"));
                    course.instructors.forEach((instructor) => {
                        console.log(chalk.greenBright(`\n\t\tTEACHER NAME: "${instructor.name}"\n\t\tTHEIR AGE: "${instructor.age}"`));
                    });
                }
            });
        }
    }
    async function viewStudentsCoursesAndInstructors() {
        console.log(chalk.yellowBright("\n\t\tSTUDENTS THEIR COURSES AND THEIR TEACHERS:\n"));
        if (students.length === 0) {
            console.log(chalk.red("\t\tNO STUDENTS FOUND IN DATA BASE:"));
            return;
        }
        students.forEach(printStudentCoursesAndInstructors);
    }
    let iscontinue = true;
    while (iscontinue) {
        let action = await inquirer.prompt([
            {
                name: "action",
                type: "list",
                choices: [
                    chalk.green.bold.italic("ADD DEPARTMENT:"),
                    chalk.green.bold.italic("ADD COURSE:"),
                    chalk.green.bold.italic("ADD STUDENT:"),
                    chalk.green.bold.italic("ADD TEACHER:"),
                    chalk.redBright.bold.italic("REMOVE STUDENT:"),
                    chalk.redBright.bold.italic("REMOVE TEACHER:"),
                    chalk.yellow.bold.italic("ENROLL STUDENT FOR COURSE:"),
                    chalk.yellow.bold.italic("ASSIGN TEACHER TO COURSE:"),
                    chalk.cyan.bold.italic("VIEW ALL COURSES, STUDENTS AND TEACHERS:"),
                    chalk.cyan.bold.italic("STUDENT THEIR COURSES AND THEIR TEACHERS:"),
                    chalk.red.bold.italic("EXIT FROM MANAGEMENT:"),
                ],
                message: chalk.magenta.bold.italic("WHAT DO YOU WANT TO DO?"),
            },
        ]);
        switch (action.action) {
            case chalk.green.bold.italic("ADD DEPARTMENT:"):
                await addDepartment();
                break;
            case chalk.green.bold.italic("ADD COURSE:"):
                await addCourse();
                break;
            case chalk.green.bold.italic("ADD STUDENT:"):
                await addStudent();
                break;
            case chalk.green.bold.italic("ADD TEACHER:"):
                await addTeacher();
                break;
            case chalk.redBright.bold.italic("REMOVE STUDENT:"):
                await removeStudent();
                break;
            case chalk.redBright.bold.italic("REMOVE TEACHER:"):
                await removeTeacher();
                break;
            case chalk.yellow.bold.italic("ENROLL STUDENT FOR COURSE:"):
                await enrollStudentCourse();
                break;
            case chalk.yellow.bold.italic("ASSIGN TEACHER TO COURSE:"):
                await assingCourseTeacher();
                break;
            case chalk.cyan.bold.italic("VIEW ALL COURSES, STUDENTS AND TEACHERS:"):
                await viewCourseStudentTeacher();
                break;
            case chalk.cyan.bold.italic("STUDENT THEIR COURSES AND THEIR TEACHERS:"):
                await viewStudentsCoursesAndInstructors();
                break;
            case chalk.red.bold.italic("EXIT FROM MANAGEMENT:"):
                break;
            default:
                console.log("INVALID CHOICE");
        }
        if (action.action === chalk.red.bold.italic("EXIT FROM MANAGEMENT:")) {
            const delayTime = 3000;
            console.log(chalk.magentaBright.bold.italic(`\n\t\tEXITING.....\n`));
            setTimeout(() => {
                console.log(chalk.yellow.bold.italic("\t  THANKS FOR VISIT KARACHI UNIVERSITY MANAGEMENT."));
                const authorName = "RAHEEM VEER";
                console.log(chalk.cyan.bold.italic(`\t  THIS MANAGEMENT CREATED BY `) +
                    chalk.green.bold.italic(`"${authorName}"\n`));
            }, delayTime);
            iscontinue = false;
        }
    }
}
Main();
