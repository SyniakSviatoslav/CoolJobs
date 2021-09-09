import {apiUrl, nameInput, companyInput, descriptionInput, salaryInput}
from './constants.js';
import {removeJob} from './additional_functions.js';
import {editJob} from './additional_functions.js'

export async function renderJobs() {
    const jobsData = await fetch(`${apiUrl}`);
    console.log(jobsData)
    let jobs = await jobsData.json();
    jobs.forEach((job) => {

        let jobContainer = document.createElement("div");
        jobContainer.setAttribute("id", job.id);
        jobContainer.setAttribute("class", "containerJob")

        let nameBlock = document.createElement("input");
        nameBlock.classList.add('name');
        nameBlock.classList.add('block');
        nameBlock.value = `${job.title}`

        let companyBlock = document.createElement("input");
        companyBlock.classList.add('salary');
        companyBlock.classList.add('block');
        companyBlock.value = `${job.companyName}`

        let salaryBlock = document.createElement("input");
        salaryBlock.classList.add('company');
        salaryBlock.classList.add('block');
        salaryBlock.value = `${job.salary}`

        let descriptionBlock = document.createElement("input");
        descriptionBlock.classList.add('description');
        descriptionBlock.classList.add('block');
        descriptionBlock.value = `${job.description}`

        let removeButton = document.createElement("button");
        removeButton.addEventListener("click", removeJob);
        removeButton.textContent = "REMOVE";
        removeButton.setAttribute("id", job.id)
        removeButton.classList.add('delete')

        let editButton = document.createElement("button");
        editButton.addEventListener("click", editJob);
        editButton.textContent = "EDIT";
        editButton.classList.add('edit')
        let img = document.createElement("img");
        img.src = "/edit_black_36dp.svg";
        editButton.appendChild(img)

        document.body.appendChild(jobContainer);
        jobContainer.appendChild(nameBlock);
        jobContainer.appendChild(companyBlock);
        jobContainer.appendChild(salaryBlock);
        jobContainer.appendChild(descriptionBlock);
        jobContainer.appendChild(removeButton);
        jobContainer.appendChild(editButton);
        
    })
}

export async function createJob() {
    let job = {
        title: nameInput.value,
        companyName: companyInput.value,
        description: descriptionInput.value,
        salary: salaryInput.value + " $",
    };

    let response = await fetch(`${apiUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(job)
        
    })
    location.reload();

    let result = await response.json();
    console.log(result.message)
}



