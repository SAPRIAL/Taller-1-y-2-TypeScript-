import { Course } from './course.js';
import { dataCourses } from './dataCourses.js';
import { dataStudents } from './dataStudents.js';
import { Student } from './student.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentsTbody: HTMLElement = document.getElementById('students')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const inputSearchBox2: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box2")!;
const inputSearchBox3: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box3")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


btnfilterByName.onclick = () => applyFilterByName();

btnfilterByCredits.onclick = () => applyFilterByCredits();

renderCoursesInTable(dataCourses);

renderStudentsInTable(dataStudents);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 
function renderStudentsInTable(students: Student[]): void {
  console.log('Desplegando datos estudiante');
  students.forEach((student) => {
    let trElement1 = document.createElement("tr");
    let trElement2 = document.createElement("tr");
    let trElement3 = document.createElement("tr");
    let trElement4 = document.createElement("tr");
    let trElement5 = document.createElement("tr");
    trElement1.innerHTML = `<td>Código</td>
                           <td>${student.code}</td>`;
    trElement2.innerHTML = `<td>Cédula</td>
                           <td>${student.id}</td>`;
    trElement3.innerHTML = `<td>Edad</td>
                           <td>${student.age}</td>`;
    trElement4.innerHTML = `<td>Dirección</td>
                           <td>${student.address}</td>`;
    trElement5.innerHTML = `<td>Teléfono</td>
                           <td>${student.phone}</td>`;                      
    studentsTbody.appendChild(trElement1);
    studentsTbody.appendChild(trElement2);
    studentsTbody.appendChild(trElement3);
    studentsTbody.appendChild(trElement4);
    studentsTbody.appendChild(trElement5);
  });
}
 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function applyFilterByCredits() { 
  let text1 = inputSearchBox2.value;
  text1 = (text1 == null) ? '' : text1;
  let text2 = inputSearchBox3.value;
  text2 = (text2 == null) ? '' : text2;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByCredits(text1, text2, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function searchCourseByCredits(nameKey1: string, nameKey2:string, courses: Course[]) {
  if (nameKey1==='' || nameKey2===''){
    return courses;
  }
  var curso: Course[]=[]; 
  courses.forEach((course)=>{
    if (course.credits >= +nameKey1 && +course.credits <= +nameKey2){
      curso.push(course);
    }
  });
  return curso;
}

function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}