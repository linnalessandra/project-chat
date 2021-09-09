
let users = []


// Add user
function addUser(username, id) {
    let user = {
        username,
        id
    }
    users.push(user);
    return user;
}


// Get user 
function getUser(id) {
    /* find() */
    return user = users.find(user => user.id === id);
}


// Remove user
function removeUser(id) {
    const i = users.findIndex(user => user.id === id);

    if (i !== -1) {
        return users.splice(i, 1)[0];
    }
}


module.exports = { addUser, getUser, removeUser };
