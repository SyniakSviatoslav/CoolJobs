document.addEventListener('DOMContentLoaded', function () {
    renderJobs();
    document.getElementById("add").addEventListener("click", createJob)
});


let nameInput = document.getElementById("name-input");
let companyInput = document.getElementById("company-input");
let descriptionInput = document.getElementById("description-input");
let salaryInput = document.getElementById("salary-input")

{/* <input type="input" value="${item.name}" class="taskInput" id ="${item.id}" maxlength = "35"> */ }
// myPara.setAttribute("id", "id_you_like");
// var input = document.createElement("input");
// input.type = "text";

async function renderJobs() {
    const jobsData = await fetch("https://61293a58068adf001789b83c.mockapi.io/api/jobs");
    console.log(jobsData)
    let jobs = await jobsData.json();
    jobs.forEach((job) => {
        let jobBlock1 = document.createElement("input");
        let jobBlock2 = document.createElement("p");
        let jobBlock3 = document.createElement("p");
        let jobBlock4 = document.createElement("p");
        jobBlock1.classList.add('name');
        jobBlock2.classList.add('salary');
        jobBlock3.classList.add('company');
        jobBlock4.classList.add('description');
        jobBlock1.setAttribute("id", job.title)


        let removeButton = document.createElement("button");
        removeButton.addEventListener("click", removeJob);
        removeButton.textContent = "REMOVE";
        removeButton.setAttribute("id", job.id)
        removeButton.classList.add('delete')

        jobBlock1.value = `${job.title}`
        jobBlock2.textContent = `${job.companyName}`
        jobBlock3.textContent = `${job.salary}`
        jobBlock4.textContent = `${job.description}`
        document.body.appendChild(jobBlock1);
        document.body.appendChild(jobBlock2);
        document.body.appendChild(jobBlock3);
        document.body.appendChild(jobBlock4);
        document.body.appendChild(removeButton);
    })
}

async function createJob() {
    let job = {
        title: nameInput.value,
        companyName: companyInput.value,
        description: descriptionInput.value,
        salary: salaryInput.value,
    };




    let response = await fetch('https://61293a58068adf001789b83c.mockapi.io/api/jobs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(job)
    });






    let result = await response.json();
    console.log(result.message)
}

async function removeJob() {
    let response = await fetch(`https://61293a58068adf001789b83c.mockapi.io/api/jobs/${this.id}`, {
        method: 'DELETE',
    });
    let result = await response.json();
    return result
}

const jobsData = fetch("https://61293a58068adf001789b83c.mockapi.io/api/jobs");
console.log(jobsData)
let oldJobs = jobsData;

document.getElementsByTagName('input').forEach(item => {
    item.addEventListener('input', event => {

        let updatedJobs = oldJobs.reduce((acc, job) => {

            return [...acc, +event.target.id === job.id ? {
                ...job,
                name: event.target.value

            } : job]

        }, [])
        jobs = updatedJobs;

    })
    fetch(`https://61293a58068adf001789b83c.mockapi.io/api/jobs/${this.id}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            done: updatedJobs
        })
    })
})


//  
