import { apiUrl } from "./constants.js";

export async function removeJob() {
    let response = await fetch(`${apiUrl}/${this.id}`, {
        method: 'DELETE',
    });
    location.reload();
    let result = await response.json();
    return result
}

export async function editJob (){
    const jobsData = await fetch(`${apiUrl}`);
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
     
    

    let response = await fetch(`${apiUrl}/${currentJob}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({title : newValue, companyName : newCompany, salary: newSalary, description: newDescription})
    });

    
    jobs = jobs.map((job) => job.id === currentJob ? {id: job.id, title: newValue, companyName: newCompany, salary: newSalary, description: newDescription} : job );
    
    location.reload();
}

export function Openform()
{
document.getElementById("mainForm").classList.remove("firstStyle");
document.getElementById("mainForm").classList.add("form");
document.getElementById("add").style.display = "none";
}