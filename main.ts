// deno-lint-ignore-file no-case-declarations
class Task {
  Name:string
  Description:string

  constructor(name:string, description:string) {
    this.Name = name;
    this.Description = description;
  }
}

const Tasks:Task[] = [];

function ShowAllTasks() {
  console.log("=========================");
  if (Tasks.length == 0) {
    console.log("Your todo list is empty! Try adding some");
  }
  Tasks.forEach((task, index) => {
    console.log(index + " - " + task.Name);
  });
  console.log("=========================");
}

function AddTask() {
  const name = prompt("Task name: ") as string;
  const desc = prompt("Task description: ") as string;

  Tasks.push(new Task(name, desc));
}

function ParseCommand(fullCmd:string) {
  let cmdParts:string[] = fullCmd.split(" ");
  let index:number = 0;
  let cmd = cmdParts[0];
  if (cmdParts[1]) {
    index = parseInt(cmdParts[1]);
    if (index > Tasks.length-1) {
      return;
    }
  }

  switch (cmd) {
    // deno-lint-ignore no-fallthrough
    case "show":
      console.clear()
      console.log(Tasks[index].Description);
      const _ = prompt("");
      return;
    case "add":
      AddTask();
  }

}

async function Menu() {
  ShowAllTasks();
  console.log("Hello, litel reptylian. What would you like to now?\nshow [task index]\nadd");
  const input:string = prompt(">") as string;
  ParseCommand(input);
  console.clear();
}

while (true) {
  await Menu();
}
