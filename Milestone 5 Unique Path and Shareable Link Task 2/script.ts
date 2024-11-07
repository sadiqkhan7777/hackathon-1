// task 2
document
  .getElementById("resumeForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get references to form elements using their IDs
    const profilePictureInput = document.getElementById(
      "profilePicture"
    ) as HTMLInputElement;
    const nameElement = document.getElementById("name") as HTMLInputElement;
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const phoneElement = document.getElementById("phone") as HTMLInputElement;
    const addressElement = document.getElementById(
      "address"
    ) as HTMLInputElement;
    const educationElement = document.getElementById(
      "education"
    ) as HTMLTextAreaElement;
    const experienceElement = document.getElementById(
      "experience"
    ) as HTMLTextAreaElement;
    const skillsElement = document.getElementById(
      "skills"
    ) as HTMLTextAreaElement;
    const usernameElement = document.getElementById(
      "username"
    ) as HTMLInputElement;

    if (
      profilePictureInput &&
      nameElement &&
      emailElement &&
      phoneElement &&
      addressElement &&
      educationElement &&
      experienceElement &&
      skillsElement &&
      usernameElement
    ) {
      const name = nameElement.value;
      const email = emailElement.value;
      const phone = phoneElement.value;
      const address = addressElement.value;
      const education = educationElement.value;
      const experience = experienceElement.value;
      const skills = skillsElement.value;
      const username = usernameElement.value;
      const uniquePath = `resumes/${username.replace(/\s+/g, "_")}_cv.html`;

      // Handle profile picture
      const profilePictureFile = profilePictureInput.files?.[0];
      const profilePictureURL = profilePictureFile
        ? URL.createObjectURL(profilePictureFile)
        : "";

      // Create resume output
      const resumeOutput = `
            <h2>Resume</h2>
            ${
              profilePictureURL
                ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">`
                : ""
            }
            <p><strong>Name:</strong> <span id="edit-name" class="editable"> ${name} </span></p>
            <p><strong>Email:</strong> <span id="edit-email" class="editable"> ${email} </span></p>
            <p><strong>Phone Number:</strong> <span id="edit-phone" class="editable"> ${phone} </span></p>
            <p><strong>Address:</strong> <span id="edit-address" class="editable"> ${address} </span></p>
            <h3>Education</h3>
            <p id="edit-education" class="editable">${education}</p>
            <h3>Work Experience</h3>
            <p id="edit-experience" class="editable">${experience}</p>
            <h3>Skills</h3>
            <p id="edit-skills" class="editable">${skills}</p>
        `;

      // Create a download link
      const downloadLink = document.createElement("a");
      downloadLink.href =
        "data:text/html;charset=utf-8," + encodeURIComponent(resumeOutput);
      downloadLink.download = uniquePath;
      downloadLink.textContent = "Download Your 2024 Resume";

      // Display the resume output
      const resumeOutputElement = document.getElementById("resumeOutput");
      if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;
        resumeOutputElement.classList.remove("hidden");
        makeEditable();

        // Create container for buttons
        const buttonContainer = document.createElement("div");
        buttonContainer.id = "buttonContainer";
        resumeOutputElement.appendChild(buttonContainer);

        // Add Download PDF button
        const downloadButton = document.createElement("button");
        downloadButton.textContent = "Download as PDF";
        downloadButton.addEventListener("click", function () {
          window.print();
        });
        buttonContainer.appendChild(downloadButton);

        // Add Copy Shareable Link button
        const shareLinkButton = document.createElement("button");
        shareLinkButton.textContent = "Copy Shareable Link";
        shareLinkButton.addEventListener("click", async function () {
          try {
            const shareableLink = `https://yourdomain.com/${name.replace(
              /\s+/g,
              "_"
            )}_cv.html`;
            await navigator.clipboard.writeText(shareableLink);
            alert("Shareable link copied to clipboard");
          } catch (err) {
            console.error("Failed to copy link", err);
            alert("Failed to copy link to clipboard. Please try again.");
          }
        });
        buttonContainer.appendChild(shareLinkButton);

        // Add the download link for HTML file
        resumeOutputElement.appendChild(downloadLink);
      } else {
        console.error("Resume output element not found");
      }
    } else {
      console.error("Form elements are missing");
    }
  });

function makeEditable() {
  const editableElements = document.querySelectorAll(".editable");
  editableElements.forEach((element) => {
    element.addEventListener("click", function () {
      const currentElement = element as HTMLElement;
      const currentValue = currentElement.textContent || "";

      if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
        const input = document.createElement("input");
        input.type = "text";
        input.value = currentValue;
        input.classList.add("editing-input");

        input.addEventListener("blur", function () {
          currentElement.textContent = input.value;
          currentElement.style.display = "inline";
          input.remove();
        });
        currentElement.style.display = "none";
        currentElement.parentElement?.insertBefore(input, currentElement);
        input.focus();
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
