import express, { response } from "express";

const app = express();

app.use(express.json());

const PORT = 3000;

const mockusers = [{id: 1, username: "hari"},
{id: 2, username:"jack"},
{id:3, username: "raghib"},
{id:4, username: "siddhart"},
{id: 5, username: "tushar"},
{id: 6, username:"popo"},
{id:7, username: "nana"},
{id:8, username: "zeb"}];

app.listen(PORT, ()=>{
    console.log(`running on port ${PORT}`);
});

app.delete("/api/users/:id", (request,response) => {
    const {
        params : {id},
    } = request;
    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return response.sendStatus(400);
    const findUserIndex = mockusers.findIndex((user) => user.id === parsedId);
    console.log("here you go");
    
    mockusers.splice(findUserIndex);
    // if(findUserIndex === -1) return response.sendStatus(404);
    return response.sendStatus(200);
});

app.get("/", (request, response) => {
    response.status(201).send({ msg: "Hello"});
});


app.get("/api/users", (request,response) => {
    const {
        query: {filter, value},
    } = request; //destructuring of query object within the request object
     if(!filter && !value)
      return response.send(mockusers);

     if(filter && value){
        return response.send(
           mockusers.filter((user) => user[filter].includes(value)) 
        );
     }
    return response.send(mockusers);
});

app.post("/api/users", (request,response) => {
    const { body } = request;
    const  newUser = { id: mockusers[mockusers.length - 1].id + 1, ...body};
    mockusers.push(newUser);
   
    return response.status(201).send(newUser);
})

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
        
        const findUser = mockusers.find((u) => u.id === 5);
        if(!findUser) return response.sendStatus(404);
        return response.send(findUser);
    
})

app.put("/api/users/:id",(request,response) => {
    const {
        body,
        params: { id },
    } = request;

    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return response.sendStatus(400);

    const findUserIndex = mockusers.findIndex((user) => user.id === parsedId);

    if(findUserIndex === -1) return response.sendStatus(404);

    mockusers[findUserIndex] = {  ...body};

    return response.sendStatus(200);

})




