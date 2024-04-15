import express from "express";

const app = express();

const PORT = 3000;

const mockusers = [{id: 1, username: "tushar"},
{id: 2, username:"jack"},
{id:3, username: "raghib"},
{id:4, username: "siddhart"}];

app.listen(PORT, ()=>{
    console.log(`running on port ${PORT}`);
});

app.get("/", (request, response) => {
    response.status(201).send({ msg: "Hello"});
});


app.get("/api/users", (request,response) => {
    response.send(mockusers);
});

app.get("/api/products", (request,response) => {
    response.send([{
        id: 1, 
        name: "pressure cooker",
        price: 1500
    }]);
});

app.get("/api/users/:id", (request, response) => {
    const parsedId = parseInt(request.params.id);
    console.log(parsedId);
    if(isNaN(parsedId)){
        return response.status(400).send({
            message: "Bad request"
        });
    }

        const findUser = mockusers.find((u) => u.id === parsedId);
        if(!findUser) return response.sendStatus(404);
        return response.send(findUser);
    
})

//query paramets

//localhost:3000/products?key=value&key2=value2