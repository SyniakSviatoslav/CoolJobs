
import {renderJobs, createJob} from './render_create_functions.js';
import {Openform} from './additional_functions.js'


document.addEventListener('DOMContentLoaded', function () {
    renderJobs();
    document.getElementById("add").addEventListener("click", Openform)
    document.getElementById("submit").addEventListener("click", createJob)
});







