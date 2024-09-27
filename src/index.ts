import express from 'express'
import bodyparser from 'body-parser'


const app = express();
app.use(bodyparser.json());


const users: any[] = [];
let counter = 1;

const port = 9090;

// GET users
app.get('/users', (req, res) => {
    res.json(users)
});

// GET user by id
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find(user => user.id == id);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found.' });
    }
});

// POST create user
app.post('/users', (req, res) => {
    const user = req.body;
    user.id = counter;
    counter += 1;

    users.push(user);

    res.json({
        message: 'Add user complete!',
        data: user
    });
});

// PUT update data user
app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const userUpdate = req.body;

    // Find users by checking id 
    const user = users.find(user => user.id == id);

    // Update data user
    if (user) {
        user.firstName = userUpdate.firstName || user.firstName
        user.lastName = userUpdate.lastName || user.lastName
        user.age = userUpdate.age || user.age
        user.gender = userUpdate.gender || user.gender

        res.json({ message: 'User updated succussfully!' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }

});

// PATCH update data some field
app.patch('/users/:id', (req, res) => {
    const id = req.params.id;
    const userUpdate = req.body;

    const user = users.find(user => user.id == id);
    if (user) {
        user.firstName = userUpdate.firstName || user.firstName
        user.lastName = userUpdate.lastName || user.lastName
        user.age = userUpdate.age || user.age
        user.gender = userUpdate.gender || user.gender

        res.json({
            message: 'User updated succussfully!',
            user: user
        });
    } else {
        res.status(404).json({ error: 'User not found' });
    }

});

// DELETE 
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    let user = users.findIndex(user => user.id == id);

    users.splice(user, 1);

    res.json({
        message: 'User deleted successfully',
        index: user
    });
});

app.listen(port, () => {
    console.log(`http server run at ${port}`);
}); 
