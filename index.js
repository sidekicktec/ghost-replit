const inquirer = require("inquirer");
const fs = require("fs");

const default_url = `https://${process.env["REPL_SLUG"]}.${process.env["REPL_OWNER"]}.repl.co`;

inquirer
    .prompt([
        {
            name: "use_custom",
            type: "confirm",
            message: `Would you like to configure a custom domain? 
(default: ${default_url})`,
            default: false,
        },
        {
            name: "custom_domain",
            type: "string",
            message: "What is your custom domain? (ex: example.com)",
            when: (answer) => answer.use_custom,
        },
    ])
    .then((answer) => {
        const url = answer.use_custom ? `https://${answer.custom_domain}` : default_url;
        console.log(`Your site will be available at ${url}.`);
        console.log(`Visit ${url}/ghost to create your admin account.`);
        if (answer.use_custom) {
            console.log("Make sure to link your custom domain. Docs: https://docs.replit.com/hosting/hosting-web-pages");
        }

        const json = JSON.parse(fs.readFileSync("config.production.json"));
        json.url = url;
        fs.writeFileSync("config.production.json", JSON.stringify(json, null, 2));
    });