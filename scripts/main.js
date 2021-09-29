import { dataCourses } from './dataCourses.js';
import { dataStudents } from './dataStudents.js';
var coursesTbody = document.getElementById('courses');
var studentsTbody = document.getElementById('students');
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByCredits = document.getElementById("button-filterByCredits");
var inputSearchBox = document.getElementById("search-box");
var inputSearchBox2 = document.getElementById("search-box2");
var inputSearchBox3 = document.getElementById("search-box3");
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByCredits(); };
renderCoursesInTable(dataCourses);
renderStudentsInTable(dataStudents);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentsInTable(students) {
    console.log('Desplegando datos estudiante');
    students.forEach(function (student) {
        var trElement1 = document.createElement("tr");
        var trElement2 = document.createElement("tr");
        var trElement3 = document.createElement("tr");
        var trElement4 = document.createElement("tr");
        var trElement5 = document.createElement("tr");
        trElement1.innerHTML = "<td>C\u00F3digo</td>\n                           <td>" + student.code + "</td>";
        trElement2.innerHTML = "<td>C\u00E9dula</td>\n                           <td>" + student.id + "</td>";
        trElement3.innerHTML = "<td>Edad</td>\n                           <td>" + student.age + "</td>";
        trElement4.innerHTML = "<td>Direcci\u00F3n</td>\n                           <td>" + student.address + "</td>";
        trElement5.innerHTML = "<td>Tel\u00E9fono</td>\n                           <td>" + student.phone + "</td>";
        studentsTbody.appendChild(trElement1);
        studentsTbody.appendChild(trElement2);
        studentsTbody.appendChild(trElement3);
        studentsTbody.appendChild(trElement4);
        studentsTbody.appendChild(trElement5);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByCredits() {
    var text1 = inputSearchBox2.value;
    text1 = (text1 == null) ? '' : text1;
    var text2 = inputSearchBox3.value;
    text2 = (text2 == null) ? '' : text2;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredits(text1, text2, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByCredits(nameKey1, nameKey2, courses) {
    if (nameKey1 === '' || nameKey2 === '') {
        return courses;
    }
    var curso = [];
    courses.forEach(function (course) {
        if (course.credits >= +nameKey1 && +course.credits <= +nameKey2) {
            curso.push(course);
        }
    });
    return curso;
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
