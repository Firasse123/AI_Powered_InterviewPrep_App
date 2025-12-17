const Session=require("../models/Session");
const Question=require("../models/Question");
const createSession=async(req,res)=>{
try{
    const {role,experience,topicToFocus,description,questions}=req.body;
    const userId=req.user.id;//Assuming having a middleware to extract user from token setting req.user

    const session = await Session.create({
        user:userId,
        role,
        experience,
        topicToFocus,
        description,
        });
        const questionDocs=await Promise.all(
            questions.map(async(q)=>{
                const question=await Question.create({
                    session:session._id,
                    question:q.question,
                    answer:q.answer,
                });
                return question._id;

                })
        );
        session.questions=questionDocs;
        await session.save();
        res.status(201).json({message:"Session created successfully",session});


}
catch(error){
    res.status(500).json({message:"Server Error",error:error.message});
}
}
const getSessionById=async(req,res)=>{
    try{
        const sessionId=req.params.id;
        const session=await Session.findById(sessionId).populate({
            path:"questions",
            options:{sort:{createdAt:1}}
        });
        if(!session){
            return res.status(404).json({message:"Session not found"});
        }
        res.status(200).json({session});
    }
    catch(error){
        res.status(500).json({message:"Server Error",error:error.message});
    }
}
const getMySessions=async(req,res)=>{
    try{
        const userId=req.user.id;
        const sessions=await  Session.find({user:userId}).sort({createdAt:-1}).populate("questions");
        res.status(200).json({sessions});
    }
    catch(error){
        res.status(500).json({message:"Server Error",error:error.message});
    }
}
const deleteSession=async(req,res)=>{
    try{
        const sessionId=req.params.id;
        const session=await Session.findById(sessionId);
        if(!session){
            return res.status(404).json({message:"Session not found"});
        }
        await Question.deleteMany({session:sessionId});
        await session.deleteOne();
        res.status(200).json({message:"Session deleted successfully"});
    }
    catch(error){
        res.status(500).json({message:"Server Error",error:error.message});
    }
}

module.exports={createSession,getSessionById,getMySessions,deleteSession};