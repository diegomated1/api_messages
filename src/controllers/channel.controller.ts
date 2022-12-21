import channelModel from "../models/channel.model.js";
import membersModel from "../models/members.model.js";
import userModel from "../models/user.model.js";
import {Request, Response} from 'express';
import id_generator from "../utils/id_generator.js";

const get_channel_by_id = async (req: Request, res: Response)=>{
    try{
        const {id_channel} = req.params;
        const response = await channelModel.find_by_id(id_channel);
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
        }else if(typeof url !== 'string'){
            return res.status(400).json({succes: false, error: 3, message: "Invalidad form data"}); 
        }
        const response = await channelModel.find_by_url(url);
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
            custom_url: id_channel,
            name,
            create_at: date,
            description, 
            id_creator: id_user
        });

        await membersModel.insert({
            id_channel,
            id_user,
            joined: date
        });

        res.status(200).json({succes: true, error: 0, id_channel});        
    }catch(error){
        res.status(400).json({succes: false, error: 1, message: (error as Error).message});
    }
}

const change_channel_url = async (req: Request, res: Response)=>{
    try{
        const {id_channel} = req.params;
        const {custom_url} = req.body;
        const response = await channelModel.find_by_id(id_channel);
        const data:any = response.first();

        if(data){
            await channelModel.update(id_channel, {custom_url});
            res.status(200).json({succes: true, error: 0, id_channel});
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
        const response = await membersModel.find_by_id_channel(id_channel);
        const data = response.rows;

        res.status(200).json({succes: true, error: 0, data});
    }catch(error){
        res.status(400).json({succes: false, error: 1, message: (error as Error).message});
    }
}

const get_user_channels = async (req: Request, res: Response)=>{
    try{
        const {id_user} = res.locals.user;
        const response = await membersModel.find_by_id_user(id_user);
        const data = response.rows;

        res.status(200).json({succes: true, error: 0, data});
    }catch(error){
        res.status(400).json({succes: false, error: 1, message: (error as Error).message});
    }
}

const channel_user_join = async (req: Request, res: Response)=>{
    try{
        const {id_channel} = req.params;
        const {id_user} = res.locals.user;
        const response_user = await userModel.find_by_id(id_user);
        const data_user = response_user.first();
        if(data_user===null){
            return res.status(404).json({succes: true, error: 2, message: "User not found"});
        }
        const response_channel = await channelModel.find_by_id(id_channel);
        const data_channel = response_channel.first();
        if(data_channel===null){
            return res.status(404).json({succes: true, error: 3, message: "Channel not found"});
        }
        const user_in_channel = await membersModel.find_by_ids(id_user, id_channel);
        const data_uic = user_in_channel.first();
        if(data_uic){
            return res.status(400).json({succes: true, error: 4, message: "User already in the server"});
        }
        const joined = Date.now();
        await membersModel.insert({id_channel, id_user, joined});
        res.status(200).json({succes: true, error: 0});
    }catch(error){
        res.status(400).json({succes: false, error: 1, message: (error as Error).message});
    }
}

const channel_user_leave = async (req: Request, res: Response)=>{
    try{
        const {id_channel} = req.params;
        const {id_user} = res.locals.user;
        const response_user = await userModel.find_by_id(id_user);
        const data_user = response_user.first();
        if(data_user===null){
            return res.status(404).json({succes: true, error: 2, message: "User not found"});
        }
        const response_channel = await channelModel.find_by_id(id_channel);
        const data_channel = response_channel.first();
        if(data_channel===null){
            return res.status(404).json({succes: true, error: 3, message: "Channel not found"});
        }
        const user_in_channel = await membersModel.find_by_ids(id_user, id_channel);
        const data_uic = user_in_channel.first();
        if(data_uic===null){
            return res.status(400).json({succes: true, error: 4, message: "User not in the server"});
        }else if(data_channel.id_creator===data_uic.id_user){
            await membersModel.remove_all(id_channel);
            await channelModel.remove(id_channel);
        }else{
            await membersModel.remove_one(id_user, id_channel);
        }
        res.status(200).json({succes: true, error: 0});
    }catch(error){
        res.status(400).json({succes: false, error: 1, message: (error as Error).message});
    }
}

export default {
    get_channel_by_id,
    get_channel_by_url,
    get_channel_users,
    get_user_channels,
    create_channel,
    change_channel_url,
    channel_user_join,
    channel_user_leave
}
