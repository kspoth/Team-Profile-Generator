const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { ENGINE_METHOD_RAND, EADDRINUSE } = require("constants");

const employees = [];

//function that establishes use of the command line to run through prompts
function commandLine(){
    //inquirer for manager
    function manager(){
        inquirer.prompt([
            {
                type: "input",
                name: "mName",
                message: "What is the name of your team's manager?"
            },
            {
                type: "input",
                name: "mId",
                message: "What is the team Manager's ID?"
            },
            {
                type: "input",
                name: "mEmail",
                message: "What is your team Manager's e-mail?"
            },
            {
                type: "input",
                name: "mOffice",
                message: "What is your team Manager's office number?"
            }
        ]).then(input => {
            const manager = new Manager(input.mName, input.mId, input.mEmail, input.mOffice);
            employees.push(manager);
            addEmployee();
        });
    }
    //inquirer for engineers
    function engineerAdd(){
        inquirer.prompt([
            {
                type: "input",
                name: "eName",
                message: "What is the name of the Engineer?"
            },
            {
                type: "input",
                name: "eId",
                message: "What is the Engineer's ID?"
            },
            {
                type: "input",
                name: "eEmail",
                message: "What is the Engineer's e-mail?"
            },
            {
                type: "input",
                name: "eGit",
                message: "What is the Engineer's Github?"
            }
        ]).then(response => {
            const engineer = new Engineer(response.eName, response.eId, response.eEmail, response.eGit);
            employees.push(engineer);
            addEmployee();
        });
    }
    //function to add interns
    function internAdd(){
        inquirer.prompt([
            {
                type: "input",
                name: "iName",
                message: "What is the Intern's name?"
            },
            {
                type: "input",
                name: "iId",
                message: "What is the Intern's ID?"
            },
            {
                type: "input",
                name: "iEmail",
                message: "What is the Intern's e-mail?"
            },
            {
                type: "input",
                name: "iSchool",
                message: "What is the Intern's School?"
            }
        ]).then(response => {
            const intern = new Intern(response.iName, response.iId, response.iEmail, response.iSchool);
            employees.push(intern);
            addEmployee();
        });
    }
    function createHTML(){
        fs.writeFileSync(outputPath, render(employees), "utf-8");
    };
    //function to run after manager inquiry, check for additional employees or end inquirer to create html
    function addEmployee(){
        inquirer.prompt([
            {
                type: "list",
                name: "employeeType",
                message: "Add an additional team member?",
                choices: [
                    "Engineer",
                    "Intern",
                    "No additional team members"
                ]
            }
        ]).then(response => {
            switch(response.employeeType){
                case "Engineer":
                    engineerAdd();
                    break;
                case "Intern":
                    internAdd();
                    break;
                default:
                    createHTML();
                    console.log("Creating Team Page....")
            }
        });
    }

    manager();
}
//runs overall function structure on startup
commandLine();