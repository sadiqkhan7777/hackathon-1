var _a;
// task 1
(_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault();
    // Get references to form elements using their IDs
    var profilePictureInput = document.getElementById('profilePicture');
    var nameElement = document.getElementById('name');
    var emailElement = document.getElementById('email');
    var phoneElement = document.getElementById('phone');
    var addressElement = document.getElementById('address');
    // const educationElement = document.getElementById(
    //     'education'
    // ) as HTMLInputElement;
    var educationElement = document.getElementById('education');
    // const experienceElement = document.getElementById(
    //     'experience'
    // ) as HTMLInputElement;
    var experienceElement = document.getElementById('experience');
    // const skillsElement = document.getElementById(
    //     'skills'
    // ) as HTMLInputElement;
    var skillsElement = document.getElementById('skills');
    // ** 
    var usernameElement = document.getElementById('username');
    if (profilePictureInput &&
        nameElement &&
        emailElement &&
        phoneElement &&
        addressElement &&
        educationElement &&
        experienceElement &&
        skillsElement &&
        // ** 
        usernameElement) {
        var name_1 = nameElement.value;
        var email = emailElement.value;
        var phone = phoneElement.value;
        var address = addressElement.value;
        var education = educationElement.value;
        var experience = experienceElement.value;
        var skills = skillsElement.value;
        // ** 
        var username = usernameElement.value;
        var uniquePath = "resumes/".concat(username.replace(/\s+/g, '_'), "_cv.html");
        // profile picture elements
        var profilePictureFile = (_a = profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
        var profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';
        // Create resume output
        var resumeOutput = "\n        <h2>Resume</h2>\n        ".concat(profilePictureURL ? "<img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" class=\"profilePicture\">") : '', "\n        <p><strong>Name:</strong> <span id=\"edit-name\" class=\"editable\"> ").concat(name_1, " </span></p>\n        <p><strong>Email:</strong><span id=\"edit-edit\" class=\"editable\"> ").concat(email, " </span></p>\n        <p><strong>Phone Number:</strong><span id=\"edit-phone\" class=\"editable\"> ").concat(phone, " </span></p>\n        <p><strong>Address:</strong><span id=\"edit-address\" class=\"editable\"> ").concat(address, " </span></p>\n\n        <h3>Education</h3>\n        <p id=\"edit-education\" class=\"editable\">").concat(education, "</p>\n\n        <h3>Work Experience</h3>\n        <p id=\"edit-experience\" class=\"editable\">").concat(experience, "</p>\n\n        <h3>Skills</h3>\n        <p id=\"edit-skills\" class=\"editable\">").concat(skills, "</p>\n        ");
        // ** 
        var downloadLink = document.createElement('a');
        downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeOutput);
        downloadLink.download = uniquePath;
        downloadLink.textContent = 'Download Your 2024 Resume';
        // Display the resume output
        var resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            resumeOutputElement.classList.remove('hidden');
            makeEditable();
            // ** 
            resumeOutputElement.appendChild(downloadLink);
        }
    }
    else {
        console.error('One or more form elements are missing');
    }
});
function makeEditable() {
    var editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(function (element) {
        element.addEventListener('click', function () {
            var _a;
            var currentElement = element;
            var currentValue = currentElement.textContent || "";
            // replace content 
            if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
                var input_1 = document.createElement('input');
                input_1.type = 'text';
                input_1.value = currentValue;
                input_1.classList.add('editing-input');
                input_1.addEventListener('blur', function () {
                    currentElement.textContent = input_1.value;
                    currentElement.style.display = 'inline';
                    input_1.remove();
                });
                currentElement.style.display = 'none';
                (_a = currentElement.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore(input_1, currentElement);
                input_1.focus();
            }
        });
    });
}
// const name = (nameElement as HTMLInputElement).value;
// const email = (emailElement as HTMLInputElement).value;
// const phone = (phoneElement as HTMLInputElement).value;
// const address = (addressElement as HTMLInputElement).value;
// const education = (educationElement as HTMLTextAreaElement).value;
// const experience = (experienceElement as HTMLTextAreaElement).value;
// const skills = (skillsElement as HTMLTextAreaElement).value;
