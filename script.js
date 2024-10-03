// Registration Functionality for Account
const registerAccount = () => {
    const accountForm = document.getElementById('signupForm'); 
    if (accountForm) {
        accountForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = document.getElementById("userName").value;
            const password = document.getElementById("password").value;

            // Save username and password to localStorage
            if (username && password) {
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                alert('Registration successful! You can now log in.');

                // Clear the form
                accountForm.reset();
            } else {
                alert('Please fill in both fields.');
            }
        });
    }
};

// Registration Form Submission for User Data
const registerUserData = () => {
    const registrationForm = document.getElementById('dataForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Get input values for registration
            const firstName = document.getElementById("firstName").value;
            const middleName = document.getElementById("middleName").value;
            const lastName = document.getElementById("lastName").value;
            const age = document.getElementById("age").value;
            const gender = document.getElementById("gender").value;
            const course = document.getElementById("course").value;
            const address = document.getElementById("address").value;
            const mobile = document.getElementById("mobile").value;

            // Get birthdate values
            const birthDay = document.getElementById("birthDay").value;
            const birthMonth = document.getElementById("birthMonth").value;
            const birthYear = document.getElementById("birthYear").value;

            // Get year level
            const yearLevel = document.getElementById("yearLevel").value;

            // Get father's information
            const fatherFirstName = document.getElementById("fatherFirstName").value;
            const fatherLastName = document.getElementById("fatherLastName").value;
            const fatherContact = document.getElementById("fatherContact").value;

            // Get mother's information
            const motherFirstName = document.getElementById("motherFirstName").value;
            const motherLastName = document.getElementById("motherLastName").value;
            const motherContact = document.getElementById("motherContact").value;

            // Retrieve existing data from local storage
            const existingData = JSON.parse(localStorage.getItem("userData")) || [];

            // Determine the next ID
            const nextId = existingData.length > 0 ? existingData[existingData.length - 1].id + 1 : 1;

            // Create user data object
            const userData = {
                id: nextId,
                firstName,
                middleName,
                lastName,
                age: parseInt(age, 10),
                gender,
                course,
                address,
                mobile,
                birthDate: `${birthDay}, ${birthMonth}, ${birthYear}`,
                yearLevel,
                fatherFirstName,
                fatherLastName,
                fatherContact,
                motherFirstName,
                motherLastName,
                motherContact
                
            };

            // Add new user data to existing data
            existingData.push(userData);

            // Save updated data back to local storage
            localStorage.setItem("userData", JSON.stringify(existingData));

            // Clear the form
            registrationForm.reset();

            // Show success message
            alert("Data successfully saved!");

            // Update student count after saving data
            updateStudentCount();
        });
    }
};


// Login Functionality
const loginUser = () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const storedUsername = localStorage.getItem('username');
            const storedPassword = localStorage.getItem('password');

            if (username === storedUsername && password === storedPassword) {
                window.location.href = 'home.html'; // Redirect to home.html
            } else {
                alert('Invalid username or password.');
            }
        });
    }
};

// Call registration and login functions at the top
registerAccount();
registerUserData();
loginUser();

document.addEventListener("DOMContentLoaded", () => {
    const updateStudentCount = () => {
        const storedData = JSON.parse(localStorage.getItem("userData")) || [];
    
        // Initialize counters for each year level and course
        let countYear1 = 0, countYear2 = 0, countYear3 = 0, countYear4 = 0;
        let countBSIT = 0, countBSAB = 0, countBSHM = 0, countBSED = 0;
    
        // Total count of students
        const totalStudents = storedData.length;
    
        storedData.forEach(student => {
            // Count by year level
            switch (student.yearLevel) {
                case '1': countYear1++; break;
                case '2': countYear2++; break;
                case '3': countYear3++; break;
                case '4': countYear4++; break;
            }
    
            // Count by course
            switch (student.course) {
                case 'BSIT': countBSIT++; break;
                case 'BSAB': countBSAB++; break;
                case 'BSHM': countBSHM++; break;
                case 'BSED': countBSED++; break;
            }
        });
    
        // Update the total number of students in the card
        document.getElementById('totalStudents').textContent = totalStudents;
    
        // Create the year level pie chart
        const ctxYear = document.getElementById('yearLevelChart').getContext('2d');
        const yearLevelChart = new Chart(ctxYear, {
            type: 'pie',
            data: {
                labels: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
                datasets: [{
                    label: 'Year Level Distribution',
                    data: [countYear1, countYear2, countYear3, countYear4],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: 'white' // Set legend text color to white
                        }
                    },
                    title: {
                        display: true,
                        text: 'Student Distribution by Year Level',
                        color: 'white' // Set title text color to white
                    },
                    datalabels: {
                        color: 'white', // Set datalabels text color to white
                        formatter: (value, ctx) => {
                            const total = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(2) + '%';
                            return percentage;
                        },
                    }
                }
            },
            plugins: [ChartDataLabels] // Add the datalabels plugin here
        });
    
        // Create the course pie chart
        const ctxCourse = document.getElementById('courseChart').getContext('2d');
        const courseChart = new Chart(ctxCourse, {
            type: 'pie',
            data: {
                labels: ['BSIT', 'BSAB', 'BSHM', 'BSED'],
                datasets: [{
                    label: 'Course Distribution',
                    data: [countBSIT, countBSAB, countBSHM, countBSED],
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 159, 64, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 205, 86, 1)',
                        'rgba(255, 99, 132, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: 'white' 
                        }
                    },
                    title: {
                        display: true,
                        text: 'Student Distribution by Course',
                        color: 'white' 
                    },
                    datalabels: {
                        color: 'white', 
                        formatter: (value, ctx) => {
                            const total = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(2) + '%';
                            return percentage;
                        },
                    }
                }
            },
            plugins: [ChartDataLabels] // Add the datalabels plugin here
        });
    };
    updateStudentCount(); 
});


const dataTable = document.getElementById('dataTable');
const storedData = JSON.parse(localStorage.getItem('userData')) || [];

const populateDataTable = (data) => {
    dataTable.innerHTML = ""; 
    if (data.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="12" class="text-center">No data available</td>`;
        dataTable.appendChild(row);
        return;
    }
    
    data.forEach((item, index) => {
        const row = document.createElement("tr");
        const birthDate = new Date(item.birthDate);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        row.innerHTML = `
            <td>${index + 1}.</td>
            <td>${item.firstName}</td>
            <td>${item.middleName}</td>
            <td>${item.lastName}</td>
            <td>${age}</td>
            <td>${item.gender}</td>
            <td>${item.birthDate}</td>
            <td>${item.course}</td>
            <td>${item.address}</td>
            <td>${item.mobile}</td>
            <td>${item.yearLevel}</td>
            <td>
                <button class="btn btn-success btn-sm edit" data-index="${index}">Edit</button>
                <button class="btn btn-danger btn-sm delete" data-index="${index}">Delete</button>
            </td>
        `;
        dataTable.appendChild(row);
    });
};

populateDataTable(storedData);

dataTable.addEventListener("click", (event) => {
    const index = event.target.dataset.index;

    if (event.target.classList.contains("delete")) {
        const confirmDelete = confirm("Are you sure you want to delete this record?");
        if (confirmDelete) {
            storedData.splice(index, 1);
            localStorage.setItem("userData", JSON.stringify(storedData));
            populateDataTable(storedData);
        }
    } else if (event.target.classList.contains("edit")) {
        const item = storedData[index];
        const newFirstName = prompt("Edit First Name", item.firstName);
        const newMiddleName = prompt("Edit Middle Name", item.middleName);
        const newLastName = prompt("Edit Last Name", item.lastName);
        const newGender = prompt("Edit Gender", item.gender);
        const newCourse = prompt("Edit Course", item.course);
        const newAddress = prompt("Edit Address", item.address);
        const newMobile = prompt("Edit Mobile", item.mobile);
        const newBirthDate = prompt("Edit Birth Date (DD, MM, YYYY)", item.birthDate);
        const newYearLevel = prompt("Edit Year Level", item.yearLevel);
        
        if (newFirstName && newMiddleName && newLastName && newGender && newCourse && newAddress && newMobile && newBirthDate && newYearLevel) {
            item.firstName = newFirstName;
            item.middleName = newMiddleName;
            item.lastName = newLastName;
            item.gender = newGender;
            item.course = newCourse;
            item.address = newAddress;
            item.mobile = newMobile;
            item.birthDate = newBirthDate;
            item.yearLevel = newYearLevel;

            localStorage.setItem("userData", JSON.stringify(storedData));
            populateDataTable(storedData);
        } else {
            alert("All fields must be filled out to update the record.");
        }
    }
});

function logout() {
    if (confirm("Are you sure you want to log out?")) {
        window.location.href = "login.html"; 
    }
}

