const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const questions = [
    {
        type: 'confirm',
        message: 'Would you like to register an employee?',
        name: 'registerEmployee'
    },
    {
        type: 'checkbox',
        message: 'What type of employee would you like to register?',
        choices: ['Manager', 'Engineer', 'Intern'],
        name: 'role',
        when: (answers) => answers.registerEmployee === true
    },
    {
        type: 'input',
        message: 'What is the name of this employee?',
        name: 'name',
        when: (answers) => answers.registerEmployee === true
    },
    {
        type: 'input',
        message: "What is this employee's email?",
        name: 'email',
        when: (answers) => answers.registerEmployee === true
    },
    {
        type: 'input',
        message: "What is this employee's id?",
        name: 'id',
        when: (answers) => answers.registerEmployee === true
    },
    {
        type: 'input',
        message: "What is this manager's office number?",
        name: 'officeNumber',
        when: (answers) => (answers.registerEmployee === true && answers.role[0] === 'Manager')
    },
    {
        type: 'input',
        message: "What is this engineer's github username?",
        name: 'github',
        when: (answers) => (answers.registerEmployee === true && answers.role[0] === 'Engineer')
    },
    {
        type: 'input',
        message: "Where does this intern go to school?",
        name: 'school',
        when: (answers) => (answers.registerEmployee === true && answers.role[0] === 'Intern')
    }
];

function createTeamMember() {
    inquirer.prompt(questions).then(answers => {
        if(answers.role){
            if(answers.role[0] === 'Manager') {
                let manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
                employees.push(manager);
            }
            else if(answers.role[0] === 'Engineer') {
                let engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
                employees.push(engineer);
            }
            else if(answers.role[0] === 'Intern') {
                let intern = new Intern(answers.name, answers.id, answers.email, answers.school);
                employees.push(intern);
            }
            else {
                console.log("Unable to add team member: role not specified");
            }
        }

        if(answers.registerEmployee === true) {
            createTeamMember();
        }
        else {
            const teamHTML = render(employees);
            fs.appendFile(outputPath, teamHTML);
        }
    });
}

createTeamMember();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
