const addBtn = document.querySelector('.add-btn')
const addSection = document.querySelector('.add-wrapper')
const saveBtn = document.querySelector('.save')
let userName = document.querySelector('.new-name')
let userLastName = document.querySelector('.new-lastname')
let userPhoneNumber = document.querySelector('.new-number')
const listContainer = document.querySelector('#wrap-users')
const deleteBtn = document.querySelector('.delete-user-btn')
const deleteModal = document.querySelector('#delete-modal')
const editModal = document.querySelector('#edit-modal')
const newFirstname = document.querySelector('.firstname')
const newLastname = document.querySelector('.lastname')
const newPhneNumber = document.querySelector('.password')

//every time by click on edit or delete userId will be update
let userId = null
//load users from data base
const getAllUser = () => {
    fetch('https://mwbi-project-default-rtdb.firebaseio.com/new-contact.json')
        .then(res => res.json())
        .then(data => {
            let userInfo = Object.entries(data)
            listContainer.innerHTML = ''
            userInfo.forEach((user) => {
                console.log(user);
                listContainer.insertAdjacentHTML('beforeend', `
                <div class="user">
                    <div class="user-profile-wrap">
                        <img class="user-profile" src="img/noimg.png" alt="default-image">
                        <div class="user-profile-description">
                            <h1 class="user-profile-name">${user[1].userName} - ${user[1].userLastName}<span class="user-age" onclick="copyPhoneNumber('${user[1].userPhoneNumber}')">copy</span> </h1>
                            <h3 class="user-explanations">Phone Number: ${user[1].userPhoneNumber}</h3>
                        </div>
                    </div>
                    <div class="btn-groups-column">
                        <button class="delete-user-btn" onclick="showDeleteModal('${user[0]}')">delete</button>
                        <button class="edit-user-btn" onclick="showEditeModal('${user[0]}')">edit</button>
                    </div>
                </div>
                `)

            })
        })
}
//post users to data base
const postData = () => {
    if (userName.value && userPhoneNumber.value) {
        let userData = {
            userName: userName.value,
            userLastName: userLastName.value,
            userPhoneNumber: userPhoneNumber.value
        }
        fetch('https://mwbi-project-default-rtdb.firebaseio.com/new-contact.json',
            {
                method: 'POST',
                headers: { 'content-type': 'applcation.json' },
                body: JSON.stringify(userData)
            }
        ).then(res => {

            console.log(res)
            userName.value = ''
            userLastName.value = ''
            userPhoneNumber.value = ''
            getAllUser()
        })
            .catch()
    } else {
        userName.style.border = '1px solid red'
        userPhoneNumber.style.border = '1px solid red'
        setTimeout(() => {
            userName.style.border = ''
            userPhoneNumber.style.border = ''
        }, 1000);

    }

}

//delete users
const showDeleteModal = (id) => {
    userId = id
    deleteModal.classList.add('visible')
}
const closeDeleteModal = () => {
    deleteModal.classList.remove('visible')
}
const deleteUser = () => {
    fetch(`https://mwbi-project-default-rtdb.firebaseio.com/new-contact/${userId}.json`,
        {
            method: 'DELETE',
        })
        .then(res => {
            console.log(res)
            getAllUser()
            closeDeleteModal()
        })
}

//edit user 
const showEditeModal = (id) => {
    userId = id;
    editModal.classList.add('visible')
}
const closeEditModal = () => {
    editModal.classList.remove('visible')
}
const updateUser = () => {
    if (newFirstname.value && newPhneNumber.value) {
        userNewInfo = {
            userName: newFirstname.value,
            userLastName: newLastname.value,
            userPhoneNumber: newPhneNumber.value
        }
        fetch(`https://mwbi-project-default-rtdb.firebaseio.com/new-contact/${userId}.json`,
            {
                method: 'PUT',
                headers: { 'content-type': 'application.json' },
                body: JSON.stringify(userNewInfo)

            })
            .then(res => {
                console.log(res)
                newFirstname.value = ''
                newLastname.value = ''
                newPhneNumber.value = ''
                getAllUser()
                closeEditModal()
            })
    } else {
        newFirstname.style.border = '1px solid red'
        newPhneNumber.style.border = '1px solid red'
        setTimeout(() => {
            newFirstname.style.border = ''
            newPhneNumber.style.border = ''
        }, 1000);
    }

}

//copy phone number
const copyPhoneNumber = (number) => {
    window.navigator.clipboard.writeText(number)
}
//add new user 
addBtn.addEventListener('click', () => {
    if (addBtn.innerHTML === 'add contact') {
        addSection.classList.add('active')
        addBtn.innerHTML = 'close add section'
    } else if (addBtn.innerHTML === 'close add section') {
        addSection.classList.remove('active')
        addBtn.innerHTML = 'add contact'
    }
})
saveBtn.addEventListener('click', () => {
    postData()
})
window.addEventListener('load', () => {
    getAllUser()
})