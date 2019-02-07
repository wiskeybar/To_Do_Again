const
    wrapper = document.querySelector('.wrapper')
searchbar = document.querySelector('.searchbar'),
    searchBtn = document.querySelector('.fa-search'),

    deadlineFilter = document.querySelector('.deadline'),
    nameFilter = document.querySelector('.name'),
    priorityFilter = document.querySelector('.priority'),
    thisWeekFilter = document.querySelector('.thisWeek'),
    nextWeekFilter = document.querySelector('.nextWeek'),
    laterWeeksFilter = document.querySelector('.laterWeeks'),
    clearFilterBtn = document.querySelector('.clear'),

    addOwnTask = document.querySelector('.addOwnTask'),
    addBtn = document.querySelector('.add'),

    taskContainer = document.querySelector('.tasks'),
    taskTitle = document.querySelector('.tasks_usertask__Title'),
    taskDeadline = document.querySelector('.tasks_usertask__Deadline'),
    taskPriority = document.querySelector('.tasks_usertask__Priority'),
    taskEditBtn = document.querySelector('.tasks_usertask__Edit');

const basicFilters = [deadlineFilter, nameFilter, priorityFilter];
const weekFilters = [thisWeekFilter, nextWeekFilter, laterWeeksFilter]

basicFilters.forEach(basicFilter => basicFilter.addEventListener('click', (e) => {
    basicFilters.forEach(basic_filter => {
        if (basic_filter !== e.target) {
            basic_filter.style.opacity = "0.3"
            basic_filter.style.boxShadow = "none"
        }
        else {
            basic_filter.style.opacity = "1"
            basic_filter.style.boxShadow = "0 -3px 10px inset var(--main-light)"
        }
    })
}));

weekFilters.forEach(weekFilter => weekFilter.addEventListener('click', (e) => {
    weekFilters.forEach(basic_filter => {
        if (basic_filter !== e.target) {
            basic_filter.style.opacity = "0.3"
            basic_filter.style.boxShadow = "none"
        }
        else {
            basic_filter.style.opacity = "1"
            basic_filter.style.boxShadow = "0 -3px 10px inset var(--main-dark)"
        }
    })
}));

clearFilterBtn.addEventListener('click', () => {
    basicFilters.forEach(filter => { filter.style.opacity = "1"; filter.style.boxShadow = "none" });
    weekFilters.forEach(filter => { filter.style.opacity = "1"; filter.style.boxShadow = "none" });
})


let createTask = (name, deadline, priority, description, id) => {
    const task_container = document.createElement("div");
    const task_name = document.createElement("input");
    const task_priority = document.createElement("select");
    const task_deadline = document.createElement("div");
    const task_edit = document.createElement("div");
    const task_description = document.createElement('textarea');
    const task_priority_high = document.createElement('option')
    const task_priority_normal = document.createElement('option')
    const task_priority_low = document.createElement('option')


    task_container.id = id;
    task_container.className = "tasks_usertask";
    taskContainer.appendChild(task_container);

    task_name.className = "tasks_usertask__Title";
    task_name.disabled = true
    task_name.value = name;
    task_container.appendChild(task_name);

    task_deadline.type = "div";
    task_deadline.textContent = `${deadline[8]}${deadline[9]}.${deadline[5]}${deadline[6]}.${deadline[0]}${deadline[1]}${deadline[2]}${deadline[3]}`;
    task_deadline.className = "tasks_usertask__Deadline";
    task_container.appendChild(task_deadline);


    task_priority.disabled = true;
    task_priority.className = "tasks_usertask__Priority";
    task_container.appendChild(task_priority);
    task_priority_high.textContent = "HIGH"
    task_priority_high.style.backgroundColor = 'red';
    task_priority_normal.textContent = "NORMAL"
    task_priority_normal.style.backgroundColor = 'blue';
    task_priority_low.textContent = "LOW"
    task_priority_low.style.backgroundColor = 'green';
    task_priority.appendChild(task_priority_high)
    task_priority.appendChild(task_priority_normal)
    task_priority.appendChild(task_priority_low)
    task_priority.style.color = "white"
    if (priority === "HIGH") {
        task_priority.style.backgroundColor = "red"
        task_priority.value = "HIGH"
    }
    if (priority == "NORMAL") {
        task_priority.style.backgroundColor = "blue"
        task_priority.value = "NORMAL"

    }
    if (priority == "LOW") {
        task_priority.style.backgroundColor = "green"
        task_priority.value = "LOW"

    }
    task_priority.addEventListener('change', (e) => {
        if (e.target.value === "HIGH") {
            e.target.style.backgroundColor = "red"
        }
        if (e.target.value == "NORMAL") {
            e.target.style.backgroundColor = "blue"
        }
        if (e.target.value == "LOW") {
            e.target.style.backgroundColor = "green"
        }
    })

    task_edit.className = "tasks_usertask__Edit";
    task_edit.innerHTML = '<i class="fas fa-pencil-alt"></i>';
    task_container.appendChild(task_edit);

    task_description.className = "tasks_usertask__Description"
    task_description.value = description
    task_description.type = "text"
    task_container.appendChild(task_description)

    task_edit.addEventListener('click', function () {
        let parent = document.getElementById(this.parentNode.id)
        let currentPriority = parent.querySelector('.tasks_usertask__Priority').value
        let currentTitle = parent.querySelector('.tasks_usertask__Title').value
        let currentDescription = parent.querySelector('.tasks_usertask__Description').value
        editPopup(parent, currentPriority, currentTitle, currentDescription, id)
    })


}



let editPopup = function (parent, currentPriority, currentTitle, currentDescription, id) {
    let popup = document.createElement('div');
    popup.innerHTML = parent.innerHTML;
    popup.className = "popup";

    let nameDisplay = popup.querySelector('.tasks_usertask__Title')
    nameDisplay.type = "text"
    nameDisplay.value = currentTitle
    nameDisplay.maxLength = 40;


    let priorityDisplay = popup.querySelector('.tasks_usertask__Priority')
    priorityDisplay.value = currentPriority
    if (priorityDisplay.value === "HIGH") {
        priorityDisplay.style.backgroundColor = "red"
    }
    if (priorityDisplay.value == "NORMAL") {
        priorityDisplay.style.backgroundColor = "blue"
    }
    if (priorityDisplay.value == "LOW") {
        priorityDisplay.style.backgroundColor = "green"
    }
    priorityDisplay.addEventListener('change', (e) => {
        if (e.target.value === "HIGH") {
            e.target.style.backgroundColor = "red"
        }
        if (e.target.value == "NORMAL") {
            e.target.style.backgroundColor = "blue"
        }
        if (e.target.value == "LOW") {
            e.target.style.backgroundColor = "green"
        }
    })

    let descriptionDisplay = popup.querySelector('.tasks_usertask__Description')
    descriptionDisplay.style.display = "block";
    descriptionDisplay.value = currentDescription
    descriptionDisplay.style.resize = "none"


    let dateDisplay = popup.querySelector('.tasks_usertask__Deadline')
    let dateDiv = dateDisplay.textContent;
    let dateInput = document.createElement('input');
    dateInput.className = "tasks_usertask__Deadline"
    dateInput.type = "date"
    dateInput.value = `${dateDiv[6]}${dateDiv[7]}${dateDiv[8]}${dateDiv[9]}-${dateDiv[3]}${dateDiv[4]}-${dateDiv[0]}${dateDiv[1]}`;
    dateDisplay.replaceWith(dateInput)




    let saveEdit = popup.querySelector('.tasks_usertask__Edit');
    saveEdit.addEventListener('click', () => {
        let editedTask = document.getElementById(id);

        let editedName = editedTask.querySelector('.tasks_usertask__Title');
        let editedDeadline = editedTask.querySelector('.tasks_usertask__Deadline');
        let editedPriority = editedTask.querySelector('.tasks_usertask__Priority');
        let editedDescription = editedTask.querySelector('.tasks_usertask__Description');
        let newDeadline = dateInput.value
        editedName.value = nameDisplay.value;
        editedDeadline.textContent = `${newDeadline[8]}${newDeadline[9]}.${newDeadline[5]}${newDeadline[6]}.${newDeadline[0]}${newDeadline[1]}${newDeadline[2]}${newDeadline[3]}`;
        editedPriority.value = priorityDisplay.value;
        if (editedPriority.value === "HIGH") {
            editedPriority.style.backgroundColor = "red"
        }
        if (editedPriority.value == "NORMAL") {
            editedPriority.style.backgroundColor = "blue"
        }
        if (editedPriority.value == "LOW") {
            editedPriority.style.backgroundColor = "green"
        }
        editedDescription.value = descriptionDisplay.value;

        popup.remove()

    })

    popup.childNodes.forEach(node => node.disabled = false)

    wrapper.appendChild(popup)


}




addBtn.addEventListener('click', () => {
    let createPopup = document.createElement('div');
    createPopup.className = "popup"
    const task_name = document.createElement("input");
    const task_priority = document.createElement("select");
    const task_priority_label = document.createElement('label');
    const task_deadline = document.createElement("input");
    const task_edit = document.createElement("div");
    const task_description = document.createElement('textarea');
    const task_priority_high = document.createElement('option')
    const task_priority_normal = document.createElement('option')
    const task_priority_low = document.createElement('option')

    task_name.type = "text";
    task_name.placeholder = "Place for your title"
    task_name.className = "tasks_usertask__Title";

    createPopup.appendChild(task_name);

    task_deadline.className = "tasks_usertask__Deadline";
    task_deadline.type = "date"
    createPopup.appendChild(task_deadline);

    task_priority.className = "tasks_usertask__Priority";
    task_priority.id = "taskPriority"
    createPopup.appendChild(task_priority);
    createPopup.appendChild(task_priority_label);
    task_priority_label.htmlFor = "taskPriority";
    task_priority_label.className = "tasks_usertask__PriorityLabel"
    task_priority_label.textContent = "PRIORITY"
    task_priority_high.textContent = "HIGH"
    task_priority_high.style.backgroundColor = 'red';
    task_priority_normal.textContent = "NORMAL"
    task_priority_normal.style.backgroundColor = 'blue';
    task_priority_low.textContent = "LOW"
    task_priority_low.style.backgroundColor = 'green';
    task_priority.appendChild(task_priority_high)
    task_priority.appendChild(task_priority_normal)
    task_priority.appendChild(task_priority_low)
    task_priority.style.color = "white"
    if (task_priority.value === "HIGH") {

        task_priority.style.backgroundColor = "red"
    }
    if (task_priority.value == "NORMAL") {
        task_priority.style.backgroundColor = "blue"
    }
    if (task_priority.value == "LOW") {
        task_priority.style.backgroundColor = "green"
    }

    task_priority.addEventListener('change', (e) => {
        if (e.target.value === "HIGH") {
            e.target.style.backgroundColor = "red"
        }
        if (e.target.value == "NORMAL") {
            e.target.style.backgroundColor = "blue"
        }
        if (e.target.value == "LOW") {
            e.target.style.backgroundColor = "green"
        }





    })

    task_description.className = "tasks_usertask__Description"
    task_description.placeholder = "Describe the task"
    createPopup.appendChild(task_description)

    task_edit.className = "tasks_usertask__Edit";
    task_edit.innerHTML = '<i class="fas fa-pencil-alt"></i>';
    createPopup.appendChild(task_edit)
    task_edit.addEventListener('click', () => {
        if (task_name.value && task_deadline.value && task_priority.value && task_description.value) {
            createTask(task_name.value, task_deadline.value, task_priority.value, task_description.value, new Date().getTime())
            createPopup.remove()
        }
        else {
            alert('please specify title, date, priority and provide a brief description')
        }
    })

    wrapper.appendChild(createPopup)

})
