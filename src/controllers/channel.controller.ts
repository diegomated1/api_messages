import channelModel from "../models/channel.model.js";
import channelUserModel from "../models/channel_by_users.model.js";
import userModel from "../models/user.model.js";
import {Request, Response} from 'express';
import id_generator from "../utils/id_generator.js";

const get_channel_by_id = async (req: Request, res: Response)=>{
    try{
        const {id_channel} = req.params;
        const response = await channelModel.find({id_channel});
        const data = response.first();

        if(data){
            res.status(200).json({succes: true, error: 0, data});
        }else{
            res.status(404).json({succes: true, error: 2, message: "Channel not found"});
        }
    }catch(error){
        res.status(400).json({succes: false, error: 1, message: (error as Error).message});
    }
}

const get_channel_by_url = async (req: Request, res: Response)=>{
    try{
        const {url} = req.query;
        if(url===undefined){
            return res.status(404).json({succes: true, error: 2, message: "Url not found"});
        }
        const response = await channelModel.find({custom_url: url});
        const data = response.first();

        if(data){
            res.status(200).json({succes: true, error: 0, data});
        }else{
            res.status(404).json({succes: true, error: 4, message: "Channel not found"});
        }
    }catch(error){
        res.status(400).json({succes: false, error: 1, message: (error as Error).message});
    }
}

const create_channel = async (req: Request, res: Response)=>{
    try{
        const {name, description} = req.body;
        const {id_user} = res.locals.user;
        const date = Date.now();
        const id_channel = id_generator(date);

        await channelModel.insert({
            id_channel,
            name,
            create_at: date,
            description, 
            id_creator: id_user
        });

        res.status(200).json({succes: true, error: 0});        
    }catch(error){
        res.status(400).json({succes: false, error: 1, message: (error as Error).message});
    }
}

const change_channel_url = async (req: Request, res: Response)=>{
    try{
        const {id_channel} = req.params;
        const {custom_url} = req.body;
        const response = await channelModel.find({id_channel});
        const data = response.first();

        if(data){
            if(data.custom_url){
                await channelModel.remove({custom_url: data.custom_url});
            }
            await channelModel.update({...data, custom_url});
            res.status(200).json({succes: true, error: 0, data});
        }else{
            res.status(404).json({succes: true, error: 2, message: "Channel not found"});
        }
    }catch(error){
        res.status(400).json({succes: false, error: 1, message: (error as Error).message});
    }
}

const get_channel_users = async (req: Request, res: Response)=>{
    try{
        const {id_channel} = req.params;
        const response = await channelUserModel.find({id_channel});
        const data = response.toArray();

        res.status(200).json({succes: true, error: 0, data});
    }catch(error){
        res.status(400).json({succes: false, error: 1, message: (error as Error).message});
    }
}

const channel_user_join = async (req: Request, res: Response)=>{
    try{
        const {id_channel} = req.params;
        const {id_user} = res.locals.user;
        const response_user = await userModel.find({id_user});
        const data_user = response_user.first();
        if(data_user===null){
            return res.status(404).json({succes: true, error: 2, message: "User not found"});
        }
        const response_channel = await channelModel.find({id_channel});
        const data_channel = response_channel.first();
        if(data_channel===null){
            return res.status(404).json({succes: true, error: 3, message: "Channel not found"});
        }
        const user_in_channel = await channelUserModel.find({id_channel, id_user});
        const data_uic = user_in_channel.first();
        if(data_uic){
            return res.status(400).json({succes: true, error: 4, message: "User already in the server"});
        }
        const joined = Date.now();
        await channelUserModel.insert({
            id_channel, id_user, joined,
            username: data_user.username,
            custom_username: data_user.custom_username
        });
        res.status(200).json({succes: true, error: 0});
    }catch(error){
        res.status(400).json({succes: false, error: 1, message: (error as Error).message});
    }
}

const channel_user_leave = async (req: Request, res: Response)=>{
    try{
        const {id_channel} = req.params;
        const {id_user} = res.locals.user;
        const response_user = await userModel.find({id_user});
        const data_user = response_user.first();
        if(data_user===null){
            return res.status(404).json({succes: true, error: 2, message: "User not found"});
        }
        const response_channel = await channelModel.find({id_channel});
        const data_channel = response_channel.first();
        if(data_channel===null){
            return res.status(404).json({succes: true, error: 3, message: "Channel not found"});
        }
        const user_in_channel = await channelUserModel.find({id_channel, id_user});
        const data_uic = user_in_channel.first();
        if(data_uic===null){
            return res.status(400).json({succes: true, error: 4, message: "User not in the server"});
        }
        await channelUserModel.remove({id_channel, id_user});
        res.status(200).json({succes: true, error: 0});
    }catch(error){
        res.status(400).json({succes: false, error: 1, message: (error as Error).message});
    }
}

export default {
    get_channel_by_id,
    get_channel_by_url,
    get_channel_users,
    create_channel,
    change_channel_url,
    channel_user_join,
    channel_user_leave
}
