document.addEventListener('DOMContentLoaded', function(){
    renderJobs();
    document.getElementById("add").addEventListener("click", createJob)
});


let nameInput = document.getElementById("name-input");
let companyInput = document.getElementById("company-input");
let descriptionInput = document.getElementById("description-input");
let salaryInput = document.getElementById("salary-input")

async function renderJobs (){
    const jobsData = await fetch("https://61293a58068adf001789b83c.mockapi.io/api/jobs");
    console.log(jobsData)
    let jobs = await jobsData.json();
    jobs.forEach((job)=>{
        let jobBlock1 = document.createElement("p");
        let jobBlock2 = document.createElement("p");
        let jobBlock3 = document.createElement("p");
        let jobBlock4 = document.createElement("p");
        jobBlock1.classList.add('name');
        jobBlock2.classList.add('salary');
        jobBlock3.classList.add('company');
        jobBlock4.classList.add('description');
        let removeButton = document.createElement("button");
        removeButton.addEventListener("click",removeJob);
        removeButton.textContent = "REMOVE";
        removeButton.setAttribute("id", job.id)
        removeButton.classList.add('delete')

        jobBlock1.textContent = `${job.title}`
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

async function createJob(){
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






    // let result = await response.json();
    // console.log(response)
}

async function removeJob(){
    let response = await fetch(`https://61293a58068adf001789b83c.mockapi.io/api/jobs/${this.id}`, {
        method: 'DELETE',
    });
    let result = await response.json();
    return result
}