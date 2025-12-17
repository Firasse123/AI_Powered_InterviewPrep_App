const Question=require("../models/Question");
const Session=require("../models/Session");

const togglePinQuestion=async(req,res)=>{
try{
    const id=req.params.id;
    const question=await Question.findById(id);
    if(!question){
        return res.status(404).json({message:"Question not found"});
    }
    question.isPinned=!question.isPinned;
    await question.save();
    res.status(200).json({success:true, question});

}
catch(error){
    res.status(500).json({message:"Server Error"})
}
}

const updateQuestionNote=async(req,res)=>{
try{
    const id=req.params.id;
    const {note}=req.body;
    const question=await Question.findById(id); 
    if(!question){
        return res.status(404).json({success:false, message:"Question not found"});
    }
    question.note=note || "";
    await question.save();
    res.status(200).json({success:true, question});

}
catch(error){
    res.status(500).json({message:"Server Error"})
}
}

const addQuestionsToSession=async(req,res)=>{
try{
    const {sessionId,questions}=req.body;
    if(!sessionId || !questions || !Array.isArray(questions)){
        return res.status(400).json({message:"Invalid input"});
    }
    const session=await Session.findById(sessionId);
    if(!session){
        return res.status(404).json({message:"Session not found"});
    }
    //Create new questions
    const createdQuestions=await Question.insertMany(
        questions.map((q)=>({session:sessionId,question:q.question,
            answer:q.answer}))
    )
    session.questions.push(...createdQuestions.map((q)=>q._id));
    await session.save();
    res.status(201).json(createdQuestions)

}
catch(error){
    res.status(500).json({message:"Server Error"})
}
}


module.exports={togglePinQuestion,updateQuestionNote,addQuestionsToSession};
