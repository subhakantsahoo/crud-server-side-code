const Movies=require("../models/movies-schema");
const { move } = require("../routes");
class MoviesService{
    create(request,response){
        const movies=Movies(request.body);
        movies.save((error,res)=>{
              if(error){
                 response.send(error)
                }
                if(res){
                    response.json(res)
                }
        })
    } 
    get(req,res){
        Movies.find()
        .then((resp)=>res.send(resp))
        .catch((err)=>res.send(err));
        console.log(req.body);

        
    }
    getbyid(req,res){
        Movies.findById(req.params.id)
        .then((respond)=>res.send(respond))
        .catch((error)=>res.send(error));
        console.log(req.body)
    }


    update(req,res){
        console.log(req.params);
        Movies.findByIdAndUpdate(req.body.id,req.body)
        .then((resp)=>res.send(resp))
        .catch((err)=>res.send(err))
        console.log(req.body);
       
    }


    delete(req,res){
        console.log(req.params);
        Movies.findByIdAndDelete(req.params.id)
        .then((resp)=>res.send(resp))   
        .catch((err)=>res.send(err))
        console.log(req.body);
    }
    search(req,res){
        const title=req.params.title;
        try{
            Movies.find({ movie: { $regex: title, $options: "i" } })
            // Movies.find({ movie: title })
          
          
          
        .then((movies) => res.json(movies))
        // console.log(res.movies)
        .catch((error) => {
          console.log(error);
          res.status(500).json({ error: "Server error" });
        }); 
        // console.log(req.body)

        }catch(error){
            console.log(error);
            res.status(500).json({error:"Server error"});

        }
       
    }
}
module.exports=MoviesService;