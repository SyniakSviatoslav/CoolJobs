document.addEventListener('DOMContentLoaded', function () {
    renderJobs();
    document.getElementById("add").addEventListener("click", Openform)
    document.getElementById("submit").addEventListener("click", createJob)
});

function Openform()
{
document.getElementById("mainForm").classList.remove("firstStyle");
document.getElementById("mainForm").classList.add("form");
document.getElementById("add").style.display = "none";
}
let nameInput = document.getElementById("name-input");
let companyInput = document.getElementById("company-input");
let descriptionInput = document.getElementById("description-input");
let salaryInput = document.getElementById("salary-input")



async function renderJobs() {
    const jobsData = await fetch("https://61293a58068adf001789b83c.mockapi.io/api/jobs");
    console.log(jobsData)
    let jobs = await jobsData.json();
    jobs.forEach((job) => {
        let jobBlock1 = document.createElement("input");
        let jobBlock2 = document.createElement("input");
        let jobBlock3 = document.createElement("input");
        let jobBlock4 = document.createElement("input");
        let jobContainer = document.createElement("div");
        jobContainer.setAttribute("id", job.id);
        jobContainer.setAttribute("class", "containerJob")
        jobBlock1.classList.add('name');
        jobBlock2.classList.add('salary');
        jobBlock3.classList.add('company');
        jobBlock4.classList.add('description');
        jobBlock1.classList.add('block');
        jobBlock2.classList.add('block');
        jobBlock3.classList.add('block');
        jobBlock4.classList.add('block');
        


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

        jobBlock1.value = `${job.title}`
        jobBlock2.value = `${job.companyName}`
        jobBlock3.value = `${job.salary}`
        jobBlock4.value = `${job.description}`
        document.body.appendChild(jobContainer);
        jobContainer.appendChild(jobBlock1);
        jobContainer.appendChild(jobBlock2);
        jobContainer.appendChild(jobBlock3);
        jobContainer.appendChild(jobBlock4);
        jobContainer.appendChild(removeButton);
        jobContainer.appendChild(editButton);
        
    })
}




async function createJob() {
    let job = {
        title: nameInput.value,
        companyName: companyInput.value,
        description: descriptionInput.value,
        salary: salaryInput.value + " $",
    };




    let response = await fetch('https://61293a58068adf001789b83c.mockapi.io/api/jobs', {
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

async function removeJob() {
    let response = await fetch(`https://61293a58068adf001789b83c.mockapi.io/api/jobs/${this.id}`, {
        method: 'DELETE',
    });
    location.reload();
    let result = await response.json();
    return result
}





async function editJob (){
    const jobsData = await fetch("https://61293a58068adf001789b83c.mockapi.io/api/jobs");
    console.log(jobsData)
    let jobs = await jobsData.json();
    let currentJob = this.parentNode.id;

    let firstElement = this.parentNode.firstChild;
    let secondElement = firstElement.nextElementSibling;
    let thirdElement = secondElement.nextElementSibling;
    

    let newValue = this.parentNode.firstChild.value;
     let newCompany = firstElement.nextElementSibling.value;
     let newSalary = secondElement.nextElementSibling.value;
     let newDescription = thirdElement.nextElementSibling.value;
     
    

    let response = await fetch(`https://61293a58068adf001789b83c.mockapi.io/api/jobs/${currentJob}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({title : newValue, companyName : newCompany, salary: newSalary, description: newDescription})
    });

    
    jobs = jobs.map((job) => job.id === currentJob ? {id: job.id, title: newValue, companyName: newCompany, salary: newSalary, description: newDescription} : job );
    
    location.reload();
}

