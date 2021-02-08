const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const render = require("./lib/htmlRenderer");
const employee = [];
const managerQuestions = [
  {
    type: "input",
    name: "managerName",
    message: "Manager Name:"
  },

  {
    type: "input",
    name: "managerId",
    message: "Manager ID:"
  },

  {
    type: "input",
    name: "managerEmail",
    message: "Manager email:"
  },

  {
    type: "input",
    name: "officeNumber",
    message: "Manager office number:"
  }
];

const addTeamMembers = [
  {
    type: "list",
    name: "addTeamMembers",
    choices: ["Engineer", "Intern", "Done"]
  }
];

const engineerQuestions = [
  {
    type: "input",
    name: "engineerName",
    message: "Engineer Name:"
  },

  {
    type: "input",
    name: "engineerId",
    message: "Engineer ID:"
  },

  {
    type: "input",
    name: "engineerEmail",
    message: "Engineer email address:"
  },

  {
    type: "input",
    name: "engineerGitHub",
    message: "Engineer GitHub username:"
  },
];

const internQuestions = [
  {
    type: "input",
    name: "internName",
    message: "Intern's name:"
  },

  {
    type: "input",
    name: "internId",
    message: "Intern's ID:"
  },

  {
    type: "input",
    name: "internEmail",
    message: "Intern's email:"
  },

  {
    type: "input",
    name: "internSchool",
    message: "Intern's school:"
  },
];

function promptTeam() {
    inquirer.prompt(addTeamMembers).then(function (member) {
      console.log(member.addTeamMembers);
      if (member.addTeamMembers === "Engineer") {
        createEngineer();
      } else if (member.addTeamMembers === "Intern") {
        createIntern();
      } else {
        buildTeam();
      }
    });
  }

function createEngineer() {
  inquirer.prompt(engineerQuestions).then(function (engineerResponse) {
    const newEngineer = new Engineer(
      engineerResponse.engineerName,
      engineerResponse.engineerId,
      engineerResponse.engineerEmail,
      engineerResponse.engineerGitHub,
    );
    promptTeam();
    employee.push(newEngineer);
  });
}

function createIntern() {
  inquirer.prompt(internQuestions).then((internResponse) => {
    const newIntern = new Intern(
      internResponse.internName,
      internResponse.internId,
      internResponse.internEmail,
      internResponse.internSchool,
    );
    promptTeam();
    employee.push(newIntern);
  });
}

function createManager() {
  inquirer.prompt(managerQuestions).then((managerResponse) => {
    const newManager = new Manager(
      managerResponse.managerName,
      managerResponse.managerId,
      managerResponse.managerEmail,
      managerResponse.officeNumber,
    );
    promptTeam();
    employee.push(newManager);
  });
}
createManager();

function buildTeam() {
    fs.writeFileSync(outputPath, render(employee));
  }