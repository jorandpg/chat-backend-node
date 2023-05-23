const Message = require("../models/mensaje")
const ObjectId = require('mongodb').ObjectId;

const getChat = async(req, res) => {
    const myId = (req.uid);
    const messagesFrom = (req.params.from);

    
    const last30 = await Message.find({
    /*
        $or: [
            { from: myId, to: messagesFrom }, 
            { from: messagesFrom, to: myId }
        ]
    */
      
        /*
        $or: [
            { $and: [{ from: myId, to: messagesFrom }] }, 
            { $and: [{ from: messagesFrom, to: myId }] },
        ]
        */
      
   
    })
    
    

   //console.log(messagesFrom);
    //const last30 = await Message.find({to: messagesFrom})
    .sort({createdAt: 'desc'})
    .limit(30);

    res.json({
        ok: true,
        mensajes: last30
    });

}

module.exports = {
    getChat
}