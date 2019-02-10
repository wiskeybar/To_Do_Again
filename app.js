// function names are selfexplanatory

const
    wrapper = document.querySelector('.wrapper')
searchfield = document.querySelector('.searchfield')
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
    removeAll = document.querySelector('.removeAll'),

    taskContainer = document.querySelector('.tasks'),
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
    const allTasks = Array.from(document.querySelectorAll('.tasks_usertask'));
    basicFilters.forEach(filter => { filter.style.opacity = "1"; filter.style.boxShadow = "none" });
    weekFilters.forEach(filter => { filter.style.opacity = "1"; filter.style.boxShadow = "none" });
    allTasks.forEach(task => {
        task.style.display = "flex";
        task.style.order = "0"
    })
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
    task_name.readOnly = true
    task_name.value = name;
    task_name.title = "Click to see description";
    task_container.appendChild(task_name);


    task_deadline.type = "div";
    task_deadline.textContent = `${deadline[8]}${deadline[9]}/${deadline[5]}${deadline[6]}/${deadline[0]}${deadline[1]}${deadline[2]}${deadline[3]}`;
    task_deadline.className = "tasks_usertask__Deadline";
    task_container.appendChild(task_deadline);


    task_priority.disabled = true;
    task_priority.className = "tasks_usertask__Priority";
    task_container.appendChild(task_priority);
    task_priority_high.textContent = "HIGH"
    task_priority_high.style.backgroundColor = 'var(--material-red)';
    task_priority_normal.textContent = "NORMAL"
    task_priority_normal.style.backgroundColor = 'var(--material-blue)';
    task_priority_low.textContent = "LOW"
    task_priority_low.style.backgroundColor = 'var(--material-green)';
    task_priority.appendChild(task_priority_high)
    task_priority.appendChild(task_priority_normal)
    task_priority.appendChild(task_priority_low)
    task_priority.style.color = "white"
    if (priority === "HIGH") {
        task_priority.style.backgroundColor = "var(--material-red)"
        task_priority.value = "HIGH"
    }
    if (priority == "NORMAL") {
        task_priority.style.backgroundColor = "var(--material-blue)"
        task_priority.value = "NORMAL"

    }
    if (priority == "LOW") {
        task_priority.style.backgroundColor = "var(--material-green)"
        task_priority.value = "LOW"

    }
    task_priority.addEventListener('change', (e) => {
        if (e.target.value === "HIGH") {
            e.target.style.backgroundColor = "var(--material-red)"
        }
        if (e.target.value == "NORMAL") {
            e.target.style.backgroundColor = "var(--material-blue)"
        }
        if (e.target.value == "LOW") {
            e.target.style.backgroundColor = "var(--material-green)"
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
    });



    task_name.addEventListener('click', function (e) {
        let activeDescription = document.querySelector('.descriptionPopup')
        if (activeDescription) {
            activeDescription.remove()
        }
        const descriptionPopup = document.createElement('div'),
            descriptionClose = document.createElement('i'),
            descriptionTitle = document.createElement('h2'),
            descriptionText = document.createElement('p'),
            taskRemove = document.createElement('button');

        descriptionPopup.className = 'descriptionPopup';
        descriptionClose.className = 'fas fa-times descriptionPopup__Close';
        descriptionTitle.className = 'descriptionPopup__Title';
        descriptionText.className = 'descriptionPopup__Text';
        taskRemove.className = 'descriptionPopup__Remove';


        descriptionTitle.textContent = task_name.value;
        descriptionText.textContent = task_description.value;
        taskRemove.textContent = "remove task";
        descriptionClose.addEventListener('click', () => descriptionPopup.remove())
        taskRemove.addEventListener('click', () => {
            if (confirm('This is permanent, are you sure?')) {
                task_container.remove()
                descriptionPopup.remove()
                window.localStorage.removeItem(id)
            }
            else {
                return
            }
        })

        descriptionPopup.appendChild(descriptionClose);
        descriptionPopup.appendChild(descriptionTitle);
        descriptionPopup.appendChild(descriptionText);
        descriptionPopup.appendChild(taskRemove);

        wrapper.appendChild(descriptionPopup);



    }
    )


    const storage = JSON.stringify({ name, deadline, priority, description, id })

    window.localStorage.setItem(id, storage)

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
        priorityDisplay.style.backgroundColor = "var(--material-red)"
    }
    if (priorityDisplay.value == "NORMAL") {
        priorityDisplay.style.backgroundColor = "var(--material-blue)"
    }
    if (priorityDisplay.value == "LOW") {
        priorityDisplay.style.backgroundColor = "var(--material-green)"
    }
    priorityDisplay.addEventListener('change', (e) => {
        if (e.target.value === "HIGH") {
            e.target.style.backgroundColor = "var(--material-red)"
        }
        if (e.target.value == "NORMAL") {
            e.target.style.backgroundColor = "var(--material-blue)"
        }
        if (e.target.value == "LOW") {
            e.target.style.backgroundColor = "var(--material-green)"
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
        editedDeadline.textContent = `${newDeadline[8]}${newDeadline[9]}/${newDeadline[5]}${newDeadline[6]}/${newDeadline[0]}${newDeadline[1]}${newDeadline[2]}${newDeadline[3]}`;
        editedPriority.value = priorityDisplay.value;
        if (editedPriority.value === "HIGH") {
            editedPriority.style.backgroundColor = "var(--material-red)"
        }
        if (editedPriority.value == "NORMAL") {
            editedPriority.style.backgroundColor = "var(--material-blue)"
        }
        if (editedPriority.value == "LOW") {
            editedPriority.style.backgroundColor = "var(--material-green)"
        }
        editedDescription.value = descriptionDisplay.value;

        popup.remove()
        const storageName = editedName.value
        const storageDeadline = dateInput.value
        const storagePriority = editedPriority.value;
        const storageDescription = editedDescription.value
        const storageId = editedTask.id

        const storage = JSON.stringify({ storageName, storageDeadline, storagePriority, storageDescription, storageId })

        window.localStorage.setItem(storageId, storage)


    })

    popup.childNodes.forEach(node => { node.disabled = false; node.readOnly = false })

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
    task_name.value = addOwnTask.value;
    task_name.className = "tasks_usertask__Title";

    createPopup.appendChild(task_name);

    task_deadline.className = "tasks_usertask__Deadline";
    task_deadline.type = "date"
    task_deadline.value = new Date().toISOString().slice(0, 10);
    createPopup.appendChild(task_deadline);

    task_priority.className = "tasks_usertask__Priority";
    task_priority.id = "taskPriority"
    createPopup.appendChild(task_priority);
    createPopup.appendChild(task_priority_label);
    task_priority_label.htmlFor = "taskPriority";
    task_priority_label.className = "tasks_usertask__PriorityLabel"
    task_priority_label.textContent = "PRIORITY"
    task_priority_high.textContent = "HIGH"
    task_priority_high.style.backgroundColor = 'var(--material-red)';
    task_priority_normal.textContent = "NORMAL"
    task_priority_normal.style.backgroundColor = 'var(--material-blue)';
    task_priority_low.textContent = "LOW"
    task_priority_low.style.backgroundColor = 'var(--material-green)';
    task_priority.appendChild(task_priority_high)
    task_priority.appendChild(task_priority_normal)
    task_priority.appendChild(task_priority_low)
    task_priority.style.color = "white"
    task_priority.value = "NORMAL"
    if (task_priority.value === "HIGH") {

        task_priority.style.backgroundColor = "var(--material-red)"
    }
    if (task_priority.value == "NORMAL") {
        task_priority.style.backgroundColor = "var(--material-blue)"
    }
    if (task_priority.value == "LOW") {
        task_priority.style.backgroundColor = "var(--material-green)"
    }

    task_priority.addEventListener('change', (e) => {
        if (e.target.value === "HIGH") {
            e.target.style.backgroundColor = "var(--material-red)"
        }
        if (e.target.value == "NORMAL") {
            e.target.style.backgroundColor = "var(--material-blue)"
        }
        if (e.target.value == "LOW") {
            e.target.style.backgroundColor = "var(--material-green)"
        }
    })

    task_description.className = "tasks_usertask__Description"
    task_description.placeholder = "Describe the task"
    createPopup.appendChild(task_description)

    task_edit.className = "tasks_usertask__Edit";
    task_edit.innerHTML = '<i class="fas fa-pencil-alt"></i>';
    createPopup.appendChild(task_edit)
    task_edit.addEventListener('click', () => {
        if (task_name.value && task_deadline.value && task_priority.value) {
            if (task_description.value === "") {
                task_description.value = "No description has been added"
            }
            createTask(task_name.value, task_deadline.value, task_priority.value, task_description.value, new Date().getTime())
            createPopup.remove()
        }
        else {
            alert('Please specify the Title of your task.')
        }
    })

    wrapper.appendChild(createPopup)

    addOwnTask.value = ""
})
removeAll.addEventListener('click', () => {
    if (window.confirm("this will remove all the tasks, are you sure?")) {
        const allTasks = Array.from(document.querySelectorAll('.tasks_usertask'));
        allTasks.forEach(task => task.remove())
        window.localStorage.clear();
    }
    else {
        return
    }
})

const commenceSearch = (e) => {
    if (e.keyCode === 13 || e.type === 'click') {
        const allTasks = Array.from(document.querySelectorAll('.tasks_usertask__Title'));
        const searchedTasks = allTasks.filter(task => task.value.includes(searchbar.value));
        allTasks.forEach(task => task.parentNode.style.display = "none");
        searchedTasks.forEach(task => task.parentNode.style.display = "flex")
        searchbar.value = "";
        if (!(document.querySelector('.clearSearchBtn'))) {
            const clearSearchBtn = document.createElement('div');
            clearSearchBtn.className = "clearSearchBtn"
            clearSearchBtn.innerHTML = ' <i style="display:block;padding:1vh;" class="fas fa-times"></i>';
            searchfield.appendChild(clearSearchBtn)
            clearSearchBtn.addEventListener('click', (e) => {
                allTasks.forEach(task => task.parentNode.style.display = "flex");
                e.target.parentNode.remove()
            })
        }
    }
}

searchbar.addEventListener('keydown', commenceSearch)
searchBtn.addEventListener('click', commenceSearch)

const weekFilter = (e) => {
    const deadlines = Array.from(document.querySelectorAll('.tasks_usertask__Deadline'))
    const today = new Date()
    today.setHours(0, 0, 0, 0);
    const currentDate = today.getTime();

    const deadlineCounter = (upto = 2, from = -1) => deadlines.forEach((deadline) => {
        let deadDate = deadline.textContent.split('/');
        let deadlineDates = new Date(deadDate[2], deadDate[1] - 1, deadDate[0]).getTime();

        // sidenote = milliseconds to days = milliseconds times 1.6534E-9

        if (((deadlineDates - currentDate) * 1.6534E-9) < upto && ((deadlineDates - currentDate) * 1.6534E-9) > from) {
            deadline.parentNode.style.display = "flex"
        }
        else {
            deadline.parentNode.style.display = "none"
        }
    })

    if (e.target === thisWeekFilter) {
        deadlineCounter(1, -1)
    }
    if (e.target === nextWeekFilter) {
        deadlineCounter(2, 1)
    }
    if (e.target === laterWeeksFilter) {
        deadlineCounter(Infinity, 2)

    }
}


thisWeekFilter.addEventListener('click', weekFilter)
nextWeekFilter.addEventListener('click', weekFilter)
laterWeeksFilter.addEventListener('click', weekFilter)

const parameterFilter = (e) => {
    const taskPriority = Array.from(document.querySelectorAll('.tasks_usertask__Priority')),
        taskTitle = Array.from(document.querySelectorAll('.tasks_usertask__Title')),
        taskDeadline = Array.from(document.querySelectorAll('.tasks_usertask__Deadline')),
        allTasks = Array.from(document.querySelectorAll('.tasks_usertask'));
    allTasks.forEach(task => {
        task.style.display = "flex";
        task.style.order = "0"
    })

    if (e.target === deadlineFilter) {
        let dates = {};
        taskDeadline.forEach(deadline => {
            dates[deadline.textContent] = deadline.parentNode.id;
        })
        let sortedDeadlines = Object.entries(dates).sort()
        sortedDeadlines.forEach(sorted => {
            document.getElementById(sorted[1]).style.order = sortedDeadlines.indexOf(sorted)
        })
    }
    if (e.target === nameFilter) {
        let titles = {};
        taskTitle.forEach(title => {
            titles[title.value] = title.parentNode.id;
        })
        let sortedTitles = Object.entries(titles).sort()
        sortedTitles.forEach(sorted => {
            document.getElementById(sorted[1]).style.order = sortedTitles.indexOf(sorted)
        })
    }
    if (e.target === priorityFilter) {
        taskPriority.forEach(priority => {

            if (priority.value === "HIGH") {
                priority.parentNode.style.order = "1"
            }
            if (priority.value === "NORMAL") {
                priority.parentNode.style.order = "2"
            }
            if (priority.value === "LOW") {
                priority.parentNode.style.order = "3"
            }
        })
    }
}


deadlineFilter.addEventListener('click', parameterFilter)
nameFilter.addEventListener('click', parameterFilter)
priorityFilter.addEventListener('click', parameterFilter)




if (window.localStorage.length >= 1) {
    let tasks = Object.keys(window.localStorage);
    tasks.forEach(task => {
        let storedTasks = JSON.parse(window.localStorage.getItem(task))
        createTask(...(Object.values(storedTasks)))
    })
}
