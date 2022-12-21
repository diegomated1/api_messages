import message from "../models/message.model.js";
import {Request, Response} from "express";
import id_generator from "../utils/id_generator.js";

const get_message_by_id = async (req: Request, res: Response)=>{
    try{
        const {id_message, id_channel} = req.params;
        const response = await message.find_by_id(id_message, id_channel);
        const data = response.first();
        if(data){
            res.status(200).json({status: 200, error: 0, data});
        }else{
            res.status(404).json({status: 404, error: 2, message: "Message not found"});
        }
    }catch(error){
        res.status(400).json({status: 400, error: 1, message: (error as Error).message});
    }
}

const get_messages_in_channel = async (req: Request, res: Response)=>{
    try{
        const {id_channel} = req.params;
        const response = await message.find_by_channel(id_channel);
        const data = response.rows;
        res.status(200).json({status: 200, error: 0, data});
    }catch(error){
        res.status(400).json({status: 400, error: 1, message: (error as Error).message});
    }
}

const create_message = async (req: Request, res: Response)=>{
    try{
        const {id_channel} = req.params;
        const {content} = req.body;
        const id_author = res.locals.user.id_user;
        const id_message = id_generator(Date.now());
        await message.insert({id_message, id_channel, create_at: Date.now(), content, id_author});
        res.status(200).json({status: 200, error: 0});
    }catch(error){
        res.status(400).json({status: 400, error: 1, message: (error as Error).message});
    }
}

const delete_message = async (req: Request, res: Response)=>{
    try{
        const {id_message, id_channel} = req.params;
        const response = await message.find_by_id(id_message, id_channel);
        const data = response.first();
        if(data){
            await message.remove(id_message, id_channel);
            res.status(200).json({status: 200, error: 0});
        }else{
            res.status(404).json({status: 404, error: 2, message: "Message not found"});
        }
    }catch(error){
        console.log(error);
        res.status(400).json({status: 400, error: 1, message: (error as Error).message});
    }
}

const update_message_content = async (req: Request, res: Response)=>{
    try{
        const {id_message, id_channel} = req.params;
        const {content} = req.body;
        const response = await message.find_by_id(id_message, id_channel);
        const data = response.first();
        if(data){
            await message.update(id_message, id_channel, data.create_at, content);
            res.status(200).json({status: 200, error: 0});
        }else{
            res.status(404).json({status: 404, error: 2, message: "Message not found"});
        }
    }catch(error){
        console.log(error);
        res.status(400).json({status: 400, error: 1, message: (error as Error).message});
    }
}

export default {
    get_message_by_id,
    get_messages_in_channel,
    create_message,
    delete_message,
    update_message_content
}